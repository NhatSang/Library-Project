import Review from '../models/Review.js';

export const getReviewByBookId = async (req, res) => {
    try {
        const bookId = req.query.bookId;
        const reviews = await Review.find({ book: bookId })
        .populate('user', '_id name image');
        return res.status(200).json({
            status: true,
            message: 'Success',
            data: reviews,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 
            status: false,
            message: err.message
         });
    }
}

export const createReview = async (req, res) => {
    try {
        const _user = req.user;
        const { content, rating, book } = req.body;
        const reviewExist = await Review.findOne({ user:_user.userId, book });
        if (reviewExist) {
            reviewExist.content = content;
            reviewExist.rating = rating;
            reviewExist.updatedAt = new Date();
            await reviewExist.save();
            return res.status(200).json({
                status: true,
                message: 'Update Success',
                data: reviewExist,
            });
        }else {
        const review = await Review.create({
            content,
            rating,
            user:_user.userId,
            book,
        });
        return res.status(201).json({
            status: true,
            message: 'Create Success',
            data: review,
        });
    }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 
            status: false,
            message: err.message
         });
    }
}

export const getReviewNewestByBookId = async (req, res) => {
    try {
        const bookId = req.query.bookId;
        const reviews = await Review.find({ book: bookId }).sort({ createdAt: -1 })
        .populate('user', '_id name image')
        .limit(5);
        return res.status(200).json({
            status: true,
            message: 'Success',
            data: reviews,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 
            status: false,
            message: err.message
         });
    }
}