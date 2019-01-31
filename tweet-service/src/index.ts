import SpringCloudConfigClient from './lib/spring-cloud-client';
import database from "./lib/database";
// import batchService from "./lib/batch";

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
    await database.init(this.config.mysql);
    const init = require('./init')

    await init.default(this.config);
  }
}

const application = new Application();