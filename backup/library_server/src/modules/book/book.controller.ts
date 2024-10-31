import { Inject, Service } from "typedi";
import { BookService } from "./book.service";
import { NextFunction, Request, Response } from "express";
import { ResponseCustom } from "../../helper/response";

@Service()
export class BookController {
  constructor(@Inject() private bookservice: BookService) {}

  getrBookContentByPage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookId = req.query.bookId;
      const page = Number(req.query.page);
      const result = await this.bookservice.getBookContentByPage({
        bookId,
        page,
      });
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };
}
