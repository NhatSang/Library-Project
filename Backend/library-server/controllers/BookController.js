import Book from "../models/Book.js";
import Chapter from "../models/Chapter.js";
import { saveFile, saveFileWithKey } from "../services/AwsServices.js";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { PDFDocument } from "pdf-lib";
import mongoose from "mongoose";

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
    if (outline.length > 0) {
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
      const audioLink = "test";
      newChapter = new Chapter({
        book: newBook._id,
        title: "Chương 1",
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

const getPdfOutline = async (filePath) => {
  try {
    const loadingTask = pdfjsLib.getDocument(filePath);
    const pdfDocument = await loadingTask.promise;
    const outline = await pdfDocument.getOutline();
    const list = [];
    if (!outline) {
      console.log("Không tìm thấy mục lục trong tệp PDF này.");
      return list;
    }

    for (let i = 0; i < outline.length; i++) {
      const title = outline[i].title;
      let startPageNumber = null;
      let endPageNumber = null;
      // console.log(title);

      if (outline[i].dest) {
        const pageIndex = await pdfDocument.getPageIndex(outline[i].dest[0]);
        startPageNumber = pageIndex + 1;
        endPageNumber = outline[i + 1]
          ? (await pdfDocument.getPageIndex(outline[i + 1].dest[0])) - 1
          : pdfDocument.numPages;
        // console.log(pageNumber);
      }

      //   console.log(`Title: ${title}, Page: ${pageNumber}`);
      list.push({ title: title, startPage: startPageNumber, endPageNumber });
      if (outline[i].items && outline[i].items.length > 0) {
        for (let j = 0; j < outline[i].items.length; j++) {
          const subTitle = outline[i].items[j].title;
          let subPageNumber = null;
          let endSubPage = null;
          if (outline[i].items[j].dest) {
            const subPageIndex = await pdfDocument.getPageIndex(
              outline[i].items[j].dest[0]
            );
            subPageNumber = subPageIndex + 1;
            endSubPage = outline[i].items[j + 1]
              ? (await pdfDocument.getPageIndex(outline[i].items[j].dest[0])) -
                1
              : pdfDocument.numPages;
          }

          list.push({
            title: subTitle,
            startPage: subPageNumber,
            endPage: endSubPage,
          });
          //   console.log(`  SubTitle: ${subTitle}, Page: ${subPageNumber}`);
        }
      }
    }
    return list;
  } catch (err) {
    console.log(err);

    throw new Error("Fail to get outline");
  }
};

const splitPDF = async (pdfBuffer, title, startPage, endPage) => {
  try {
    // Tạo tài liệu PDF mới
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    const newPdfDoc = await PDFDocument.create();
    console.log(startPage, endPage);

    // Sao chép các trang từ startPage đến endPage
    for (let i = startPage - 1; i <= endPage; i++) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
      newPdfDoc.addPage(copiedPage);
    }

    // Lưu tài liệu mới vào buffer
    const pdfBytes = await newPdfDoc.save();

    // Định nghĩa tên file trên S3
    const key = `${Date.now().toString()}_${title}.pdf`;

    // Upload file lên S3
    const pdfSublink = await saveFileWithKey(pdfBytes, key);

    // Lưu audio (chưa thực hiện)
    const audioLink = "test";

    return { pdfSublink, audioLink };
  } catch (err) {
    console.error("Error splitting PDF:", err);
    throw new Error("Fail to split pdf");
  }
};
