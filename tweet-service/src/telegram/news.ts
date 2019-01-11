import { Message, OnText, TelegramRouter, Bot } from "../lib/telegram";
import newsApi, { NewsCategory, NewsItem } from '../lib/news'

class NewsBot extends TelegramRouter {

  @OnText(/\/뉴스\s\S+$/)
  async news(msg: Message, bot: Bot) {
    const chatId = msg.chat.id
    try {
      const type = this.parsingCmd(msg.text)[0]
      console.log(type)

      if (type === "카테고리") {
        let myEnum: any = NewsCategory;
        const categoies = Object.keys(NewsCategory).map((key: string) => {
          return myEnum[key]
        })
        return bot.sendMessage(chatId, categoies.join(', '), {
          parse_mode: 'HTML'
        })

      } else {
        const news: any = await newsApi.getNews(type);
        let newsItems: NewsItem[] = news
        newsItems = newsItems.splice(0, 10)
        let newsStr = newsItems.map((news) => {
          return `<a href="${news.link}">${news.title}</a>`
        })
        const sendMessage = `${newsStr.join("\n\n")}`
        return bot.sendMessage(chatId, sendMessage, {
          parse_mode: 'HTML',
          disable_web_page_preview: false,
        })
      }


    }
    catch (e) {
      return bot.sendMessage(chatId, `오류가 발생했어요!`)
    }
  }

  @OnText(/\/뉴스$/)
  async newsCategory(msg: Message, bot: Bot) {
    const chatId = msg.chat.id
    try {
      const news: any = await newsApi.getNews();
      let newsItems: NewsItem[] = news
      newsItems = newsItems.splice(0, 10)
      let newsStr = newsItems.map((news) => {
        return `<a href="${news.link}">${news.title}</a>`
      })
      return bot.sendMessage(chatId, newsStr.join('\n\n'), {
        parse_mode: 'HTML',
        disable_web_page_preview: false,
      })
    }
    catch (e) {
      console.log(e)
      return bot.sendMessage(chatId, `오류가 발생했어요!`)
    }
  }

}

export default new NewsBot()
