import textToSpeech from "@google-cloud/text-to-speech";
import { SpeechClient } from "@google-cloud/speech";
import fs from "fs";
import { PDFDocument } from "pdf-lib";
import pdf from "pdf-parse";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import {
  deleteFileFromS3,
  saveFileWithKey,
} from "../../services/AwsServices.js";
import { Storage } from "@google-cloud/storage";
import Chapter from "../../models/Chapter.js";

const client = new textToSpeech.TextToSpeechLongAudioSynthesizeClient({
  keyFilename: "./json-key/library-project-433704-6c89745a241a.json",
});

const storage = new Storage({
  keyFilename: "./json-key/library-project-433704-6c89745a241a.json",
});

export const getPdfOutline = async (filePath) => {
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
          : pdfDocument.numPages - 1;
        // console.log(pageNumber);
      }

      console.log(
        `Title: ${title}, startPage: ${startPageNumber},end:${endPageNumber}`
      );
      list.push({ title: title, startPage: startPageNumber, endPageNumber });
    }
    return list;
  } catch (err) {
    console.log(err);

    throw new Error("Fail to get outline");
  }
};

export const splitPDF = async (
  pdfBuffer,
  title,
  startPage,
  endPage,
  bookId
) => {
  try {
    // Tạo tài liệu PDF mới
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    const newPdfDoc = await PDFDocument.create();

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
    const audioLink = await handleTextToSpeech(pdfBytes, bookId);

    return { pdfSublink, audioLink };
  } catch (err) {
    console.error("Error splitting PDF:", err);
    throw new Error("Fail to split pdf");
  }
};

export const handleTextToSpeech = async (PdfFile, title) => {
  try {
    const pdfData = await pdf(PdfFile);
    const text = pdfData.text;
    const outputFilename = `${Date.now().toString()}_${title}.wav`;
    const audioLink = await convertTextToSpeech(text, outputFilename);
    return audioLink;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

async function convertTextToSpeech(text, outputFilename) {
  const request = {
    parent: "projects/library-project-433704/locations/asia",
    input: { text: text },
    voice: {
      languageCode: "vi-VN",
      name: "vi-VN-Standard-A",
      ssmlGender: "NEUTRAL",
    },
    audioConfig: { audioEncoding: "LINEAR16" },
    outputGcsUri: `gs://audio-book-2024/${outputFilename}`,
  };
  // Perform the Text-to-Speech request
  await client
    .synthesizeLongAudio(request)
    .then(() => {
      console.log("text to speech success");
    })
    .catch((err) => {
      console.log("text to speech fail: ", err);
    });

  // Generate and return the public URL
  const publicUrl = `https://storage.googleapis.com/audio-book-2024/${outputFilename}`;
  return publicUrl;
}

export async function deleteFileFromGG(filename) {
  // Tạo một tham chiếu đến bucket
  const bucket = storage.bucket("audio-book-2024");

  // Tạo một tham chiếu đến file trong bucket
  const file = bucket.file(filename);

  try {
    // Xóa file
    await file.delete();
    console.log(`File ${filename} đã được xóa.`);
  } catch (err) {
    console.error("Lỗi khi xóa file:", err);
  }
}

export const deleteChapterById = async (id) => {
  const result = await Chapter.findByIdAndDelete(id);
  const tempPdfArr = result.pdfLink.split("/");
  const pdfName = tempPdfArr[tempPdfArr.length - 1];
  await deleteFileFromS3(pdfName);
  const tempAudioArr = result.audioLink.split("/");
  const audioName = tempAudioArr[tempAudioArr.length - 1];
  await deleteFileFromGG(audioName);
  return result;
};
