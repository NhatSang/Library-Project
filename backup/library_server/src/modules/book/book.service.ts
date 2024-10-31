import { Service } from "typedi";
import Books from "./model/book.model";
import mongoose from "mongoose";
import { Errors } from "../../helper/error";
import { BookStatus } from "./types/book.type";

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
}
