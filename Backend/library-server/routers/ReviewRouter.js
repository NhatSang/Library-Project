import express from 'express';
import { getReviewByBookId, createReview,getReviewNewestByBookId } from '../controllers/ReviewController.js';
import { authenticateJWT } from '../middlewares/Auth.js';

const reviewRouter = express.Router();

reviewRouter.get('/get-review-by-book-id/:bookId', getReviewByBookId);
reviewRouter.post('/create-review', createReview);
reviewRouter.get('/get-review-newest-by-book-id/:bookId', getReviewNewestByBookId);

export default reviewRouter;
