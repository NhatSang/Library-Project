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
  
  async getBookNewest() {
    return Books.find({ status: BookStatus.Published }).sort({ createdAt: -1 }).limit(10);
  }

  async getTopRatedBooks() {
    const topRatedBooks = await Books.aggregate([
      {
        $match: { status: BookStatus.Published },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "book",
          as: "reviews",
        },
      },
      {
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true, 
        },
      },
      {
        $group: {
          _id: "$_id", 
          title: { $first: "$title" },
          author: { $first: "$author" },
          pdfLink: { $first: "$pdfLink" },
          image: { $first: "$image" },
          pageNumber: { $first: "$pageNumber" },
          summary: { $first: "$summary" },
          averageRating: { $avg: "$reviews.rating" },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $limit: 10,
      },
    ]);
  
    return topRatedBooks;
  }

  
async getTopViewedBooks() {
    const topViewedBooks = await Books.aggregate([
      {
        $lookup: {
          from: 'views', 
          localField: '_id',
          foreignField: 'book',
          as: 'views',
        },
      },
      {
        $unwind: {
          path: '$views',
          preserveNullAndEmptyArrays: true, 
        },
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          author: { $first: '$author' },
          pdfLink: { $first: '$pdfLink' },
          image: { $first: '$image' },
          pageNumber: { $first: '$pageNumber' },
          summary: { $first: '$summary' },
          totalViews: { $sum: { $ifNull: ['$views.count', 0] } }, 
        },
      },
      {
        $sort: { totalViews: -1 }, 
      },
      {
        $limit: 10,
      },
    ]);

    return topViewedBooks;
}
}
