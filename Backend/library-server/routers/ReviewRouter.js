import express from 'express';
import { getReviewByBookId, createReview,getReviewNewestByBookId } from '../controllers/ReviewController.js';


const reviewRouter = express.Router();

reviewRouter.get('/get-review-by-book-id', getReviewByBookId);
reviewRouter.post('/create-review', createReview);
reviewRouter.get('/get-review-newest-by-book-id', getReviewNewestByBookId);

export default reviewRouter;
