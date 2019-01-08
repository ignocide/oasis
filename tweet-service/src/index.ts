import SpringCloudConfigClient from './lib/spring-cloud-client';
import geocoding from './lib/Geocoding';
import weather from './lib/weather';
import telegram from './lib/telegram'
import exchange from './lib/exchange'

const config = require('../config.json');

class Application {
  config: any;
  configClient: SpringCloudConfigClient;

  constructor() {
    this.configClient = new SpringCloudConfigClient(config.configServer)
    this.run()

  }

  async fetchConfig() {
    this.config = await this.configClient.fetch()
  }

  async run() {
    await this.fetchConfig();
    geocoding.init({ apiKey: this.config.apiKeys.google });
    weather.init({ apiKey: this.config.apiKeys.weather });
    telegram.init({ token: this.config.apiKeys.telegram });
    exchange.init({ apiKey: this.config.apiKeys.exchange });
  }
}

const application = new Application();