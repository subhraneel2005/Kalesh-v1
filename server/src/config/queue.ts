import {ConnectionOptions, DefaultJobOptions} from 'bullmq'

export const redisConenction: ConnectionOptions = {
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    connectTimeout: 10000,
};


export const deafultQueueOptions: DefaultJobOptions ={
    removeOnComplete: {
        count: 20,
        age: 60*60,
    },
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 3000,
    },
    removeOnFail: false
};
