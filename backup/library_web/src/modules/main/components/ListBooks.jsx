import { Button, Image } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ListBooks = ({ title, data }) => {
  return (
    <div className="bg-white rounded-md p-3 shadow-md space-y-3 h-1/2">
      <p>{title}</p>
      <div className="flex whitespace-nowrap overflow-auto space-x-3 h-full">
        {data?.map((d, index) => (
          <div className="h-full p-2 w-1/6 ">
            <Link
              key={index}
              to={"/book"}
              state={{book:d.book}}
              className="h-full p-2 hover:text-black hover:bg-gray-200 rounded-md bg-gray-400 flex items-center"
            >
              <div>
                <Image src={d.book.image} className="w-full" />
                <div>
                  <p className="font-medium whitespace-pre-wrap">
                    {d.book.title}
                  </p>
                  <p className="font-thin">{d.book.author}</p>
                </div>
                <Link to={"/book-content"} className="hover:text-blue-700">
                  Đọc tiếp
                </Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBooks;
