import axios, {AxiosInstance} from 'axios'
import Singleton from "./singleton";

interface ExchangeOption {
  apiKey: string,
}

class ExchangeInfo {
  currencyUnit: string
  currencyName: string
  buyPrice: number
  sellPrice: number
  standardRate: number
  // bkpr
  // yy_efee_r
  // ten_dd_efee_r
  // kftc_bkpr
  // kftc_deal_bas_r
  constructor(info:any) {
    this.currencyUnit = info.cur_unit;
    this.currencyName = info.cur_nm;
    this.buyPrice = info.ttb.replace(/,/gi, "");
    this.sellPrice = info.tts.replace(/,/gi, "");
    this.standardRate = info.deal_bas_r;
  }
}

class Exchange extends Singleton {
  private options: ExchangeOption;
  private request: AxiosInstance;
  private baseUrl = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON';

  init(options: ExchangeOption) {
    this.options = options;
    this.request = axios.create({
      baseURL: this.baseUrl,
      params: {
        authkey: this.options.apiKey,
        data: 'AP01'
      }
    })
  }

  private getSearchDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    const searchDate: any[] = [yesterday.getFullYear()];

    let month = yesterday.getMonth() + 1;
    let date = yesterday.getDate();
    if (month < 10) {
      searchDate.push("0")
    }
    searchDate.push(month);
    if (date < 10) {
      searchDate.push("0")
    }
    searchDate.push(date);
    return searchDate.join('')
  }

  async exchangeInfo(currency: string) {
    const searchdate = this.getSearchDate();
    const result = await this.request.get('', {
      params: {
        searchdate,
        cur_unit: currency.toUpperCase()
      }
    });
    const response = result.data[0];
    if(!response){
      return null
    }
    return new ExchangeInfo(response)
  }

}

const exchange: Exchange = Exchange.getInstance();
export default exchange;