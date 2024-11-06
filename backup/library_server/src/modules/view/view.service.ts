import mongoose from "mongoose";
import { Service } from "typedi";
import View from "./model/view.model";

@Service()
export class ViewService {
  async updateView(bookId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    await View.updateOne(
      { book: new mongoose.Types.ObjectId(bookId), viewDate: today },
      { $inc: { count: 1 } },
      { upsert: true }
    );
    return true;
  }

  async getTotalView(bookId: string) {
    const result = await View.aggregate([
      { $match: { book: new mongoose.Types.ObjectId(bookId) } },
      { $group: { _id: null, totalViews: { $sum: "$count" } } },
    ]);
    return result.length > 0 ? result[0].totalViews : 0;
  }
}
