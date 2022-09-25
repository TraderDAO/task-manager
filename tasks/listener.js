import { checkHighPriorityJobs, checklowhPriorityJobs } from "../dbConnection/getJobs.js";
import { dbInput } from "../config.js";
import { executeJobs } from "./executeJobs.js";
import { updateDoneJob } from "../dbConnection/updateDoneJob.js";

const listener = (pool, client) => {
  (function listen() {  
    setTimeout(async () => {
      // Set priority
      let priority = -1;
      const highPriorityJobs = await checkHighPriorityJobs(pool, client);
      const lowPriorityJobs = await checklowhPriorityJobs(pool, client);
      if(highPriorityJobs.length != 0){ priority = 0}
      else if (highPriorityJobs.length == 0 && lowPriorityJobs.length != 0){priority = 1}

      // Execute depends on the priority
      switch (priority){
        case 0: 
          await executeJobs(highPriorityJobs);
          updateDoneJob(pool);
          break;
        case 1: 
          console.log('in case 1 low priority');
          break;
      }

      // Keep listening
      listen();
    }, dbInput.loadTimeout);
  })();
};

export { listener };
