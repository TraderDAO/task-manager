import { dbInput } from "../config.js";

const checkHighPriorityJobs = async (client, pool) => {
  const query = `select * from tradingplatform.jobs where priority = 'high' and done = FALSE`;
  const res = await client.query(query);
  const openJobs = res.rows;
  // await client.end()
  // console.log('openJobs', openJobs)

  return openJobs;
};

const checklowhPriorityJobs = async (client, pool) => {
  const query = `select * from tradingplatform.jobs where priority = 'low' and done = FALSE`;
  const res = await client.query(query);
  const openJobs = res.rows;
  // await client.end()
  // console.log('openJobs', openJobs)

  return openJobs;
};

export { checkHighPriorityJobs, checklowhPriorityJobs };
