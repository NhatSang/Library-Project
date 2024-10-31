import { Router } from "express";
import Container from "typedi";
import { ReviewController } from "./review.controller";


const reviewRouter = Router();
const reviewController = Container.get(ReviewController);

reviewRouter.post("/review", reviewController._createReview);
//query: bookId
reviewRouter.get("/review", reviewController._getReviewByBookId);
//query: bookId
reviewRouter.get("/review-newest", reviewController._getReviewNewestByBookId);


