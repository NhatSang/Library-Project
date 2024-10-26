
import pdf from "pdf-parse";
import axios from 'axios';

// Hàm xử lý PDF
export const processPdfPages = async (pathFile) => {
  try {
    const response = await axios.get(pathFile, { responseType: 'arraybuffer' });
    const data = await pdf(response.data.buffer); 


    const textByPage = data.text.split(/\f|\n\n/); 


    const contents = textByPage.map((content, index) => ({
      page: index + 1,
      content: content.trim()
    }));

    return contents;

  } catch (error) {
    console.error("Error processing PDF:", error);
    return [];
  }
};



