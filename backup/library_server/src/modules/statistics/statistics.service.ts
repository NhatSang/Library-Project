import { BookAvgRatingDTO, BookTotalViewDTO } from "./../book/dto/book.dto";
import { Service } from "typedi";
import Books from "../book/model/book.model";
import { Errors } from "../../helper/error";
import mongoose from "mongoose";

@Service()
export class StatisticsService {
  async getTop10HighestViewsBooks(params: any) {
    const { startDate, endDate, genreId } = params;
    if (!startDate || !endDate) {
      throw Errors.badRequest;
    }
    const matchStage: any = {};
    if (genreId) {
      matchStage.genre = new mongoose.Types.ObjectId(genreId); // Chỉ lọc theo genre nếu genreId tồn tại
    }

    const result = await Books.aggregate([
      {
        $match: matchStage,
      },
      {
        $lookup: {
          from: "views",
          let: { bookId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$book", "$$bookId"] },
                    {
                      $gte: ["$viewDate", new Date(startDate)],
                    },
                    {
                      $lte: ["$viewDate", new Date(endDate)],
                    },
                  ],
                },
              },
            },
            {
              $group: {
                _id: null,
                totalViews: { $sum: "$count" },
              },
            },
          ],
          as: "views",
        },
      },
      {
        $unwind: {
          path: "$views",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          totalViews: { $ifNull: ["$views.totalViews", 0] },
        },
      },
      {
        $sort: { totalViews: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          totalViews: 1,
        },
      },
    ]);
    const resResult = BookTotalViewDTO.transformBook(result);
    return resResult;
  }

  async getTop10HighestRatingsBooks(params: any) {
    const { startDate, endDate } = params;
    if (!startDate || !endDate) {
      throw Errors.badRequest;
    }
    const result = await Books.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "book",
          as: "reviews",
        },
      },
      {
        $unwind: "$reviews",
      },
      {
        $match: {
          "reviews.createAt": {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          avgRating: { $avg: "$reviews.rating" },
        },
      },
      {
        $sort: { avgRating: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    console.log(result);

    const resResult = BookAvgRatingDTO.transformBook(result);
    return resResult;
  }
}
