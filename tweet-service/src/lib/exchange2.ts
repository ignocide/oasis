import axios, {AxiosInstance} from 'axios'
import Singleton from "./singleton";

interface ExchangeOption {
  apiKey: string,
}

class ExchangeInfo {
  date: Date
  rate: number
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
  private baseUrl = 'https://api.manana.kr/exchange/rate.json';

  init(options: ExchangeOption) {
    this.options = options;
    this.request = axios.create({
      baseURL: this.baseUrl,
    })
  }

  async exchangeInfo(from: string,to: string) {
    const result = await this.request.get('', {
      params: {
        base:from,
        code: to
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