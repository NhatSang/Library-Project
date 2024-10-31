import mongoose from "mongoose";
import { ReviewStatus } from "../types/review.type";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Books" },
    content: { type: String },
    rating: { type: Number },
    status: {
      type: Number,
      enum: [ReviewStatus.Deleted, ReviewStatus.Posted],
      default: ReviewStatus.Posted,
    },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reivews");
export default Reviews;
