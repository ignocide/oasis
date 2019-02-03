import axios, {AxiosInstance} from 'axios'
import Singleton from "./singleton";

interface WeatherOptions {
  apiKey: string,
}

class Weather extends Singleton {
  private options: WeatherOptions;
  private request: AxiosInstance;
  private baseUrl = 'http://api.openweathermap.org/data/2.5';

  init(options: WeatherOptions) {
    this.options = options;

    this.request = axios.create({
      baseURL: this.baseUrl,
      params: {
        appid: this.options.apiKey,
        units: "metric"
      }
    })
  }

  async getWeatherFromCoor(lat: string, lng: string) {
    const result = await this.request.get('/weather', {
      params: {
        lat: lat,
        lon: lng,
      }
    });

    const response = result.data;
    const weather = this.parsingResult(response)
    return weather
  }

  parsingResult(weather: any) {
    return {
      weather: this.getKoWeather(weather.weather),
      time: new Date(weather.dt * 1000),
      visibility: `${weather.visibility}m`,
      sunrise: new Date(weather.sys.sunrise * 1000),
      sunset: new Date(weather.sys.sunset * 1000),
      measureLocation: weather.name,
      temp: {
        current: weather.main.temp,
        min: weather.main.temp_min,
        max: weather.main.temp_max
      },
      pressure: weather.main.pressure,
      wind: this.getKoWindDeg(weather.wind)
    }
  }

  getKoWeather(weather: any) {
    weather = weather[0];
    if (!weather) {
      return '???'
    }
    let weatherKo = null
    if (weather.main === 'Thunderstorm') {
      weatherKo = '천둥번개'
    }
    else if (weather.main === 'Drizzle') {
      weatherKo = '이슬비'
    }
    else if (weather.main === 'Rain') {
      weatherKo = '비'
    }
    else if (weather.main === 'Snow') {
      weatherKo = '흐림'
    }
    else if (weather.main === 'Clear') {
      weatherKo = '맑음'
    }
    else if (weather.main === 'Clouds') {
      weatherKo = '구름'
    }
    else {
      weatherKo = weather.main
    }

    weatherKo += `(${weather.description})`

    return weatherKo
  }

  getKoWindDeg(wind: any) {
    let ko = ''

    if (wind.deg <= 22.5) {
      ko = '북'
    }
    else if (wind.deg <= 67.5) {
      ko = '북동'
    }
    else if (wind.deg <= 112.5) {
      ko = '동'
    }
    else if (wind.deg <= 157.5) {
      ko = '남동'
    }
    else if (wind.deg <= 202.5) {
      ko = '남'
    }
    else if (wind.deg <= 247.5) {
      ko = '남서'
    }
    else if (wind.deg <= 292.5) {
      ko = '서'
    }
    else if (wind.deg <= 337.5) {
      ko = '북서'
    }
    else {
      ko = '북'
    }

    ko += `(${wind.speed}mps)`

    return ko
  }
}

const weather: Weather = Weather.getInstance();
export default weather;