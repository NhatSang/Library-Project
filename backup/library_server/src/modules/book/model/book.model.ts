import mongoose from "mongoose";
import { BookStatus } from "../types/book.type";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    pdfLink: { type: String, required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre" },
    image: { type: String, required: true },
    pageNumber: { type: Number, required: true },
    majors: { type: mongoose.Schema.Types.ObjectId, ref: "Majors" },
    contents: [
      {
        page: { type: Number, required: true },
        content: { type: String },
      },
    ],
    summary: { type: String },
    status: { type: Number, enum: [BookStatus.Deleted, BookStatus.Published] },
    publisher: { type: String },
    yob: { type: String },
  },
  { timestamps: true }
);

const Books = mongoose.model("Book2", bookSchema);
export default Books;
