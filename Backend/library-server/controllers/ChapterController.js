import Chapter from "../models/Chapter.js";

export const getChapterByBookId = async (req, res) => {
    try {
        const bookId = req.query.bookId;
        const chapters = await Chapter.find({ book: bookId });
        return res.status(200).json({
            status:true,
            message: "Success",
            data: chapters,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 
            status: false,
            message: err.message
         });
    }
};
