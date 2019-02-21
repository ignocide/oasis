import Delivery from "../repository/delivery";
import Singleton from "../lib/singleton";
import * as moment from "moment";
import telegram from "../lib/telegram";
import Delibee = require('delibee');
import * as PromiseUtil from "../util/promise";

enum TrackingStatusCode {
  UNKNOWN = -1,
  RECEPTION_WAITING = 10,
  RESIDUAL = 11,
  RECEPTION = 20,
  COLLECTION = 30,
  OUT_OF_STOCK = 40,
  IN_STOCK = 50,
  ARRIVE_MISTAKE = 55,
  DELIVERY_PREPARE = 60,
  DELIVERY = 65,
  DELIVERY_COMPLETE = 70,
  DELIVERY_FAIL = 71,
  ACQUISITION_CONFIRM = 80,
}

// 우체국택배	EPOST
// CJ대한통운	CJ
// 한진택배	HANJIN
// 롯데택배 (구. 현대택배)	LOTTE
// 로젠택배	LOGEN
// 드림택배 (구. KG로지스)	DREAM
// CVSnet 편의점택배	CVSNET
// CU 편의점택배	CU
enum DeliveryCompanyCode {
  EPOST = "EPOST",
  CJ = "CJ",
  HANJIN = "HANJIN",
  LOTTE = "LOTTE",
  LOGEN = "LOGEN",
  DREAM = "DREAM",
  CVSNET = "CVSNET",
  CU = "CU"
}

// private _gridOptions:Map<string, Array<string>> = new Map([["1", ["test"]], ["2", ["test2"]]])

const DeliveryCompanyLabelMap: Map<string, string[]> = new Map<string, string[]>([
  [DeliveryCompanyCode.EPOST, ['우체국택배', '우체국']],
  [DeliveryCompanyCode.CJ, ['CJ대한통운', '씨제이', 'CJ', '씨제이택배', 'CJ택배', '대한통운']],
  [DeliveryCompanyCode.HANJIN, ['한진택배', '한진']],
  [DeliveryCompanyCode.LOTTE, ['롯데택배', '롯데']],
  [DeliveryCompanyCode.LOGEN, ['로젠택배', '로젠']],
  [DeliveryCompanyCode.DREAM, ['로지스택배', 'KG로지스', '드림', '드림택배']],
  [DeliveryCompanyCode.CVSNET, ['편의점택배', '편의점']],
  [DeliveryCompanyCode.CU, ['CU택배', 'CU']]
]);

class DeliveryService extends Singleton {
  protected tracker: any;
  protected delivery: any;

  constructor() {
    super();
    this.tracker = Delibee({});
  }

  getDeliveryCompanyCodeByName(name: string): null | DeliveryCompanyCode {
    let deliveryCompanyCode: any = null;

    DeliveryCompanyLabelMap.forEach((labels, key) => {
      if (labels.indexOf(name) !== -1) {
        deliveryCompanyCode = key;
      }
    });

    return deliveryCompanyCode;
  }

  isValidCompanyName(name: string): boolean {
    return !!this.getDeliveryCompanyCodeByName(name);
  }

  getDeliveryCompanyNameByCode(code: string): string {
    let codes = DeliveryCompanyLabelMap.get(code);
    let name: string = '알 수 없음';
    if (codes) {
      name = codes[0];
    }

    return name;
  }

  async fetchCandidates() {
    let list: any = await new Delivery().where('status_code', '>=', 0).where('status_code', '<', 70).fetchAll();
    return list.toJSON();
  }

  async handleExpire(delivery: any) {
    if (((+delivery.updatedAt) + 1000 * 60 * 60 * 24 * 7) < (+new Date())) {
      await new Delivery({ id: delivery.id }).set({ statusCode: -1 }).save();
      await this.tweetExpire(delivery);
    }
  }

  async getTrackingInformation(delivery: any) {
    return await this.tracker.tracking(delivery.company, delivery.invoiceNumber);
  }

  // invoice:
  //   { deliveryCompany: [Object],
  //     invoiceNumber: '90365559546',
  //     senderName: 'P**',
  //     senderAddr: '',
  //     receiverName: '김**',
  //     receiverAddr: '서울 종로구 효제**',
  //     history: [Array],
  //     statusCode: 70,
  //     statusText: '배달완료' } }

  async updateDelivery(delivery: any) {
    const trackingInformation: any = await this.getTrackingInformation(delivery);
    const { success, invoice } = trackingInformation;
    if (!success) {
      await this.handleExpire(delivery)
      return;
    }
    const lastHistory = invoice.history[invoice.history.length - 1];

    if (!lastHistory) {
      return;
    }
    const isUpdated = delivery.dateTime < (lastHistory.dateTime / 1000);

    if (isUpdated) {
      await this.tweetDelivery(delivery, invoice);
      const targetDelivery = await new Delivery({ id: delivery.id }).fetch();
      targetDelivery.set('statusCode', invoice.statusCode);
      targetDelivery.set('dateTime', Math.floor(lastHistory.dateTime / 1000))
      await targetDelivery.save();
    }

    //일주일이 넘도록 변경사항이 없다면 
    await this.handleExpire(delivery);

  }

  //   [ { dateTime: 1548934140000,
  //     dateString: '2019.01.31 20:29',
  //     location: '이천센터',
  //     tel: '',
  //     remark: '터미널입고',
  //     statusCode: 50,
  //     statusText: '배송중(입고)' },
  // { dateTime: 1548939540000,
  //   dateString: '2019.01.31 21:59',
  //   location: '이천센터',
  //   tel: '',
  //   remark: '터미널출고',
  //   statusCode: 40,
  //   statusText: '배송중(출고)' },
  // { dateTime: 1548971280000,
  //   dateString: '2019.02.01 06:48',
  //   location: '서종로',
  //   tel: '',
  //   remark: '배송입고',
  //   statusCode: 50,
  //   statusText: '배송중(입고)' },
  // { dateTime: 1548976140000,
  //   dateString: '2019.02.01 08:09',
  //   location: '동종로',
  //   tel: '',
  //   remark: '배송출고',
  //   statusCode: 65,
  //   statusText: '배달중' },
  // { dateTime: 1548993300000,
  //   dateString: '2019.02.01 12:55',
  //   location: '동종로',
  //   tel: '',
  //   remark: '배송완료',
  //   statusCode: 70,
  //   statusText: '배달완료' } ]

  async tweetDelivery(delivery: any, invoice: any) {
    const updatedHistories: any[] = invoice.history.filter((history: any) => {
      return moment(delivery.dateTime).isBefore(moment.unix(history.dateTime / 1000));
    });

    await PromiseUtil.series(updatedHistories.map((history) => {
      return async () => {
        let message = this.getMessageFromHistory(invoice, history);
        if (message) {
          await telegram.sendMessage(delivery.chatId, message);
        }
      }
    }));
  }

  async tweetExpire(delivery: any) {
    let message = `${moment(delivery.created_at).format('MM-DD, h:mm:ss a')}에 등록된 정보(*${this.getDeliveryCompanyNameByCode(delivery.company)}* _${delivery.invoiceNumber}_)가 일주일이 지나도 변함이 없어 삭제됩니다.`;
    telegram.sendMessage(delivery.chatId, message);
  }

  async tweetWrongInvoice(delivery: any) {
    let message = `${moment(delivery.created_at).format('MM-DD, h:mm:ss a')} 잘못 등록된 정보(*${this.getDeliveryCompanyNameByCode(delivery.company)}* _${delivery.invoiceNumber}_)입니다. 삭제됩니다.`;
    telegram.sendMessage(delivery.chatId, message);
  }

  // 모든 경우 다 알려주지는 않는다.
  getMessageFromHistory(invoice: any, history: any): string {
    let message = ``;
    switch (history.statusCode) {
      case TrackingStatusCode.RECEPTION: {
        message += `*${invoice.deliveryCompany.name}* _${invoice.invoiceNumber}_\n`;
        message += `${moment.unix(history.dateTime / 1000).format('MM-DD, h:mm:ss a')} ${history.statusText} 물건이 접수되었습니다.`;
        break;
      }
      case TrackingStatusCode.COLLECTION: {
        message += `*${invoice.deliveryCompany.name}* _${invoice.invoiceNumber}_\n`;
        message += `${moment.unix(history.dateTime / 1000).format('MM-DD, h:mm:ss a')} ${history.statusText} ${history.location}에 집하되었습니다.`;
        break;
      }
      case TrackingStatusCode.IN_STOCK: {
        message += `*${invoice.deliveryCompany.name}* _${invoice.invoiceNumber}_\n`;
        message += `${moment.unix(history.dateTime / 1000).format('MM-DD, h:mm:ss a')} ${history.statusText} ${history.location}에 입고 되었습니다.`;
        break;
      }
      case TrackingStatusCode.OUT_OF_STOCK: {
        message += `*${invoice.deliveryCompany.name}* _${invoice.invoiceNumber}_\n`;
        message += `${moment.unix(history.dateTime / 1000).format('MM-DD, h:mm:ss a')} ${history.statusText} ${history.location}(으)로 출고 되었습니다.`;
        break;
      }
      case TrackingStatusCode.DELIVERY_PREPARE: {
        message += `*${invoice.deliveryCompany.name}* _${invoice.invoiceNumber}_\n`;
        message += `${moment.unix(history.dateTime / 1000).format('MM-DD, h:mm:ss a')} ${history.statusText} 배달 준비중에 있습니다.`;
        break;
      }
      case TrackingStatusCode.DELIVERY: {
        message += `*${invoice.deliveryCompany.name}* _${invoice.invoiceNumber}_\n`;
        message += `${moment.unix(history.dateTime / 1000).format('MM-DD, h:mm:ss a')} ${history.statusText} ${history.location}로 출발되었습니다.`;
        break;
      }
      case TrackingStatusCode.DELIVERY_COMPLETE: {
        message += `*${invoice.deliveryCompany.name}* _${invoice.invoiceNumber}_\n`;
        message += `${moment.unix(history.dateTime / 1000).format('MM-DD, h:mm:ss a')} ${history.statusText} 배달이 완료되었습니다.`;
        break;
      }
    }
    return message;
  }

  async registInvoice(deliveryCompanyCode: string, invoiceNumber: string, chatId: string) {
    return await new Delivery({
      company: deliveryCompanyCode,
      invoiceNumber,
      chatId
    }).save();
  }
}

const deliveryService = DeliveryService.getInstance();
export default deliveryService; 