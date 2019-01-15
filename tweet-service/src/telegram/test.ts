import { Message, OnText, TelegramRouter, Bot, OnRoute } from "../lib/telegram";
import axios from 'axios';

class TextBot extends TelegramRouter {
  @OnRoute('테스트 변수1 변수2')
  async dogPhoto(msg: Message, bot: Bot) {
    return '테스트 결과값'
  }
}

export default new TextBot()