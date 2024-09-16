import { Queue, Worker } from "bullmq";
import { deafultQueueOptions, redisConenction } from "../config/queue.js";
import { sendEmail } from "../config/mail.js";
export const emailQueueName = "emailQueue";
export const emailQueue = new Queue(emailQueueName, {
    connection: redisConenction,
    defaultJobOptions: deafultQueueOptions
});
export const queueWorker = new Worker(emailQueueName, async (job) => {
    const data = job.data;
    await sendEmail(data.to, data.subject, data.body);
    // console.log("The queue data is", data)
}, {
    connection: redisConenction,
});
