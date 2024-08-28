import mongoose from "mongoose";
import Book from "../../models/Book.js";
import Chapter from "../../models/Chapter.js";
import { saveFile } from "../../services/AwsServices.js";
import { getPdfOutline, handleTextToSpeech, splitPDF } from "./BookHelper.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const pdfLink = await saveFile(req.file);
    const newBook = new Book({
      title: title,
      author: author,
      pdfLink: pdfLink,
      genre: new mongoose.Types.ObjectId(genre),
      avgRating: 0,
    });
    await newBook.save();
    const outline = await getPdfOutline(pdfLink);

    let newChapter;
    if (outline.length > 1) {
      for (let i = 0; i < outline.length; i++) {
        const o = await splitPDF(
          req.file.buffer,
          outline[i].title,
          outline[i].startPage,
          outline[i].endPageNumber
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
      const audioLink = await handleTextToSpeech(req.file, title);
      newChapter = new Chapter({
        book: newBook._id,
        title: title,
        startPage: 1,
        pdfLink: pdfLink,
        audioLink: audioLink,
      });
      await newChapter.save();
    }
    return res.status(204).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
