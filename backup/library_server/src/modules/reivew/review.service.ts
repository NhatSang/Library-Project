import { Service } from "typedi";
import Reviews from "./model/review.model";
import mongoose from "mongoose";

@Service()
export class ReviewService {

    async checkReviewExist(book: string, user: string) {
        const review = await Reviews.findOne({ book: new mongoose.Types.ObjectId(book), user: new mongoose.Types.ObjectId(user) });
        return review;
    }

    async createReview(params: any) {
        const { book, user, content, rating } = params;
        const reviewExist = await this.checkReviewExist(book, user);
        if(reviewExist) {
            reviewExist.content = content;
            reviewExist.rating = rating;
            await reviewExist.save();
            return reviewExist;
        }
        const review = await Reviews.create({
            book: new mongoose.Types.ObjectId(book),
            user: new mongoose.Types.ObjectId(user),
            content,
            rating,
        });
        return review;
    }

    async getReviewByBookId(book: string) {
        console.log(book);
        return await Reviews.find({ book: new mongoose.Types.ObjectId(book) })
        .populate("user","_id name image");
    }

    async getReviewNewestByBookId(book: string) {
        return await Reviews.find({ book: new mongoose.Types.ObjectId(book) })
        .sort({createdAt: -1})
        .limit(5)
        .populate("user","_id name image");
    }
}