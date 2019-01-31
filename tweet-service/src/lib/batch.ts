

import Singleton from "./singleton";
import Delivery from "../repository/delivery";
import {ScheduledTask,schedule} from "node-cron";
class BatchService extends Singleton {
  protected task:ScheduledTask;
  init (){
    //every 5 min
    this.task = schedule('*/5 * * * *',this.cronTask)
  }

  async cronTask (){
    let list:any = await Delivery.fetchAll()
    list = list.toJSON();


  }

}


const batchService: BatchService = BatchService.getInstance();
export default batchService;