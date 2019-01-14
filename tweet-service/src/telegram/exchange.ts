import { Message, OnText, TelegramRouter, Bot, OnRoute } from "../lib/telegram";
import exchangeApi from '../lib/exchange'

class ExchangeBot extends TelegramRouter {

  @OnRoute("환율정보")
  async exchangeInfo(msg: Message, bot: Bot, args: any[]) {
    const chatId = msg.chat.id
    try {
      const [currency] = args
      const exchangeInfo = await exchangeApi.exchangeInfo(currency);

      if (!exchangeInfo) {
        return bot.sendMessage(chatId, "환율 정보를 찾을 수 없습니다.", {
          parse_mode: 'Markdown'
        })
      }

      const sendMessage = [
        `${exchangeInfo.currencyName}(${exchangeInfo.currencyUnit})`,
        `기준환율 : ${exchangeInfo.standardRate}`,
        `살때 : ${exchangeInfo.buyPrice}`,
        `팔때 : ${exchangeInfo.sellPrice}`,
      ]

      return bot.sendMessage(chatId, sendMessage.join('\n'), {
        parse_mode: 'Markdown'
      })
    }
    catch (e) {
      console.log(e)
      return bot.sendMessage(chatId, `오류가 발생했어요!`)
    }
  }

  @OnRoute("환전구매")
  async buyMoney(msg: Message, bot: Bot, args: any[]) {
    const chatId = msg.chat.id
    try {
      const [currency, price] = args
      const exchangeInfo = await exchangeApi.exchangeInfo(currency);

      if (!exchangeInfo) {
        return bot.sendMessage(chatId, "환율 정보를 찾을 수 없습니다.", {
          parse_mode: 'Markdown'
        })
      }
      const sendMessage = [
        `KRW : ${price}`,
        `=`,
        `${exchangeInfo.currencyUnit} : ${Math.floor(price / exchangeInfo.buyPrice * 100) / 100}`,
      ]

      return bot.sendMessage(chatId, sendMessage.join('\n'), {
        parse_mode: 'Markdown'
      })
    }
    catch (e) {
      console.log(e)
      return bot.sendMessage(chatId, `오류가 발생했어요!`)
    }
  }

  @OnRoute('환전판매')
  async sellMoney(msg: Message, bot: Bot, args: any[]) {
    const chatId = msg.chat.id
    try {
      const [currency, price] = args
      const exchangeInfo = await exchangeApi.exchangeInfo(currency);

      if (!exchangeInfo) {
        return bot.sendMessage(chatId, "환율 정보를 찾을 수 없습니다.", {
          parse_mode: 'Markdown'
        })
      }

      const sendMessage = [
        `${exchangeInfo.currencyUnit} : ${Math.floor(exchangeInfo.sellPrice / price * 100) / 100}`,
        `=`,
        `KRW : ${price}`,
      ]

      return bot.sendMessage(chatId, sendMessage.join('\n'), {
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
