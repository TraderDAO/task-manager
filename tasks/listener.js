import { dbInput } from "../config.js";
import { executeJobs } from "./executeJobs.js";
import { updateDoneJob } from "../dbConnection/updateDoneJob.js";
import { setPriority } from "./setPriority.js";

const listener = (pool, client) => {
  setTimeout(async () => {
    // Prioritize jobs in the DB
    const abc = await setPriority(pool, client);
    if (abc) {
      // Execute job depends on the priority
      switch (abc.priority) {
        case 0:
          console.log("in case 0 high priority");
          await executeJobs(abc.highPriorityJobs, pool);
          updateDoneJob(pool);
          break;
        case 1:
          console.log("in case 1 low priority");
          break;
      }
    }

    // Keep listening
    listener(pool, client);
  }, dbInput.loadTimeout);
};
export { listener };
