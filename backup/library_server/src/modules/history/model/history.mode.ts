import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Books" },
    page: { type: Number },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
  },
  { timestamps: true }
);

const Histories = mongoose.model("Histories", historySchema);
export default Histories;
