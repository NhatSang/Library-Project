import mongoose from "mongoose";
import { BookStatus } from "../types/book.type";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    pdfLink: { type: String },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genres" },
    image: { type: String },
    pageNumber: { type: Number },
    majors: { type: mongoose.Schema.Types.ObjectId, ref: "Majors" },
    summary: { type: String },
    yop: { type: String },
    publisher: { type: String },
    status: {
      type: String,
      enum: [BookStatus.Deleted, BookStatus.Published],
      default: BookStatus.Published,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", bookSchema);
export default Books;
