import { Message, OnText, TelegramRouter, Bot, OnRoute } from "../lib/telegram";
import axios from 'axios';

class PhotoBot extends TelegramRouter {
  @OnRoute('멍')
  dogPhoto(msg: Message, bot: Bot) {
    const chatId = msg.chat.id
    axios.get('https://random.dog/woof.json').then(function (res) {
      bot.sendMessage(chatId, `[멍](${res.data.url})`, {
        parse_mode: 'Markdown'
      })
    })
  }

  @OnRoute('냥')
  catPhoto(msg: Message, bot: Bot) {
    const chatId = msg.chat.id
    let query = +new Date()

    let url = `http://thecatapi.com/api/images/get?format=src&seed=${query}`
    bot.sendMessage(chatId, `[냥](${url})`, {
      parse_mode: 'Markdown'
    })
  }

  @OnRoute('냠')
  foodPhoto(msg: Message, bot: Bot) {
    const chatId = msg.chat.id

    let query = +new Date()

    bot.sendMessage(chatId, `[냠](https://source.unsplash.com/collection/345760?seed=${query})`, {
      parse_mode: 'Markdown'
    })
  }

}

export default new PhotoBot()