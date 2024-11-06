import { BookAvgRatingDTO, BookTotalViewDTO } from "./../book/dto/book.dto";
import { Inject, Service } from "typedi";
import Books from "../book/model/book.model";
import { Errors } from "../../helper/error";
import mongoose from "mongoose";
import User from "../user/model/user.model";
import Histories from "../history/model/history.mode";
import { ViewService } from "../view/view.service";
import { ReviewService } from "../reivew/review.service";

@Service()
export class StatisticsService {
  constructor(
    @Inject() private viewService: ViewService,
    @Inject() private reviewService: ReviewService
  ) {}

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
        $match: matchStage, // Điều kiện lọc genre hoặc các điều kiện khác
      },
      {
        $lookup: {
          from: "reviews", // Tên collection reviews
          let: { bookId: "$_id" }, // Truyền giá trị _id của sách vào biến bookId
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$book", "$$bookId"] }, // So sánh bookId với _id của sách
                    { $gte: [{ $toDate: "$createdAt" }, new Date(startDate)] }, // Lọc theo startDate
                    { $lte: [{ $toDate: "$createdAt" }, new Date(endDate)] }, // Lọc theo endDate
                  ],
                },
              },
            },
            {
              $group: {
                _id: null, // Gộp các bản ghi review của sách đó lại
                avgRating: { $avg: "$rating" }, // Tính trung bình rating
                reviewCount: { $sum: 1 }, // Đếm số lượng review
              },
            },
            {
              $match: {
                reviewCount: { $gte: 1 }, // Chỉ lấy các sách có từ 2 review trở lên
              },
            },
          ],
          as: "ratings",
        },
      },
      {
        $unwind: {
          path: "$ratings",
          preserveNullAndEmptyArrays: true, // Giữ lại các sách không có bản ghi review (cho phép giá trị null)
        },
      },
      {
        $addFields: {
          avgRating: { $ifNull: ["$ratings.avgRating", 0] }, // Gán avgRating là 0 nếu không có bản ghi reviews nào
        },
      },
      {
        $sort: { avgRating: -1 }, // Sắp xếp theo rating trung bình giảm dần
      },
      {
        $limit: 10, // Giới hạn kết quả trả về là top 10
      },
      {
        $project: {
          _id: 1, // Chỉ trả về các trường cần thiết
          title: 1,
          avgRating: 1,
        },
      },
    ]);

    const resResult = BookAvgRatingDTO.transformBook(result);
    return resResult;
  }

  async getNumOfNewUser(params: any) {
    const { startDate, endDate } = params;
    if (!startDate || !endDate) {
      throw Errors.badRequest;
    }
    const result = await User.aggregate([
      {
        // Chọn các tài liệu bạn muốn, có thể thêm điều kiện nếu cần
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        // Nhóm theo ngày
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }, // Format theo ngày
          },
          userCount: { $sum: 1 }, // Đếm số lượng user mỗi ngày
        },
      },
      {
        // Chuyển đổi kết quả về định dạng mong muốn
        $project: {
          title: "$_id", // Đặt trường title là ngày
          userCount: 1, // Giữ lại trường userCount
          _id: 0, // Không trả về _id
        },
      },
      {
        // Sắp xếp kết quả theo ngày (tăng dần)
        $sort: { title: 1 },
      },
    ]);
    return result;
  }

  statisticsViewsReviews = async (fromDateStr: string, toDateStr: string) => {
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);
    const listViews = await this.viewService.countViewByDate(fromDate, toDate);
    const listReviews = await this.reviewService.countReviewByDate(
      fromDate,
      toDate
    );
    const totalViews = await this.viewService.totalViewsByDate(
      fromDate,
      toDate
    );
    const totalReviews = await this.reviewService.totalReviewByDate(
      fromDate,
      toDate
    );

    return { listViews, listReviews, totalViews, totalReviews };
  };
}
