import mongoose from "mongoose";
import Book from "../../models/Book.js";
import Chapter from "../../models/Chapter.js";
import {
  deleteFileFromS3,
  readPdfFromS3,
  saveFile,
} from "../../services/AwsServices.js";
import {
  deleteChapterById,
  deleteFileFromGG,
  getPageNumber,
  getPdfOutline,
  handleTextToSpeech,
  splitPDF,
} from "./BookHelper.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const imageFile = req.files["image"][0];
    const pdfFile = req.files["pdf"][0];
    const pdfLink = await saveFile(pdfFile);
    const imageLink = await saveFile(imageFile);
    const pageNumber = await getPageNumber(pdfLink);
    const newBook = new Book({
      title: title,
      author: author,
      pdfLink: pdfLink,
      genre: new mongoose.Types.ObjectId(genre),
      avgRating: 0,
      image: imageLink,
      pageNumber: pageNumber,
    });
    await newBook.save();
    const outline = await getPdfOutline(pdfLink);

    let newChapter;
    if (outline.length > 1) {
      for (let i = 0; i < outline.length; i++) {
        const o = await splitPDF(
          pdfFile.buffer,
          outline[i].title,
          outline[i].startPage,
          outline[i].endPageNumber,
          newBook._id
        );

        newChapter = new Chapter({
          book: newBook._id,
          title: outline[i].title,
          startPage: outline[i].startPage ? outline[i].startPage : 0,
          pdfLink: o.pdfSublink,
          audioLink: o.audioLink,
        });
        await newChapter.save();
      }
    } else {
      return res.status(201).json({ message: "add_chapter", data: newBook });
    }
    return res.status(201).json({ message: "Success", data: newBook });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export const addChapter = async (req, res) => {
  try {
    const { bookId, title, startPage, endPage, bookLink } = req.body;
    console.log(`start ${startPage} end ${endPage}`);

    const tempArray = bookLink.split("/");
    const keyName = tempArray[tempArray.length - 1];
    const pdfFile = await readPdfFromS3(keyName);

    const linkObj = await splitPDF(pdfFile, title, startPage, endPage, bookId);
    const newChapter = new Chapter({
      book: bookId,
      title: title,
      startPage: startPage,
      pdfLink: linkObj.pdfSublink,
      audioLink: linkObj.audioLink,
    });
    await newChapter.save();
    return res.status(201).json({ message: "Success", data: newChapter });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const data = await Book.find().skip(skip).limit(limit);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getChapters = async (req, res) => {
  try {
    const bookId = req.params.id;
    const data = await Chapter.find({ book: bookId });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await deleteChapterById(id);
    if (!result) {
      return res.status(404).send("Chapter not found");
    }

    res.status(200).send("Chapter  deleted successfully");
  } catch (error) {
    console.error("Error deleting chapter :", error);
    res.status(500).send("Server Error");
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Book.findByIdAndDelete(id);
    const tempPdfArr = result.pdfLink.split("/");
    const pdfName = tempPdfArr[tempPdfArr.length - 1];
    const tempImgArr = result.image.split("/");
    const imgName = tempImgArr[tempImgArr.length - 1];
    await deleteFileFromS3(pdfName);
    await deleteFileFromS3(imgName);

    const chapters = await Chapter.find({ book: id });
    chapters.forEach(async (c) => {
      await deleteChapterById(c._id);
    });
    if (!result) {
      return res.status(404).send("Book not found");
    }

    res.status(200).send("Book deleted successfully");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Server Error");
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id, title, author, genre } = req.body;
    const imageLink = await saveFile(req.file);
    const paramUpdate = {
      $set: {
        title: title,
        author: author,
        genre: new mongoose.Types.ObjectId(genre),
        image: imageLink,
      },
    };
    const result = await Book.updateOne({ _id: id }, paramUpdate);
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

//get book new
export const getNewestBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(5);
    return res.status(200).json({
      status: true,
      message: "Success",
      data: books,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
//get book by genre
export const getBooksByGenre = async (req, res) => {
  try {
    const genreId = req.query.genreId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const books = await Book.find({ genre: genreId }).skip(skip).limit(limit);
    return res.status(200).json({
      status: true,
      message: "Success",
      data: books,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
export const getBooksByMajors = async (req, res) => {
  try {
    const majorsId = req.query.majorsId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const books = await Book.find({
      majors: majorsId,
    })
      .sort({ rating: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      status: true,
      message: "Success",
      data: books,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
//get book by id
export const getBookById = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        status: false,
        message: "Book not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Success",
      data: book,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
