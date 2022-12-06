import { dbInput } from "../config.js";
import { executeJobs } from "./executeJobs.js";
import { updateDoneJob } from "../dbConnection/updateDoneJob.js";
import { setPriority } from "./setPriority.js";
import logger from "../logger.js";

const listener = (pool, client) => {
  setTimeout(async () => {
    const job = await setPriority(pool, client);
    logger.info("setPriority....");
    logger.info(job);

    switch (job.priority) {
      case 0:
        logger.info("in execution process of highPriorityJobs ...");
        await executeJobs(job.highPriorityJobs, pool);
        updateDoneJob(pool);
        break;
      case 1:
        console.log("in case 1 low priority");
        break;
    }

    // Keep listening
    listener(pool, client);
  }, dbInput.loadTimeout);
};
export { listener };
