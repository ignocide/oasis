import {Message, OnText, TelegramRouter, Bot} from "../lib/telegram";
import newsApi, {NewsCategory, NewsItem} from '../lib/news'

class NewsBot extends TelegramRouter {

  @OnText(/\/뉴스/)
  async news(msg: Message, bot: Bot) {
    const chatId = msg.chat.id
    try {
      const news: any = await newsApi.getNews();
      let newsItems: NewsItem[] = news
      newsItems = newsItems.splice(0, 5)
      let newsStr = newsItems.map((news) => {
        return `<a href="${news.link}">${news.title}</a>`
      })
      const sendMessage = `${newsStr.join("\n\n")}`

      return bot.sendMessage(chatId, sendMessage, {
        parse_mode: 'HTML'
      })
    }
    catch (e) {
      return bot.sendMessage(chatId, `오류가 발생했어요!`)
    }
  }

}

export default new NewsBot()
