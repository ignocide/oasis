import { Message, OnText, TelegramRouter, Bot } from "../lib/telegram";

class HealthBot extends TelegramRouter {

  @OnText(/\/ping/)
  ping(msg: Message, bot: Bot) {
    const chatId = msg.chat.id

    bot.sendMessage(chatId, 'pong')
  }
}

export default new HealthBot()