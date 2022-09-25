import 'dotenv/config'
import pkg from 'pg';
const {Pool, Client} = pkg;

const initPool = () =>{
    try{
        const pool = new Pool({
            user: process.env.user,
            host: process.env.host,
            database: process.env.database,
            password: process.env.password,
            port: process.env.port,
        });
        return pool;
    }catch(err){
        // logger.error(`[initPool] ${err}`);
        console.log("initPool err", err)
    }
};

const initClient = () => {
    try{
        const client = new Client({
            user: process.env.user,
            host: process.env.host,
            database: process.env.database,
            password: process.env.password,
            port: process.env.port,
        })
        client.connect();
        return client;
    }catch(err){
        // logger.error(`[initClient] ${err}`);
        console.log("initClient err", err)
    }  
}

export {
    initClient,
    initPool
}
