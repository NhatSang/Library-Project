import { Inject, Service } from "typedi";
import { StatisticsService } from "./statistics.service";
import { NextFunction, Request, Response } from "express";
import { ResponseCustom } from "../../helper/response";

@Service()
export class StatisticsController {
  constructor(@Inject() private statisticsService: StatisticsService) {}

  getTop10HighestViewsBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.statisticsService.getTop10HighestViewsBooks(
        req.query
      );
      res.send(new ResponseCustom(result));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  getTop10HighestRatingBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.statisticsService.getTop10HighestRatingsBooks(
        req.query
      );
      res.send(new ResponseCustom(result));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
