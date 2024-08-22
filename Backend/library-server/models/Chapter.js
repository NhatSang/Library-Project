const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  title: { type: String, required: true },
  startPage: { type: Number, required: true },
  pdfLink: { type: String, required: true },
  audioLink: { type: String, required: true },
});

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
