import { binanceClient } from "./exchangeSetting.js";

const createLimitOrder = async (limitOrderArr) => {
    const arrOfLMOPromise =  limitOrderArr.map((order) => {
        let {symbol, type, side, amount, price} = JSON.parse(order.input_json)
        let params = {'clientOrderId': order.id};
        // console.log(symbol, type, side, amount, price, params)
        return binanceClient.createOrder(symbol, type, side, amount, price, params)
    })
    return await Promise.all(arrOfLMOPromise)
}

export { createLimitOrder };
