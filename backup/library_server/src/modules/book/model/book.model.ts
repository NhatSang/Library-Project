import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", bookSchema);
export default Books;
