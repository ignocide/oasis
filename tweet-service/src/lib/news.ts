import axios, { AxiosInstance } from 'axios'
import Singleton from "./singleton";
import { parseString } from 'xml2js'

const NewsCategory = {
  ALL: "전체",
  IMPORTANT: "중요",
  MONEY: "경제",
  LIFE: "생활",
  POLITICS: "정치",
  WORLD: "세계",
  CULTURE: "문화",
  IT: "IT",
  DAILY: "데일리",
}

const NewsCategoryUrls = {
  [NewsCategory.ALL]: 'joins_news_list.xml',
  [NewsCategory.IMPORTANT]: 'joins_homenews_list.xml',
  [NewsCategory.MONEY]: 'joins_money_list.xml',
  [NewsCategory.LIFE]: 'joins_news_life.xml',
  [NewsCategory.POLITICS]: 'joins_politics_list.xml',
  [NewsCategory.WORLD]: 'joins_world_list.xml',
  [NewsCategory.CULTURE]: 'joins_culture_list.xml',
  [NewsCategory.IT]: 'joins_it_list.xml',
  [NewsCategory.DAILY]: '/news/joins_joongangdaily_news.xml',
}

class NewsItem {
  title?: string;
  link?: string;
  description?: string;
  author?: string;
  pubDate?: Date;

  constructor(newsItem: any) {
    this.title = newsItem.title[0] || null;
    this.link = newsItem.link[0] || null;
    this.description = newsItem.description[0] || null;
    this.author = newsItem.author[0] || null;
    this.pubDate = newsItem.pubDate[0] ? new Date(newsItem.pubDate[0]) : null;
  }

}

class News extends Singleton {
  private request: AxiosInstance;
  private baseUrl = 'https://rss.joins.com/';

  constructor() {
    super();

    this.request = axios.create({
      baseURL: this.baseUrl
    });
  }

  async getNews(type: string = NewsCategory.ALL) {
    const result = await this.request.get(NewsCategoryUrls[type]);
    const items = await this.parseString(result.data)
    // let feed = await this.rssParser.parseURL(this.baseUrl + type);
    // return feed
    return items
  }

  async parseString(xmlString: string) {
    return new Promise((resolve, reject) => {
      parseString(xmlString, function (err, result) {
        if (err) {
          return reject(err)
        }
        const items: any[] = result.rss.channel[0].item
        const newItems = items.map(item => new NewsItem(item));
        return resolve(newItems)
      })
    })
  }

  // StringToXMLDom(xmlString: string): any {
  //   var xmlDoc = null;
  //   const parser: any = new DOMParser();
  //   xmlDoc = parser.parseFromString(xmlString, "text/xml");
  //
  //   return xmlDoc
  // }

}

const news: News = News.getInstance();
export default news;
export { NewsCategory, NewsItem }