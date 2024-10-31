import axiosInstance from "../../../axios/axiosConfig";

export const getBookContentByPage = async (bookId, page) => {
  const url = "/book/get-content";
  console.log(bookId);
  
  return await axiosInstance.get(url, { params: { bookId, page } });
};
