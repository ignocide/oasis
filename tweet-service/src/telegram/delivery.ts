import {Bot, Message, OnRoute, TelegramRouter} from "../lib/telegram";
import Delivery from '../repository/delivery'

class DeliveryBot extends TelegramRouter {

  @OnRoute('택배등록 택배사 송장번호')
  async registDelivery(msg: Message, bot: Bot, args: any[]) {
    const {id: chatId} = msg.chat
    const [company, invoiceNumber] = args;
    console.log(chatId, company, invoiceNumber)
    const result = await new Delivery({company, invoiceNumber, chatId}).save()
    // const list = await Delivery.fetch();
  }

}

export default new DeliveryBot()