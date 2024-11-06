import { Service } from "typedi";
import { HistoryCreateDTO } from "./dto/history.dto";
import Histories from "./model/history.mode";
import mongoose from "mongoose";
import { HistoryStatus } from "./types/history.type";
import axios from "axios";

@Service()
export class HistoryService {
  async createHistory(params: HistoryCreateDTO) {
    const { book, chapter, page, userId } = params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const history = await Histories.findOneAndUpdate(
        {
          user: new mongoose.Types.ObjectId(userId),
          book: new mongoose.Types.ObjectId(book),
        },
        {
          chapter: new mongoose.Types.ObjectId(chapter),
          page: page,
        },
        {
          new: true,
          upsert: true,
          session,
        }
      );
      const response = await axios.post(
        `http://localhost:5002/api/v1/recommend/create_model_rating`,
        { userId: userId }
      );
      await session.commitTransaction();
      session.endSession();

      return history;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }

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
    const histories = await Histories.find({
      user: new mongoose.Types.ObjectId(userId),
      status: HistoryStatus.Saved,
    }).populate({
      path: "book",
      populate: {
        path: "genre", // Populate thêm genre trong book
      },
    });

    return histories;
  }

  async deleteHistory(historyId: string) {
    await Histories.updateOne(
      { _id: new mongoose.Types.ObjectId(historyId) },
      { $set: { status: HistoryStatus.Deleted } }
    );
    return true;
  }
}
