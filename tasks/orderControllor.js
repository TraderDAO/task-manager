import { binanceClient } from "./exchangeSetting.js";

const createLimitOrder = async (limitOrderArr) => {
  const arrOfLMOPromise = limitOrderArr.map((order) => {
    let { symbol, type, side, amount, price } = JSON.parse(order.input_json);
    let params = { clientOrderId: order.id };
    // console.log(symbol, type, side, amount, price, params)
    return binanceClient.createOrder(symbol, type, side, amount, price, params);
  });
  return await Promise.all(arrOfLMOPromise);
};

const cancelOrder = async (cancelOrderArr) => {
  try {
    const arrOfCancelPromise = cancelOrderArr.map((order) => {
      // console.log(JSON.parse(order.input_json));
      let { orderid, symbol } = JSON.parse(order.input_json);
      let params = { newClientOrderId: order.id };
      console.log(params);
      console.log("orderid", orderid);
      return binanceClient.cancelOrder(orderid, symbol, params);
    });
    console.log(arrOfCancelPromise);
    return await Promise.all(arrOfCancelPromise);
  } catch (err) {
    console.log(err);
    console.log(typeof err);
    let orderids = [];
    cancelOrderArr.forEach((order) => {
      orderids.push(JSON.parse(order.input_json).orderid);
    });

    return { code: 400, ids: orderids };
  }
};

export { createLimitOrder, cancelOrder };
