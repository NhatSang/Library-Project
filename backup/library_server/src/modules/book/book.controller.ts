import { Inject, Service } from "typedi";
import { BookService } from "./book.service";
import { NextFunction, Request, Response } from "express";
import { ResponseCustom } from "../../helper/response";
import { saveFile } from "../../../aws/aws.helper";

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
  };

  getBookNewest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.bookservice.getBookNewest();
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  getTopRatedBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.bookservice.getTopRatedBooks();
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  getTopViewedBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.bookservice.getTopViewedBooks();
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  getRecommendBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.bookservice.getRecommendBooks(req.body.userId);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  addbook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const imageFile = req.files["image"][0];
      const pdfFile = req.files["pdf"][0];
      console.log(imageFile);
      console.log(pdfFile);
      const pdfLink = await saveFile(pdfFile);
      const imageLink = await saveFile(imageFile);
      req.body.image = imageLink;
      req.body.pdfLink = pdfLink;
      const result = await this.bookservice.addBook(req.body);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  getSummaryByBookId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.bookservice.getSummaryByBookId(
        req.query.bookId as string
      );
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  createSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.bookservice.createSummary(req.body);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.query.id;
      const result = await this.bookservice.getBookById(bookId as string);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  }
}
