import { createLimitOrder } from "./orderControllor.js";
import { doneJobs } from "../config.js";

const executeJobs = async (arrOfJobs) => {
  // Jobs of NEW_ORDER
  if(arrOfJobs.some((job) => {return job.task == "NEW_ORDER"})){
    const newOrderArr = arrOfJobs.filter((job) => {
      return job.task == "NEW_ORDER";
    });
    // Execute limit orders
    let doneLMOrderId = await executeNewLMOrder(newOrderArr);
    doneJobs.push(...doneLMOrderId)
    // Execute market orders
  }
  // Jobs of EDIT_ORDER
  // Jobs of CANCEL_ORDER
  
};

const executeNewLMOrder = async (newOrderArr) => {
  if(newOrderArr.some(order => {return order.type == "LIMIT"})){
    const limitOrderArr = newOrderArr.filter((order) => {
      return order.type == "LIMIT";
    });
    const doneLimitOrder = await createLimitOrder(limitOrderArr);
    return doneLimitOrder.map((doneOrder) => {return doneOrder.clientOrderId})
  }
};


export { executeJobs };
