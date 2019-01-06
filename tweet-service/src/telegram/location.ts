import {Message, OnText, TelegramRouter, Bot} from "../lib/telegram";
import geocoding from '../lib/geocoding';

class LocationBot extends TelegramRouter {

  parsingCmd(msg:string){
    const args = msg.split(' ')
    args.shift()
    return args
  }


  @OnText(/\/지역/)
  location(msg: Message, bot: Bot) {
    const chatId = msg.chat.id
    console.log(this)
    try{
    const locationName = this.parsingCmd(msg.text)[0]
    if(!locationName){
      throw new Error('잘못된 지역명입니다.')
      return bot.sendMessage(chatId, '잘못된 지역명입니다.')
    }
    const address = geocoding.locationNameToPoint(locationName)

    console.log(address)

    }
    catch(e){
      console.error(e)
    }

    //
    //   ,function(err,result){
    //   if(err){
    //     throw err
    //   }
    //   const address = result.address
    //   const location = result.location
    //   bot.sendMessage(chatId,`
    //     주소 : ${address}\n좌표 : lat ${location.lat}, lng ${location.lng}
    //     `)
    // })
    //
    // bot.sendMessage(chatId, 'pong')
  }
}

export default new LocationBot()