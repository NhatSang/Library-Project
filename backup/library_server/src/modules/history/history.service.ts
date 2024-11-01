import { Service } from "typedi";
import { HistoryCreateDTO } from "./dto/history.dto";
import Histories from "./model/history.mode";
import mongoose from "mongoose";
import { HistoryStatus } from "./types/history.type";

@Service()
export class HistoryService {
  async createHistory(params: HistoryCreateDTO) {
    const { book, chapter, page, userId } = params;
    console.log(params);
    const history = await Histories.findOneAndUpdate(
      {
        user: new mongoose.Types.ObjectId(userId),
        book: new mongoose.Types.ObjectId(book),
      },
      { chapter: new mongoose.Types.ObjectId(chapter), page: page },
      { new: true, upsert: true }
    );
    return history;
  }
  async getOneHistory(userId: string, bookId: string) {
    const history = await Histories.findOne({
      user: new mongoose.Types.ObjectId(userId),
      book: new mongoose.Types.ObjectId(bookId),
      status: HistoryStatus.Saved,
    });
    if (!history) return { page: 1 };
    return history;
  }
  async getHistoriesByUserId(userId: string) {
    return await Histories.find({
      user: new mongoose.Types.ObjectId(userId),
      status: HistoryStatus.Saved,
    })
      .populate("book")
      .populate("chapter");
  }
}
