import { Inject, Service } from "typedi";
import { ChapterService } from "./chapter.service";
import { NextFunction, Request, Response } from "express";
import { ResponseCustom } from "../../helper/response";

@Service()
export class ChapterController {
  constructor(@Inject() private chapterService: ChapterService) {}

  getChapters = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.chapterService.getChapters(req.params.bookId);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  getChapterById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.chapterService.getChapterById(req.params.chapterId);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };
}
