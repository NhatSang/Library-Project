import "reflect-metadata";
import { BullMQAdapter } from "bull-board/bullMQAdapter";
import express from "express";
import redisClient from "./redis/redis.config";
import ConnectDB from "./database/db";
import userRouter from "./modules/user/user.router";
import { handleErrors } from "./helper/error";
import { createBullBoard } from "bull-board";
import { emailQueue } from "./bullMQ/email/email.queue";
import statisticsRouter from "./modules/statistics/statistics.router";
import cors from "cors";
import genreRouter from "./modules/genre/genre.router";

(async () => {
  const app = express();
  const port = 3000;
  app.use(cors());
  app.use(express.json());
  await redisClient.connect();
  await ConnectDB();
  const { router: bullBoardRouter } = createBullBoard([
    new BullMQAdapter(emailQueue),
  ]);
  app.use("/admin/queues", bullBoardRouter);

  app.use("/api/v1", userRouter);
  app.use("/api/v1", statisticsRouter);
  app.use("/api/v1", genreRouter);
  app.use(handleErrors);
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
})();
