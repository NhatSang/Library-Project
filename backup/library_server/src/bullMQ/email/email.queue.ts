
import { ConnectionOptions, Job, Queue, Worker } from "bullmq";
import { EmailProccessor } from "./email.processor";
import { env } from "../../helper";

const connectionOptions: ConnectionOptions = {
  host: env.REDIS_HOST,
  port: parseInt(env.REDIS_PORT),
};

export const emailQueue = new Queue("emailQueue", {
  connection: connectionOptions,
});

export const emailWorker = new Worker(
  "emailQueue",
  async (job: Job) => {
    const { email, subject, content } = job.data;
    try {
      await EmailProccessor.sendEmail(email, subject, content);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  { connection: connectionOptions }
);
emailWorker.on("failed", (job, err) => {
  console.error(`Job failed with id ${job.id}: ${err.message}`);
});
