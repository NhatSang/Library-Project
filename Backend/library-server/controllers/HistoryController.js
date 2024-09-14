import History from '../models/History.js';

export const createHistory = async (req, res) => {
    const {book,chapter,page} = req.body;
    const _user = req.user;
    try {
        const history = await History.findOne({ user:_user.userId, book });
        if (history) {
            history.chapter = chapter;
            history.page = page;
            history.updatedAt = new Date();
            await history.save();
            return res.status(200).json({
                status: true,
                message: 'Update Success',
                data: history,
            });
        }else {
        const newHistory = await History.create({
            user:_user.userId,
            book,
            chapter,
            page,
        });
        return res.status(201).json({
            status: true,
            message: 'Create Success',
            data: newHistory,
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

export const getHistoryByUserId = async (req, res) => {
    const _user = req.user;
    try {
        const history = await History.find({ user:_user.userId })
        .populate('book')
        .populate('chapter');
        return res.status(200).json({
            status: true,
            message: 'Success',
            data: history,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 
            status: false,
            message: err.message
         });
    }
}

export const getHistoryByBookIdAndUser = async (req, res) => {
    const _user = req.user;
    const {bookId} = req.query;
    try {
        const history = await History.findOne({ user:_user.userId, book:bookId })
    if (!history) {
        return res.status(200).json({
            status: true,
            message: 'Success',
            data: {
                page:1,
            },
        });
    }else {
        return res.status(200).json({
            status: true,
            message: 'Success',
            data: history,
        });
    }
}
    catch (err) {
        console.log(err);
        return res.status(500).json({ 
            status: false,
            message: err.message
         });
    }
}
