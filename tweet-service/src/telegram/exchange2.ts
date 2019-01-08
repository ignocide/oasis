import { Message, OnText, TelegramRouter, Bot } from "../lib/telegram";
import exchangeApi from '../lib/exchange2'
import * as moment from 'moment';

class ExchangeBot extends TelegramRouter {

  @OnText(/\/환율2/)
  async exchangeInfo(msg: Message, bot: Bot) {
    const chatId = msg.chat.id
    try {
      const args = this.parsingCmd(msg.text)
      let fromCurrency: any = args[0]
      let toCurrency: any = args[1]
      let price: any = args[2]

      if (price === undefined && !isNaN(toCurrency)) {
        price = toCurrency
        toCurrency = fromCurrency
        fromCurrency = "KRW"
      }

      const exchangeInfo = await exchangeApi.exchangeInfo(fromCurrency, toCurrency);

      if (!exchangeInfo) {
        return bot.sendMessage(chatId, "환율 정보를 찾을 수 없습니다.", {
          parse_mode: 'Markdown'
        })
      }

      const sendMessage = [
        `${fromCurrency} : ${price} = ${toCurrency} : ${Math.floor(exchangeInfo.rate * price * 100) / 100}`,
        `(${moment(exchangeInfo.date).format('YYYY-MM-DD hh:mm:ss')} yahoo 기준매매가)`
      ]

      return bot.sendMessage(chatId, sendMessage.join('  '), {
        parse_mode: 'Markdown'
      })
    }
    catch (e) {
      console.log(e)
      return bot.sendMessage(chatId, `오류가 발생했어요!`)
    }
  }
}

export default new ExchangeBot()
