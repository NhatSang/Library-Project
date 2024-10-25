import fs from 'fs';
import pdf from "pdf-parse";

// Hàm xử lý PDF
export const processPdfPages = async (PdfFile) => {
  try {
    const fileBuffer = fs.readFileSync(PdfFile);
    const data = await pdf(fileBuffer); // Trích xuất toàn bộ văn bản từ file PDF

    // Chia văn bản theo các trang, sử dụng ký tự ngắt trang giả định ('\f' hoặc '\n\n')
    const textByPage = data.text.split(/\f|\n\n/); // Bạn có thể điều chỉnh dấu ngắt trang phù hợp với file PDF của mình.

    // Tạo mảng chứa nội dung từng trang
    const contents = textByPage.map((content, index) => ({
      page: index + 1,
      content: content.trim() // Loại bỏ khoảng trắng thừa
    }));

    return contents; // Trả về mảng kết quả

  } catch (error) {
    console.error("Error processing PDF:", error);
    return [];
  }
};

const pdfFile = './sample.pdf';

// Gọi hàm và in kết quả ra
processPdfPages(pdfFile).then((contents) => {
  console.log(contents);
});
