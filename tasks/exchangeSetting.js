import "dotenv/config"
import ccxt from "ccxt"

const binanceClient = new ccxt.binance({
  apiKey: process.env.API_KEY,
  secret: process.env.API_SECRET
})

export { binanceClient }
