import { Message, OnText, TelegramRouter, Bot, OnRoute } from "../lib/telegram";

class HealthBot extends TelegramRouter {

  @OnRoute('ping')
  ping(msg: Message, bot: Bot) {
    const chatId = msg.chat.id

    bot.sendMessage(chatId, 'pong')
  }
}

export default new HealthBot()