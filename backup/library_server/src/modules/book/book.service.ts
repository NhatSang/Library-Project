import { Service } from "typedi";
import Books from "./model/book.model";
import mongoose from "mongoose";
import { Errors } from "../../helper/error";
import { BookStatus } from "./types/book.type";
import User from "../user/model/user.model";

@Service()
export class BookService {
  async getPublishedBook(bookId: string) {
    return await Books.findOne({
      _id: new mongoose.Types.ObjectId(bookId),
      status: BookStatus.Published,
    });
  }
  async checkPublishedBook(bookId: string) {
    const book = await this.getPublishedBook(bookId);
    if (!book) throw Errors.bookNotExits;
    return book;
  }

  async getBookContentByPage(params: any) {
    const { bookId, page } = params;
    const book = await this.checkPublishedBook(bookId);
    const content = book.contents.find((content) => content.page === page);
    if (!content) throw Errors.notFound;
    return { content, pages: book.contents.length };
  }

  async getAllBook() {
    return Books.find({ status: BookStatus.Published });
  }

  async getBookByMajorsUserId(userId:string) {
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) });
    console.log(user.majors);
    const books = await Books.find({ 
      majors: user.majors,
       status: BookStatus.Published
       }).limit(10);
    return books;
  }
  
  async createBook(params: any) {
    
  }
}
