// declare namespace delibee {
//
// }

declare function Delibee(delibeeOptions?: delibeeOptions): delibee;

interface delibeeOptions {
  timeout?: number;
  locale?: 'en' | 'ko'
}

interface delibee {
  tracking(company: string, invoiceNo: string): Invoice;

  company(): any;
}

interface Invoice {
  deliveryCompany: DeliveryCompany;
  invoiceNumber: number;
  senderName: string,
  senderAddr: string,
  receiverName: string,
  receiverAddr: string,
  history: History[],
  statusCode: StatusCode,
  statusText: string
}

interface DeliveryCompany {
  code: string,
  name: string,

}

interface History {
  //datetime
  dateTime: number,
  dateString: string,
  location: string,
  tel: string,
  remark: string,
  statusCode: StatusCode,
  statusText: string,
}

enum StatusCode {
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

export = Delibee