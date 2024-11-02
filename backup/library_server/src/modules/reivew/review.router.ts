import { Router } from "express";
import Container from "typedi";
import { ReviewController } from "./review.controller";
import { Role } from "../user/types/user.type";
import { AuthMiddleware } from "../auth/auth.middleware";


const reviewRouter = Router();
const reviewController = Container.get(ReviewController);
const authMiddleware = Container.get(AuthMiddleware);

reviewRouter.post("/review", reviewController._createReview);
//query: bookId
reviewRouter.get("/review", reviewController._getReviewByBookId);
//query: bookId
reviewRouter.get("/review-newest", 
    authMiddleware.authenticateAccessToken([Role.Admin, Role.User])
    ,reviewController._getReviewNewestByBookId);

export default reviewRouter;
