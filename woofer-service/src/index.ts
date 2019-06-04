if (process.env.NODE_ENV !== 'production') {
  process.env.DEBUG = "knex:query";
}

import Server from 'node-server';
import { Eureka } from 'eureka-js-client';
import oasisAuth from './middlewares/auth';
import errorHanding from './middlewares/error';

const config = require('../config.json');

class Application extends Server {
  eurekaClient: Eureka;

  constructor() {
    super(config.server);
    this.eurekaClient = new Eureka(config.eureka);
    this.init();
  }

  async init() {
    try {
      await this.setMiddlewareBeforeRoutes(errorHanding, oasisAuth);
      await this.run();
      await this.startEurekaClient();
    }
    catch (e) {
      console.error(e);
    }
  }

  async startEurekaClient(): Promise<any> {
    return new Promise((res, rej) => {
      this.eurekaClient.start((err: any) => {
        if (err) {
          return rej(err);
        }
        res();
      });
    });
  }
}

new Application();

