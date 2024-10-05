import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pdfLink: { type: String, default:'https://pdf8888.s3.ap-southeast-1.amazonaws.com/1725541443813_laptrinhcanban.pdf' },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre" },
  avgRating: { type: Number, default: 0 },
  image: { type: String,  default:'https://pdf8888.s3.ap-southeast-1.amazonaws.com/1725541446499_laptrinhcanban.jpg' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  pageNumber: { type: Number, default:100 },
  majors: { type: mongoose.Schema.Types.ObjectId, ref: "Majors" },
  summary: { type: String, default: "" },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
