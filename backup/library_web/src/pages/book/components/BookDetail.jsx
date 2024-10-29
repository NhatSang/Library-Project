import { Image } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
const BookDetail = () => {
  const location = useLocation();
  const book = location?.state.book;
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex space-x-4">
      <div className="w-1/4">
        <Image
          src={book?.image}
          className="rounded-md object-cover w-full h-full"
          alt={book?.title}
        />
        <div className="flex items-center justify-around">
          <div className="flex items-center space-x-2">
            <span>4000</span> <FaRegEye />
          </div>
          <div className="flex items-center space-x-2">
            <span>4.5</span> <FaStar color="yellow"/>
          </div>
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
