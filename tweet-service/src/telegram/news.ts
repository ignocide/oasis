import { Message, OnText, TelegramRouter, Bot, OnRoute } from "../lib/telegram";
import newsApi, { NewsCategory, NewsItem } from '../lib/news'

class NewsBot extends TelegramRouter {

  @OnRoute('뉴스')
  async news(msg: Message, bot: Bot, args: string[]) {
    const chatId = msg.chat.id
    try {
      let [type] = args

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
          disable_web_page_preview: true,
        })
      }


    }
    catch (e) {
      console.log(e)
      return bot.sendMessage(chatId, `오류가 발생했어요!`)
    }
  }
}

export default new NewsBot()
