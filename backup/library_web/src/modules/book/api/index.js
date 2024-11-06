import axiosInstance, { axiosInstance2 } from "../../../axios/axiosConfig";

export const getBookContentByPage = async (bookId, page) => {
  const url = "/book/get-content";
  return await axiosInstance.get(url, { params: { bookId, page } });
};
export const _getChapterByIdBook = async (id) => {
  const url = "/get-chapter-by-book-id";
  return axiosInstance2.get(url, {
    params: {
      bookId: id,
    },
  });
};