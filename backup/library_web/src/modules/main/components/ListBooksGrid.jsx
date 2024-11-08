import { Image } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ListBooksGrid = ({ title, data }) => {
  return (
    <div className="bg-white rounded-md p-3 shadow-md space-y-3">
      <p className="font-bold text-2xl">{title}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.map((d, index) => (
          <Link
            key={index}
            to={"/book"}
            state={{ book: d }}
            className=" p-2 hover:text-black hover:bg-gray-200 rounded-md border"
          >
            <div className="flex space-x-2">
              <img src={d.image} className="w-1/2 rounded-md" />

              <div className="space-y-2">
                <p className="font-bold text-lg text-blue-600 overflow-hidden whitespace-nowrap text-ellipsis">
                  {d.title}
                </p>
                <p>{d.author}</p>
                <p className="text-ellipsis line-clamp-6">{d.summary}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListBooksGrid;
