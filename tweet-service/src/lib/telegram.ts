import * as TelegramBot from 'node-telegram-bot-api'
import { Message } from "node-telegram-bot-api";
import * as fs from "fs";
import * as path from "path";

interface TelegramConfig {
  token: string,
}

class Telegram {
  private config: TelegramConfig;
  bot: TelegramBot;

  init(config: TelegramConfig) {
    this.config = config;
    this.bot = new TelegramBot(config.token, { polling: true })
    this.bindRoutes()

  }

  protected async bindRoutes(): Promise<any> {
    let routeFiles = await fs.readdirSync(path.join(__dirname, '../telegram'));
    routeFiles.forEach((routeFile) => {
      let routeFilePath = path.join(__dirname, '../telegram', routeFile)
      let RouteClass: any
      RouteClass = require(routeFilePath).default;
    })
  }
}

const telegram = new Telegram()


interface OnText {
  path: RegExp,
  operator: any
}

class TelegramRouter {
  static telegram = telegram;
  private routes: Array<OnText>
  bot = telegram.bot;
  constructor() {
    this.bindRoutes()
  }

  parsingCmd(msg: string) {
    const args = msg.split(' ')
    args.shift()
    return args
  }

  private bindRoutes() {
    if (!this.routes) {
      return
    }

    for (let route of this.routes) {
      TelegramRouter.telegram.bot.onText(route.path, route.operator)
    }
    //clear all routes
    this.routes = undefined
  }
}



const OnText = function (path: RegExp) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    let originalMethod = descriptor.value;

    let appliedMethod = function () {
      let args = Array.prototype.slice.call(arguments);
      let newArgs = [];
      newArgs.push(args[0]);
      newArgs.push(telegram.bot);
      originalMethod.apply(target, newArgs);
    };
    descriptor.value = appliedMethod

    if (!target.routes) {
      target.routes = []
    }
    target.routes.push({
      path: path,
      operator: descriptor.value
    })

    return descriptor;
  };
};

const parsePath = function (path: string) {
  const [command, ...words] = path.split(' ')

  const options: string[] = []
  const args: string[] = []
  let regexStr = `\.${command}`
  words.forEach((word) => {
    if (word.indexOf('--') == 0) {
      let option = word.replace('--', '')
      options.push(option)
    } else {
      args.push(word)
    }
  })



  return {
    regex: new RegExp(regexStr),
    command,
    options,
    args,
  }
}

const parseText = function (text: string) {
  const [command, ...args] = text.split(' ')
  return {
    command,
    args,
  }
}

const OnRoute = function (path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const { regex, command, options, args } = parsePath(path)
    let originalMethod = descriptor.value;

    let appliedMethod = async function (message: Message) {
      try {
        let telegramNewArgs = [];
        let text = message.text;
        const { command, args } = parseText(text);
        telegramNewArgs.push(message);
        telegramNewArgs.push(telegram.bot);
        telegramNewArgs.push(args)
        const result = await originalMethod.apply(target, telegramNewArgs);
        console.log(result)
        if (result && typeof result === 'string') {
          const chatId = message.chat.id
          return telegram.bot.sendMessage(chatId, result, {
            parse_mode: 'Markdown'
          })
        }
      } catch (e) {
        console.error(e)
      }
    };
    descriptor.value = appliedMethod

    if (!target.routes) {
      target.routes = []
    }
    target.routes.push({
      path: regex,
      operator: descriptor.value
    })

    return descriptor;
  };
};

export default telegram
export {
  TelegramRouter,
  OnText,
  OnRoute,
  Message,
  TelegramBot as Bot
}