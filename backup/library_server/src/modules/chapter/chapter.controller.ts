import { Inject, Service } from "typedi";
import { ChapterService } from "./chapter.service";
import { NextFunction, Request, Response } from "express";
import { ResponseCustom } from "../../helper/response";

@Service()
export class ChapterController {
  constructor(@Inject() private chapterService: ChapterService) {}

  _getChapters = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.chapterService.getChapters(req.params.bookId as string);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  _getChapterById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.chapterService.getChapterById(req.query.chapterId as string);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  _addChapter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.chapterService.addChapter(req.body);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
      
    }
  };
}
