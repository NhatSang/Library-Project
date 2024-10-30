import Book2 from "../../models/Book2.js";
import mongoose from "mongoose";

export const getAllBooks2 = async (req, res) => {
    try {
        const books = await Book2.find()
        .populate("genre", "name")
        .populate("majors", "name");
        res.status(200).json({
            status: true,
            message: "Success",
            data: books,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getrBookContentByPage = async (req, res) => {
    try {
        const bookId = req.query.bookId;
        const page = Number(req.query.page); // Convert to number
        const book = await Book2.findById(bookId);
        
        if (!book) {
            return res.status(404).json({
                status: false,
                message: "Book not found",
            });
        }
        
        const content = book.contents.find((content) => content.page === page);
        
        if (!content) {
            return res.status(404).json({
                status: false,
                message: "Content for this page not found",
            });
        }
        
        return res.status(200).json({
            status: true,
            message: "Success",
            data: {
                content,
                pages: book.contents.length,
            },
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: error.message }); // Return 500 for unexpected errors
    }
}