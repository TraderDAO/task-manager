import { createLimitOrder, cancelOrder } from "./orderControllor.js";
import { doneJobs } from "../config.js";

const executeJobs = async (arrOfJobs, pool) => {
  // Jobs of NEW_ORDER
  if (
    arrOfJobs.some((job) => {
      return job.task == "NEW_ORDER";
    })
  ) {
    const newOrderArr = arrOfJobs.filter((job) => {
      return job.task == "NEW_ORDER";
    });
    // Execute limit orders
    let doneLMOrderId = await executeNewLMOrder(newOrderArr);
    console.log(doneLMOrderId);
    doneJobs.push(...doneLMOrderId);
    // Execute market orders
  }
  // Jobs of CANCEL_ORDER
  if (
    arrOfJobs.some((job) => {
      return job.task == "CANCEL_ORDER";
    })
  ) {
    const cancelOrderArr = arrOfJobs.filter((job) => {
      return job.task == "CANCEL_ORDER";
    });
    console.log(cancelOrderArr);
    let res = await cancelOrder(cancelOrderArr);
    if (res.code == 400) {
      console.log(res);
      let failCancelOrderIds = res.ids;
      for (let i = 0; i < failCancelOrderIds.length; i++) {
        let abc = failCancelOrderIds[i];
        const updateOrder = `UPDATE dbt_traderdao.orderstable3 SET unfilledstatus = 'NEW' WHERE orderid = '${abc}'`;
        await pool.query(updateOrder);
      }
    } else {
      console.log("cancel res from binance", res[0]);
      const cancelId = res[0].clientOrderId;
      // .map((canceled) => {
      //   return canceled.clientOrderId;
      // });
      console.log("cancelId", cancelId);
      doneJobs.push(cancelId);
      console.log("doneJobs", doneJobs);
    }
  }
};

const executeNewLMOrder = async (newOrderArr) => {
  if (
    newOrderArr.some((order) => {
      return order.type == "LIMIT";
    })
  ) {
    const limitOrderArr = newOrderArr.filter((order) => {
      return order.type == "LIMIT";
    });
    const doneLimitOrder = await createLimitOrder(limitOrderArr);
    return doneLimitOrder.map((doneOrder) => {
      return doneOrder.clientOrderId;
    });
  }
};

export { executeJobs };
