import Chapter from "../models/Chapter.js";

export const getChapterByBookId = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        console.log(bookId);
        const chapters = await Chapter.find({ book: bookId });
        return res.status(200).json({
            status:200,
            message: "Success",
            data: chapters,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};