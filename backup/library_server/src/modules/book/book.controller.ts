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
  getBookByMajorsUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.body.userId;
      const result = await this.bookservice.getBookByMajorsUserId(userId);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  }

  getBookNewest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.bookservice.getBookNewest();
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  getTopRatedBooks = async ( req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.bookservice.getTopRatedBooks();
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  }

  getTopViewedBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.bookservice.getTopViewedBooks();
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  }
}
