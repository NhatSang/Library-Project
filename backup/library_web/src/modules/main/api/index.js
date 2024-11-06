import axiosInstance, { axiosInstance2 } from "../../../axios/axiosConfig";

export const getHistories = async () => {
  const url = "/histories";
  return await axiosInstance.get(url);
};

export const getRecommendedBooksByPreference = async () => {};
export const getGenres = async () => {
  const url = "/genres";
  return await axiosInstance.get(url);
};

export const _getBookByMajorsUser = async()=>{
  const url = "/book/get-by-majors-user";
  return await axiosInstance.get(url);
}

export const _getBookNewest = async()=>{
  const url = "/book/get-newest";
  return await axiosInstance.get(url);
}

export const _getBookTopRated = async()=>{
  const url = "/book/get-top-rated";
  return await axiosInstance.get(url);
}

export const _getBookTopViewed = async()=>{
  const url = "/book/get-top-viewed";
  return await axiosInstance.get(url);
}

export const _getRecommendBooks= async () => {
  const url = "/book/recommend-books";
  return await axiosInstance.get(url);
};

export const _getBookContentBypage = async (id, page) => {
  const url = "/get-book-content-by-page";
  return axiosInstance2.get(url, {
    params: {
      bookId: id,
      page,
    },
  });
};
