import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pdfLink: { type: String, required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre" },
  avgRating: { type: Number, required: true },
});

const Book = mongoose.model("Book", bookSchema);
export default Book
