import axios, {AxiosInstance} from 'axios'
import Singleton from "./singleton";
import {parseString} from 'xml2js'

enum NewsCategory {
  ALL = 'joins_news_list.xml',
  IMPORTANT = '/joins_homenews_list.xml',
  MONEY = 'joins_money_list.xml',
  LIFE = 'joins_news_life.xml',
  POLITICS = 'joins_politics_list.xml',
  WORLD = 'joins_world_list.xml',
  CULTURE = 'joins_culture_list.xml',
  IT = 'joins_it_list.xml',
  DAILY = 'joins_joongangdaily_list.xml',
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
    this.pubDate = newsItem.pubDate[0] ? new Date(newsItem.pubDate[0]): null;
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

  async getNews(type: NewsCategory = NewsCategory.ALL) {
    const result = await this.request.get(type);
    const items = await this.parseString(result.data)
    // let feed = await this.rssParser.parseURL(this.baseUrl + type);
    // return feed
    return items
  }

  async parseString(xmlString: string) {
    return new Promise((resolve, reject) => {
      parseString(xmlString,function(err,result){
        if(err){
          return reject(err)
        }
        const items: any[]= result.rss.channel[0].item
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
export {NewsCategory,NewsItem}