import { Message, OnText, TelegramRouter, Bot, OnRoute } from "../lib/telegram";
import exchangeApi from '../lib/exchange2'
import * as moment from 'moment';

class ExchangeBot extends TelegramRouter {

  @OnRoute('환율2')
  async exchangeInfo(msg: Message, bot: Bot, args: any[]) {
    const chatId = msg.chat.id
    try {
      let [fromCurrency, toCurrency, price] = args

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
