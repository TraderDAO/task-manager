import {
  checkHighPriorityJobs,
  checklowhPriorityJobs,
} from "../dbConnection/getJobs.js";

const setPriority = async (pool, client) => {
  if ((await checkHighPriorityJobs(pool, client)).length != 0) {
    return 0;
  }
  if ((await checklowhPriorityJobs(pool, client)).length != 0) {
    return 1;
  }
};

export { setPriority };
