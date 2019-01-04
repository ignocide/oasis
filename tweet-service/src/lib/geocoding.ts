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
  constructor(options: GeocodingOptions){
    this.options = options
    this.options.language = options.language || 'ko';

    this.request = axios.create({
      baseURL: this.baseUrl,
      params: {
        key: this.options.apiKey,
        language: this.options.language
      }
    })
  }

  async locationNameToPoint(address: string){
    const result = await this.request.get('/maps/api/geocode/json',{
      params: {
        address
      }
    });

    const response = result.data.results;

    console.log('!!',response)
  }
}

export default Geocoding