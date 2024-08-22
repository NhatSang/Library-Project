const Book = require("../models/Book");
const Chapter = require("../models/Chapter");
const { saveFile, saveFileWithKey } = require("../services/AwsServices");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.mjs");
const { PDFDocument } = require("pdf-lib");
const addBook = async (req, res) => {
  try {
    const { title, author, genre, avgRating } = req.body;
    const pdfLink = await saveFile(req.file);
    const newBook = new Book({
      title: title,
      author: author,
      pdfLink: pdfLink,
      genre: genre,
      avgRating: avgRating,
    });
    await newBook.save();
    const outline = await getPdfOutline(pdfLink);
    for (let i = 0; i < outline.length; i++) {
      const o = await splitPDF(
        req.file.buffer,
        outline[i].title,
        outline[i].page,
        outline[i + 1].page - 1
      );

      const newChapter = new Chapter({
        book: newBook._id,
        title: outline[i].title,
        startPage: outline[i].page,
        pdfLink: o.pdfSublink,
        audioLink: o.audioLink,
      });
      await newChapter.save();
    }
  } catch (err) {
    console.log(err);
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
      return;
    }

    for (const item of outline) {
      const title = item.title;
      var pageNumber = null;
      // console.log(title);

      if (item.dest) {
        const pageIndex = await pdfDocument.getPageIndex(item.dest[0]);
        pageNumber = pageIndex + 1;
        // console.log(pageNumber);
      }

      //   console.log(`Title: ${title}, Page: ${pageNumber}`);
      list.push({ title: title, page: pageNumber });
      if (item.items && item.items.length > 0) {
        for (const subItem of item.items) {
          const subTitle = subItem.title;
          let subPageNumber = null;

          if (subItem.dest) {
            const subPageIndex = await pdfDocument.getPageIndex(
              subItem.dest[0]
            );
            subPageNumber = subPageIndex + 1;
          }

          list.push({ title: subTitle, page: subPageNumber });
          //   console.log(`  SubTitle: ${subTitle}, Page: ${subPageNumber}`);
        }
      }
    }
    return list;
  } catch (err) {
    throw new Error("Fail to get outline");
  }
};

const splitPDF = async (pdfBuffer, title, start, end) => {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const start = start - 1;
  const end = end - 1;
  // Tạo một tài liệu PDF mới
  const newPdfDoc = await PDFDocument.create();

  // Sao chép các trang từ start đến end
  for (let i = start; i <= end; i++) {
    const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
    newPdfDoc.addPage(copiedPage);
  }
  const pdfBytes = await newPdfDoc.save();

  const key = `${Date.now().toString()}_${title}.pdf`;

  const pdfSublink = await saveFileWithKey(pdfBytes, key);
  //luu audio
  const audioLink = "";
  return { pdfSublink: pdfSublink, audioLink: audioLink };
};
