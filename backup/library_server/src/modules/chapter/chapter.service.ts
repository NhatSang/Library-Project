import { Inject, Service } from "typedi";
import Chapter from "./model/chapter.model";
import mongoose from "mongoose";
import { BookService } from "../book/book.service";
import { Errors } from "../../helper/error";

@Service()
export class ChapterService {
  constructor(@Inject() private bookService: BookService) {}
  async getChapters(bookId: string) {
    await this.bookService.checkPublishedBook(bookId);
    return await Chapter.find({ book: new mongoose.Types.ObjectId(bookId) });
  }
  async getChapterById(chapterId: string) {
    return await Chapter.findOne({
      _id: new mongoose.Types.ObjectId(chapterId),
    });
  }

  async checkExistedChapter(chapterId: string) {
    const chapter = await this.getChapterById(chapterId);
    if (!chapter) throw Errors.ChapterNotExits;
    const bookId = chapter.book.toString();
    console.log(bookId);
    await this.bookService.checkPublishedBook(bookId);
    return chapter;
  }

  async addChapter(params: any) {
    const {
      bookId,
      title,
      startPage,
      endPage,
      pdfLink
    } = params;
    await this.bookService.checkPublishedBook(bookId);
    const chapter = new Chapter({
      book: new mongoose.Types.ObjectId(bookId),
      title,
      startPage,
      endPage,
      pdfLink
    });
    await chapter.save();
    return chapter;
  }
}
