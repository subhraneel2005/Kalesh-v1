import {Job, Queue, Worker} from "bullmq"
import { deafultQueueOptions, redisConenction } from "../config/queue.js";
import prisma from "../config/database.js";

export const commentQueueName = "commentQueue";


export const commentQueue = new Queue(commentQueueName, {
    connection: redisConenction,
    defaultJobOptions: {
        ...deafultQueueOptions,
        delay: 100,
    }
});

export const queueWorker = new Worker(commentQueueName, async(job: Job) => {
    const data = job.data;
    await prisma.kaleshComments.create({
        data:{
            comment: data?.comment,
            kalesh_id: Number(data?.id)
        }
    })
   
}, {
    connection: redisConenction,
})