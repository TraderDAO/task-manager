import { doneJobs } from "../config.js";

const updateDoneJob = (pool) => {
  doneJobs.forEach((job) => {
    const queryString = `UPDATE tradingplatform.jobs SET done = 'true' WHERE id = '${job}'`;
    console.log("queryString", queryString);
    pool.query(queryString, (err) => {
      if (err == undefined) {
        doneJobs.shift();
      }
    });
  });
};

export { updateDoneJob };
