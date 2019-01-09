import axios, {AxiosInstance} from 'axios'
import Singleton from "./singleton";

interface Location {

}

interface GeocodingOptions {
  apiKey: string,
  language?: string,
}

class Geocoding extends Singleton {
  private options: GeocodingOptions;
  private request: AxiosInstance;
  private baseUrl = 'https://maps.googleapis.com';

  init(options: GeocodingOptions) {
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

  async locationNameToPoint(address: string) {
    const result = await this.request.get('/maps/api/geocode/json', {
      params: {
        address
      }
    });
    const response = result.data.results[0];
    return {
      address: response.formatted_address,
      location: response.geometry.location,
    }
  }
}

const geocoding: Geocoding = Geocoding.getInstance();
export default geocoding;