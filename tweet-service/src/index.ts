import database from "./lib/database";
// import batchService from "./lib/batch";
import Server from 'node-server';
import { Eureka } from 'eureka-js-client';

const config = require('../config.json');

class Application extends Server {
  config: any;
  eurekaClient: Eureka;

  constructor() {
    super(config.server);
    this.eurekaClient = new Eureka(config.eureka);
    this.init();
  }

  async fetchConfig() {
    this.config = config;
  }

  async init() {
    this.run()
    await this.fetchConfig();
    await database.init(this.config.mysql);
    const init = require('./init');

    await init.default(this.config);
  }
}

const application = new Application();