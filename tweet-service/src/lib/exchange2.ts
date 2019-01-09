import axios, { AxiosInstance } from 'axios'
import Singleton from "./singleton";

interface ExchangeOption {
  apiKey: string,
}

class ExchangeInfo {
  date: Date
  rate: number
  constructor(info: any) {
    this.date = new Date(info.date);
    this.rate = info.rate
  }
}

class Exchange2 extends Singleton {
  private options: ExchangeOption;
  private request: AxiosInstance;
  private baseUrl = 'https://api.manana.kr/exchange/rate.json';

  constructor() {
    super()
    this.request = axios.create({
      baseURL: this.baseUrl,
    })
  }

  async exchangeInfo(from: string, to: string) {
    const result = await this.request.get('', {
      params: {
        code: from.toUpperCase(),
        base: to.toUpperCase()
      }
    });
    const response = result.data[0];
    if (!response || result.data.status === "Error") {
      return null
    }
    return new ExchangeInfo(response)
  }

}

const exchange: Exchange2 = Exchange2.getInstance();
export default exchange;