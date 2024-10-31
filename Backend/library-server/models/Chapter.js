import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book2" },
  title: { type: String, required: true },
  startPage: { type: Number, required: true },
  endPage: { type: Number,  },
  pdfLink: { type: String, required: true },
});

const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;
