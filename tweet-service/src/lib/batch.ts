

import Singleton from "./singleton";
import Delivery from "../repository/delivery";
import {ScheduledTask,schedule} from "node-cron";
import deliveryService from "../service/delivery";
class BatchService extends Singleton {
  protected task:ScheduledTask;
  init() {
    //every 5 min
    this.task = schedule('*/5 * * * *', this.cronTask)
    // this.cronTask()
  }

  async cronTask() {
    // let list:any = await Delivery.fetchAll()
    // list = list.toJSON();
    const candidates = await deliveryService.fetchCandidates();
    await Promise.all(candidates.map(async (delivery:any) =>{
      await deliveryService.updateDelivery(delivery);
    }))
    // console.log(list)
  }

}


const batchService: BatchService = BatchService.getInstance();
export default batchService;