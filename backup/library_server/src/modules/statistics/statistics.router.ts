import { Router } from "express";
import Container from "typedi";
import { StatisticsController } from "./statistics.controller";

const statisticsRouter = Router();
const statisticsController = Container.get(StatisticsController);

statisticsRouter.get(
  "/get-highest-views-books",
  statisticsController.getTop10HighestViewsBooks
);
statisticsRouter.get(
  "/get-highest-rating-books",
  statisticsController.getTop10HighestRatingBooks
);
statisticsRouter.get(
  "/get-num-users",
  statisticsController.getNumOfUser
);
statisticsRouter.get("/get-summary", statisticsController.getSummary);
export default statisticsRouter;
