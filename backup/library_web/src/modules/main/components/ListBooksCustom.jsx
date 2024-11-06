import { Image } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ListBooksCustom = ({ title, data, type }) => {
  return (
    <div className="bg-white rounded-md p-3 shadow-md space-y-3 h-1/2">
      <p className="font-bold text-2xl">{title}</p>
      {/* <div className="flex whitespace-nowrap overflow-auto space-x-3 h-full">
        {data?.map((d, index) => (
          <div
            key={index}
            className="h-full p-2 w-1/6 "
            // className={`flex ${type == 1 ? 'flex-col' : type == 2 ? 'flex-row' : 'flex-col-reverse'} items-center p-2 w-1/4`} // Đặt chiều rộng cố định cho từng item
          >
            <Link
              to={"/book"}
              state={{ book: d }}
              className="hover:text-black hover:bg-gray-200 rounded-md bg-gray-400 flex flex-col items-center h-full"
            >
              <Image
                src={d.image}
                className={`w-full ${
                  type == 1 ? "h-32" : type == 2 ? "h-60" : "h-48"
                } object-cover mb-2`}
              />
              <div className="text-center">
                <p className="font-medium whitespace-pre-wrap">{d.title}</p>
                <p className="font-thin">{d.author}</p>
              </div>
            </Link>
          </div>
        ))}
      </div> */}
      <div className="flex whitespace-nowrap overflow-auto space-x-3 h-full">
        {data?.map((d, index) => (
          <div key={index} className="h-full p-2 w-1/6 ">
            <Link
              to={"/book"}
              state={{ book: d }}
              className="h-full p-2 hover:text-black hover:bg-gray-200 rounded-md bg-gray-400 flex items-center"
            >
              <div>
                <Image src={d.image} className="w-full" />
                <div className="flex flex-col">
                  <div className="w-40">
                    <p className="font-medium overflow-hidden whitespace-nowrap text-ellipsis w-full">
                      {d.title}
                    </p>
                  </div>
                  <p className="font-thin">{d.author}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBooksCustom;
