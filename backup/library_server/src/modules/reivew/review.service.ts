import { Service } from "typedi";
import Reviews from "./model/review.model";
import mongoose from "mongoose";
import { ReviewCreateReqDTO } from "./dto/review.dto";
import axios from "axios";
import { ReviewStatus } from "./types/review.type";

@Service()
export class ReviewService {
  async createReview(params: ReviewCreateReqDTO) {
    const { bookId, userId, content, rating } = params;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const review = await Reviews.findOneAndUpdate(
        {
          book: new mongoose.Types.ObjectId(bookId),
          user: new mongoose.Types.ObjectId(userId),
        },
        { content: content, rating: rating },
        { new: true, upsert: true }
      );

      const response = await axios.post(
        `http://localhost:5002/api/v1/recommend/create_model_rating`,
        { userId: userId }
      );
      return review;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async getReviewByBookId(book: string) {
    console.log(book);
    const review = await Reviews.find({
      book: new mongoose.Types.ObjectId(book),
    }).populate("user", "_id name image");
    return review;
  }

  async getReviewNewestByBookId(book: string) {
    return await Reviews.find({ book: new mongoose.Types.ObjectId(book) })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "_id name image");
  }

  async getAvgRating(bookId: string) {
    const result = await Reviews.aggregate([
      { $match: { book: new mongoose.Types.ObjectId(bookId) } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    return result.length > 0 ? result[0].avgRating : 0;
  }

}
