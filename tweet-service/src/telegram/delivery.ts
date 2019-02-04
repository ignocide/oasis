import {Bot, Message, OnRoute, TelegramRouter} from "../lib/telegram";
import Delivery from '../repository/delivery'
import deliveryService from "../service/delivery";

class DeliveryBot extends TelegramRouter {

  @OnRoute('택배등록 택배사 송장번호')
  async registDelivery(msg: Message, bot: Bot, args: any[]) {
    const {id: chatId} = msg.chat
    const [companyName, invoiceNumber] = args;
    if(!deliveryService.isValidCompanyName(companyName)){
      return bot.sendMessage(chatId,'택배사 이름을 확인해 주세요.')
    } else if(!invoiceNumber){
      return bot.sendMessage(chatId,'송장번호가 필요합니다.')
    }
    const companyCode = deliveryService.getDeliveryCompanyCode(companyName);

    let result = await deliveryService.registInvoice(companyCode,invoiceNumber,chatId)
    console.log(result)
    return bot.sendMessage(chatId,'등록되었습니다.')
  }

}

export default new DeliveryBot()