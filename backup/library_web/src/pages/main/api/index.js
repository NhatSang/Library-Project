import axiosInstance from "../../../axios/axiosConfig";

export const getHistories = async () => {};
export const getRecommendedBooksBySimilarUsers = async () => {};
export const getRecommendedBooksByHistory = async () => {};
export const getRecommendedBooksByPreference = async () => {};
export const getGenres = async () => {
  const url = "/genres";
  return await axiosInstance.get(url);
};
