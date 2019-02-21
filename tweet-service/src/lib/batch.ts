

import Singleton from "./singleton";
import Delivery from "../repository/delivery";
import { ScheduledTask, schedule } from "node-cron";
import deliveryService from "../service/delivery";
class BatchService extends Singleton {
  protected task: ScheduledTask;
  init() {
    //every 5 min
    this.task = schedule('*/5 * * * *', this.cronTask)
  }

  async cronTask() {
    const candidates = await deliveryService.fetchCandidates();
    await Promise.all(candidates.map(async (delivery: any) => {
      await deliveryService.updateDelivery(delivery);
    }))
  }

}


const batchService: BatchService = BatchService.getInstance();
export default batchService; 