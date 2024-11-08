import React, { useEffect, useState } from "react";
import { sampleData } from "../../constants";

import { useSelector } from "react-redux";
import ListBooks from "./components/ListBooks";
import {
  _getBookByMajorsUser,
  _getBookNewest,
  _getBookTopRated,
  _getBookTopViewed,
  _getRecommendBooks,
  getHistories,
} from "./api";
import ListBooksScoll from "./components/ListBooksScoll";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import ListBooksGrid from "./components/ListBooksGrid";
const Home = () => {
  const user = useSelector((state) => state.user.data);
  const [histories, setHistories] = useState([]);
  const [booksByMajorsUser, setBooksByMajorsUser] = useState([]);
  const [booksNewest, setBooksNewest] = useState([]);
  const [booksTopRated, setBooksTopRated] = useState([]);
  const [booksTopViewed, setBooksTopViewed] = useState([]);
  const [recommendBooks, setRecommendBooks] = useState([]);
  useEffect(() => {
    fetchHistories();
    fetchBookByMajorsUser();
    fetchBookNewest();
    fetchBookTopRated();
    fetchBookTopViewed();
    fetchRecommendBooks();
  }, []);

  const fetchRecommendBooks = async () => {
    try {
      const response = await _getRecommendBooks();
      setRecommendBooks(response.data);
    } catch (error) {}
  };
  const fetchHistories = async () => {
    try {
      const response = await getHistories();
      setHistories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookByMajorsUser = async () => {
    try {
      const response = await _getBookByMajorsUser();
      setBooksByMajorsUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookNewest = async () => {
    try {
      const response = await _getBookNewest();
      console.log(response.data);
      setBooksNewest(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookTopRated = async () => {
    try {
      const response = await _getBookTopRated();
      setBooksTopRated(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookTopViewed = async () => {
    try {
      const response = await _getBookTopViewed();
      setBooksTopViewed(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-5 py-2 space-y-3">
      <div className="bg-white p-3 rounded-lg">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={2}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 3000,
          }}
        >
          {sampleData.map((d, index) => (
            <SwiperSlide>
              <Link
                key={index}
                className=" flex items-center justify-center border border-gray-300 rounded-lg bg-cover"
                style={{
                  backgroundImage: `url(${d.image})`,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <div
                  className="flex items-center justify-center bg-gray-400  p-5 text-white rounded-lg space-x-3"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                >
                  <img src={d.image} className="w-2/5 rounded-lg" />
                  <div className="space-y-2">
                    <p className="font-semibold text-2xl">{d.title}</p>
                    <p>{d.author}</p>
                    <p className="text-ellipsis line-clamp-6">{d.summary}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ListBooks title={"Lịch sử"} data={histories} />
      {recommendBooks.length > 0 ? (
        <ListBooksScoll title={"Có thể bạn sẽ thích"} data={recommendBooks} />
      ) : null}
      <ListBooksScoll title={"Đề xuất theo chuyên ngành"} data={sampleData} />
      <ListBooksGrid title={"Top sách đánh giá cao"} data={sampleData} />
      <ListBooksGrid title={"Top sách có lượt đọc cao"} data={sampleData} />
    </div>
  );
};

export default Home;
