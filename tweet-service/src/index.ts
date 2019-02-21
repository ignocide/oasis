import database from "./lib/database";
// import batchService from "./lib/batch";

const config = require('../config.json');

class Application {
  config: any;

  constructor() {
    this.run()
  }

  async fetchConfig() {
    this.config = config
  }

  async run() {
    await this.fetchConfig();
    await database.init(this.config.mysql);
    const init = require('./init')

    await init.default(this.config);
  }
}

const application = new Application();