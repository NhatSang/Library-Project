import mongoose from "mongoose";
import Book from "../../models/Book.js";
import Chapter from "../../models/Chapter.js";
import { saveFile } from "../../services/AwsServices.js";
import { getPdfOutline, handleTextToSpeech, splitPDF } from "./BookHelper.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const imageFile = req.files["image"][0];
    const pdfFile = req.files["pdf"][0];
    const pdfLink = await saveFile(pdfFile);
    const imageLink = await saveFile(imageFile);
    const newBook = new Book({
      title: title,
      author: author,
      pdfLink: pdfLink,
      genre: new mongoose.Types.ObjectId(genre),
      avgRating: 0,
      image: imageLink,
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
      // lưu cả file thành 1 chương
      // chuyển thành audio cho cả file
      const audioLink = await handleTextToSpeech(pdfFile, newBook._id);
      newChapter = new Chapter({
        book: newBook._id,
        title: title,
        startPage: 1,
        pdfLink: pdfLink,
        audioLink: audioLink,
      });
      await newChapter.save();
    }
    return res.status(201).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.body.id;
    const result = await Book.deleteOne({ _id: bookId });
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
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
      message: "Success",
      data: books,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
//get book by genre
export const getBooksByGenre = async (req, res) => {
  try {
    const genreId = req.params.genreId;
    const books = await Book.find({ genre: genreId });
    return res.status(200).json({
      message: "Success",
      data: books,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

//get book by id
export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.finrById(bookId);
    return res.status(200).json({
      message: "Success",
      data: book,
    });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

