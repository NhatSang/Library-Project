import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    title: { type: String, required: true },
    startPage: { type: Number, required: true },
    pdfLink: { type: String, required: true },
  },
  { timestamps: true }
);

const Chapter = mongoose.model("Chapters",chapterSchema)
export default Chapter