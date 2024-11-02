import { Service } from "typedi";
import Reviews from "./model/review.model";
import mongoose from "mongoose";

@Service()
export class ReviewService {

    async checkReviewExist(book: string, user: string) {
        const review = await Reviews.findOne({ book: book, user: user });
        return review;
    }

    async createReview(params: any) {
        const { book, userId, content, rating } = params;
        console.log(params);
        const reviewExist = await this.checkReviewExist(book, userId);
        console.log(reviewExist);
        if(reviewExist) {
            reviewExist.content = content;
            reviewExist.rating = rating;
            await reviewExist.save();
            return reviewExist;
        }
        const review = await Reviews.create({
            book: new mongoose.Types.ObjectId(book),
            user: new mongoose.Types.ObjectId(userId),
            content,
            rating,
        });
        return review;
    }

    async getReviewByBookId(book: string) {
        console.log(book);
        const review = await Reviews.find({ book: new mongoose.Types.ObjectId(book) })
        .populate("user","_id name image");
        return review;
    }

    async getReviewNewestByBookId(book: string) {
        return await Reviews.find({ book: new mongoose.Types.ObjectId(book) })
        .sort({createdAt: -1})
        .limit(5)
        .populate("user","_id name image");
    }
}