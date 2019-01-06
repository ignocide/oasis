import {Message, OnText, TelegramRouter, Bot} from "../lib/telegram";
import geocodingApi from '../lib/geocoding';
import weatherApi from '../lib/weather';

class LocationBot extends TelegramRouter {

  @OnText(/\/지역/)
  async location(msg: Message, bot: Bot) {
    const chatId = msg.chat.id
    try {
      const locationName = this.parsingCmd(msg.text)[0]
      if (!locationName) {
        throw new Error('잘못된 지역명입니다.')
        return bot.sendMessage(chatId, '잘못된 지역명입니다.')
      }
      const point = await geocodingApi.locationNameToPoint(locationName)

      const {address, location} = point
      return bot.sendMessage(chatId, ` 주소 : ${address}\n좌표 : lat ${location.lat}, lng ${location.lng}`)
    }
    catch (e) {
      console.log(e)
      return bot.sendMessage(chatId, `오류가 발생했어요!`)
    }
  }

  @OnText(/\/날씨/)
  async weatherNow(msg: Message, bot: Bot) {
    const chatId = msg.chat.id
    try {
      const locationName = this.parsingCmd(msg.text)[0]
      if (!locationName) {
        throw new Error('잘못된 지역명입니다.')
        return bot.sendMessage(chatId, '잘못된 지역명입니다.')
      }
      const point = await geocodingApi.locationNameToPoint(locationName)

      const {address, location} = point

      const weather = await weatherApi.getWeatherFromCoor(location.lat, location.lng);
      const message = [
        `위치 : ${address}`,
        `날씨 : ${weather.weather}`,
        `가시거리 : ${weather.visibility}`,
        `일출 : ${weather.sunrise}`,
        `위몰 : ${weather.sunset}`,
        `온도 : ${weather.temp.current}`,
        `최저 온도 : ${weather.temp.min}`,
        `최고 온도 : ${weather.temp.max}`,
        `압력 : ${weather.pressure}`,
        `바람 : ${weather.wind}`,
        `측정시간 : ${weather.time}`,
        `측정위치 : ${weather.measureLocation}`
      ]
      bot.sendMessage(chatId, message.join('\n'))
    }
    catch (e) {
      console.log(e)
      return bot.sendMessage(chatId, `오류가 발생했어요!`)
    }
  }
}

console.log("왜 여기선 작동 안해?")
export default new LocationBot()