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
  statusCode: any,
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
  statusCode: any,
  statusText: string,
}

export = Delibee