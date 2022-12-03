import {
  checkHighPriorityJobs,
  checklowPriorityJobs,
} from "../dbConnection/getJobs.js";

const setPriority = async (pool, client) => {
  const highPriorityJobs = await checkHighPriorityJobs(pool, client);
  if (highPriorityJobs.length != 0) {
    return { priority: 0, highPriorityJobs };
  }
  if ((await checklowPriorityJobs(pool, client)).length != 0) {
    return { priority: 1 };
  }
};

export { setPriority };
