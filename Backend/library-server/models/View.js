import mongoose from "mongoose";

const viewSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    viewDate: { type: Date, default: Date.now },
    count: { type: Number, default: 0 },

}, { timestamps: true });

const View = mongoose.model("View", viewSchema);
export default View;