import "reflect-metadata";
import { BullMQAdapter } from "bull-board/bullMQAdapter";
import express from "express";
import ConnectDB from "./database/db";
import userRouter from "./modules/user/user.router";
import { handleErrors } from "./helper/error";
import { createBullBoard } from "bull-board";
import statisticsRouter from "./modules/statistics/statistics.router";
import cors from "cors";
import genreRouter from "./modules/genre/genre.router";
import { Queues } from "./helper/queue";
import authRouter from "./modules/auth/auth.router";
import majorsRouter from "./modules/majors/majors.router";

(async () => {
  const app = express();
  const port = 3000;
  app.use(cors());
  app.use(express.json());
  await ConnectDB();
  const { router: bullBoardRouter } = createBullBoard([
    new BullMQAdapter(Queues.emailQueue.queue),
  ]);
  app.use("/admin/queues", bullBoardRouter);

  app.use("/api/v1", userRouter);
  app.use("/api/v1", statisticsRouter);
  app.use("/api/v1", genreRouter);
  app.use("/api/v1", authRouter);
  app.use("/api/v1", majorsRouter);
  app.use(handleErrors);
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
})();
