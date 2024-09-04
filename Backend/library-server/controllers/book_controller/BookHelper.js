import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import { PDFDocument } from "pdf-lib";
import pdf from "pdf-parse";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { saveFileWithKey } from "../../services/AwsServices.js";

const client = new textToSpeech.TextToSpeechLongAudioSynthesizeClient({
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
      // if (outline[i].items && outline[i].items.length > 0) {
      //   for (let j = 0; j < outline[i].items.length; j++) {
      //     const subTitle = outline[i].items[j].title;
      //     let subPageNumber = null;
      //     let endSubPage = null;
      //     if (outline[i].items[j].dest) {
      //       const subPageIndex = await pdfDocument.getPageIndex(
      //         outline[i].items[j].dest[0]
      //       );
      //       subPageNumber = subPageIndex + 1;
      //       endSubPage = outline[i].items[j + 1]
      //         ? (await pdfDocument.getPageIndex(outline[i].items[j].dest[0])) -
      //           1
      //         : pdfDocument.numPages;
      //     }

      //     list.push({
      //       title: subTitle,
      //       startPage: subPageNumber,
      //       endPage: endSubPage,
      //     });
      //     //   console.log(`  SubTitle: ${subTitle}, Page: ${subPageNumber}`);
      //   }
      // }
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

function splitTextIntoChunks(text, chunkSize) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = start + chunkSize;
    if (end > text.length) end = text.length;
    chunks.push(text.slice(start, end));
    start = end;
  }
  return chunks;
}
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
// function mergeAudioFiles(files, outputFilename) {
//   const mergedStream = ffmpeg();

//   files.forEach((file) => {
//     mergedStream.input(file);
//   });

//   mergedStream
//     .on("error", function (err) {
//       console.log("Error:", err);
//     })
//     .on("end", function () {
//       console.log("Merged audio saved as", outputFilename);
//     })
//     .mergeToFile("./temp/" + outputFilename);
//   return outputFilename;
// }
// function cleanup(files) {
//   files.forEach((file) => {
//     fs.unlink(file, (err) => {
//       if (err) console.error(`Error deleting file ${file}:`, err);
//       else console.log(`Deleted file ${file}`);
//     });
//   });
// }
