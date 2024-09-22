import {Job, Queue, Worker} from "bullmq"
import { deafultQueueOptions, redisConenction } from "../config/queue.js";
import prisma from "../config/database.js";

export const votingQueueName = "votingQueue";


export const votingQueue = new Queue(votingQueueName, {
    connection: redisConenction,
    defaultJobOptions: {
        ...deafultQueueOptions,
        delay: 500,
    }
});

export const queueWorker = new Worker(votingQueueName, async(job: Job) => {
    const data = job.data;
    await prisma.kaleshItem.update({
        where:{
            id: Number(data?.kaleshItemId)
        },
        data:{
            count:{
                increment: 1
            }
        }
    })
   
}, {
    connection: redisConenction,
})