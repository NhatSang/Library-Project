import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { handleErrorsMiddleware } from "../../helper/error";

export class ChapterMiddleware {
  validateChapter<T extends object>(dtoClass: new () => T) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const chapterDTO = plainToClass(dtoClass, req.body);
        const errors = await validate(chapterDTO);
        if (errors.length > 0) return handleErrorsMiddleware(errors, res);
        req.body = chapterDTO;
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}