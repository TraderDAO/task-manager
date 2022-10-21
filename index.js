import { listener } from "./tasks/listener.js";
import { initPool, initClient } from "./dbConnection/initDB.js";

const taskManager = () => {
  // initDB
  const pool = initPool();
  const client = initClient();

  // TaskManager Start listening
  listener(pool, client);
};

taskManager();

