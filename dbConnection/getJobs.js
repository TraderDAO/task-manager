import { dbInput } from "../config.js";

const checkHighPriorityJobs = async (client, pool) => {
  const query = `select * from tradingplatform.jobs where priority = 'HIGH' and done = FALSE`;
  const res = await client.query(query);
  const openJobs = res.rows;
  // await client.end()
  console.log("openJobs", openJobs);

  return openJobs;
};

const checklowPriorityJobs = async (client, pool) => {
  const query = `select * from tradingplatform.jobs where priority = 'LOW' and done = FALSE`;
  const res = await client.query(query);
  const openJobs = res.rows;
  // await client.end()
  // console.log('openJobs', openJobs)

  return openJobs;
};

export { checkHighPriorityJobs, checklowPriorityJobs };
