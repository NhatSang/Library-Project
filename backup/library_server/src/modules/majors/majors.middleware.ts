import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { handleErrorsMiddleware } from "../../helper/error";

export class MajorsMiddleware {
  validateMajors<T extends object>(dtoClass: new () => T) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const majorsDTO = plainToClass(dtoClass, req.body);
        const errors = await validate(majorsDTO);
        if (errors.length > 0) return handleErrorsMiddleware(errors, res);
        req.body = majorsDTO;
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}