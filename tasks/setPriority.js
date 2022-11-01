import { checkHighPriorityJobs, checklowhPriorityJobs } from "../dbConnection/getJobs.js";

const setPriority = async (pool, client) => {
    let priority = -1;

    if((await checkHighPriorityJobs(pool, client)).length != 0){
        return priority = 0;
    }else if((await checklowhPriorityJobs(pool, client)).length != 0){
        return priority = 1;
    }
  };


  export{setPriority}