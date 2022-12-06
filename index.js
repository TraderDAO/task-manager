import { listener } from "./tasks/listener.js";
import { initPool, initClient } from "./dbConnection/initDB.js";
import logger from "./logger.js";

const taskManager = () => {
  logger.info("init DB Pool and Client ...");
  const pool = initPool();
  const client = initClient();

  logger.info("TaskManager Start listening ...");
  listener(pool, client);
};

taskManager();
