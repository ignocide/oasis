import axios, {AxiosInstance} from 'axios'

interface Location {

}

interface GeocodingOptions{
  apiKey: string,
  language?: string,
}

class Geocoding {
  private options: GeocodingOptions;
  private request: AxiosInstance;
  private baseUrl= 'https://maps.googleapis.com';
  init(options: GeocodingOptions){
    this.options = options
    this.options.language = options.language || 'ko';

    this.request = axios.create({
      baseURL: this.baseUrl,
      params: {
        key: this.options.apiKey,
        language: this.options.language
      }
    })
    console.log('init done')
  }

  async locationNameToPoint(address: string){
    console.log('gecoding',this.request)
    const result = await this.request.get('/maps/api/geocode/json',{
      params: {
        address
      }
    });

    const response = result.data.results;

    return response
  }
}
const geocoding = new Geocoding()
console.log("이건 여러번 불리나?")
export default geocoding