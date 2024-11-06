import { Button, Image } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const BookDetail = () => {
  const location = useLocation();
  const book = location.state.book;
  const history = location.state.history;
  const navigate = useNavigate();
  const handleReadBook = () => {
    localStorage.setItem("book", JSON.stringify(book));
    navigate("/book-content", { state: { book: book, page: 0 } });
  };
  const handleContinuteRead = () => {
    localStorage.setItem("book", JSON.stringify(book));
    navigate("/book-content", { state: { history: history, book: book } });
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  }, []);
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex space-x-4">
      <div className="w-1/5">
        <Image
          src={book?.image}
          className="rounded-md object-cover"
          alt={book?.title}
        />
        <div className="flex items-center justify-around">
          <div className="flex items-center space-x-2">
            <span>4000</span> <FaRegEye />
          </div>
          <div className="flex items-center space-x-2">
            <span>4.5</span> <FaStar color="yellow" />
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <Button
            onClick={handleReadBook}
            className="bg-green-600 text-white font-medium text-lg"
          >
            Xem
          </Button>
          {history ? (
            <Button
              onClick={handleContinuteRead}
              className="bg-green-600 text-white font-medium text-lg"
            >
              Đọc tiếp
            </Button>
          ) : null}
        </div>
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-lg font-semibold text-gray-800 ">{book?.title}</p>
        <p className="text-sm text-gray-600">
          Tác giả: <span className="font-medium">{book?.author}</span>
        </p>
        <p className="text-sm text-gray-600">
          Thể loại: <span className="font-medium">{book?.genre}</span>
        </p>
        <p className="text-sm text-gray-600">Tóm tắt: {book?.summary}</p>
      </div>
    </div>
  );
};

export default BookDetail;
