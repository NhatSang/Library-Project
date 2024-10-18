import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Books" },
    content: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

const Reviews = mongoose.model("Reivews");
export default Reviews;
