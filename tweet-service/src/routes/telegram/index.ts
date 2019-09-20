import {
  Ctx,
  DeleteMapping,
  GetMapping,
  IRouterContext,
  PathVariable,
  PostMapping,
  PutMapping,
  RequestBody,
  Router,
} from "node-server/routes";

import telegram from '../../lib/telegram';

interface TelegramBody {
  channel_id: number,
  message: string
}

class TelegramRouter extends Router {
  constructor() {
    super('/telegram');
  }

  @PostMapping('/message')
  async ping(@Ctx ctx: IRouterContext, @RequestBody telegramBody: TelegramBody): Promise<any> {
    telegram.sendMessage(telegramBody.channel_id, telegramBody.message, {
      parse_mode: 'Markdown'
    })
    ctx.body = "OK";
  }
}


export default TelegramRouter;