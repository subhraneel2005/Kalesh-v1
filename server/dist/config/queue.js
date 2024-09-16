export const redisConenction = {
    host: process.env.REDIS_HOST,
    port: 6379,
};
export const deafultQueueOptions = {
    removeOnComplete: {
        count: 20,
        age: 60 * 60,
    },
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 3000,
    },
    removeOnFail: false
};
