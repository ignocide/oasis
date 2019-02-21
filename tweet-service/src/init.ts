
import telegram from "./lib/telegram";
import geocoding from "./lib/geocoding";
import weather from "./lib/weather";
import exchange from "./lib/exchange";
import batchService from "./lib/batch";

const init = async (config:any) => {
  batchService.init();
  geocoding.init({apiKey: config.apiKeys.google});
  weather.init({apiKey: config.apiKeys.weather});
  exchange.init({apiKey: config.apiKeys.exchange});
  telegram.init({token: config.apiKeys.telegram});
}

export default init;