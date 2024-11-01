import React, { useEffect, useState } from "react";
import { Button, Carousel } from "antd";
import { Avatar, Card } from "antd";
import { sampleData } from "../../constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListBooks from "./components/ListBooks";
import { _getBookByMajorsUser, _getBookNewest, _getBookTopRated, _getBookTopViewed, getHistories } from "./api";
import ListBooksCustom from "./components/ListBooksCustom";
const { Meta } = Card;

const contentStyle = {
  height: "260px",
  color: "#fff",
  lineHeight: "260px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  const user = useSelector((state) => state.user.data);
  const [histories, setHistories] = useState([]);
  const [booksByMajorsUser, setBooksByMajorsUser] = useState([]);
  const [booksNewest, setBooksNewest] = useState([]);
  const [booksTopRated, setBooksTopRated] = useState([]);
  const [booksTopViewed, setBooksTopViewed] = useState([]);

  useEffect(() => {
    fetchHistories();
    fetchBookByMajorsUser();
    fetchBookNewest();
    fetchBookTopRated();
    fetchBookTopViewed();
  }, []);

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
  }

  const fetchBookNewest = async () => {
    try {
      const response = await _getBookNewest();
      console.log(response.data);
      setBooksNewest(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchBookTopRated = async () => {
    try {
      const response = await _getBookTopRated();
      setBooksTopRated(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchBookTopViewed = async () => {
    try {
      const response = await _getBookTopViewed();
      setBooksTopViewed(response.data);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="w-full px-5 py-2 space-y-3">
      <div className="w-full ">
        <Carousel autoplay>
          {booksNewest.map((b, index) => (
            <Link
              key={index}
              to={"/book"}
              state={{ book: b }}
              type="text"
              className="w-full bg-sky-900 rounded-lg p-3 shadow-md hover:text-white text-white font-medium text-base"
              
            >
              <div className="flex justify-center space-x-4">
                <div>
                  <img src={b.image} width={150} />
                </div>
                <div className="space-y-3 w-1/2">
                  <p>
                    Tiêu đề: <span className=" font-normal">{b.title}</span>
                  </p>
                  <p>
                    Tác giả: <span className=" font-normal">{b.author}</span>
                  </p>
                  <p>
                    Thể loại: <span className=" font-normal">{b.genre}</span>
                  </p>
                  <p className="line-clamp-3 text-ellipsis">
                    Tóm tắt: <span className=" font-normal">{b.summary}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
      <ListBooks title={"Lịch sử"} data={histories} />
      <ListBooksCustom title={"Đề xuất theo chuyên ngành"} data={booksByMajorsUser} type={1}  />
      <ListBooksCustom title={"Top sách đánh giá cao"} data={booksTopRated} type={2} />
      <ListBooksCustom title={"Top sách có lượt đọc cao"} data={booksTopViewed} type={3}  />
    </div>
  );
};

export default Home;
