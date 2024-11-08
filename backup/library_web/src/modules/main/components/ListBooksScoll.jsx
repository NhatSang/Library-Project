import { Image } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ListBooksScoll = ({ title, data }) => {
  return (
    <div className="bg-white rounded-md p-3 shadow-md space-y-3 h-1/2">
      <p className="font-bold text-2xl">{title}</p>

      <div className="flex whitespace-nowrap overflow-auto space-x-3 h-full">
        {data?.map((d, index) => (
          <div key={index} className="h-full p-2 w-1/6 ">
            <Link
              to={"/book"}
              state={{ book: d }}
              className="h-full p-2 hover:text-black hover:bg-gray-200 rounded-md border flex items-center"
            >
              <div>
                <img src={d.image} className="w-full" />
                <div className="flex flex-col">
                  <div className="w-40">
                    <p className="font-bold text-lg text-blue-600 overflow-hidden whitespace-nowrap text-ellipsis w-full">
                      {d.title}
                    </p>
                  </div>
                  <p >{d.author}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBooksScoll;
