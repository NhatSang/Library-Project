import React, { useState } from "react";
import { Button, Carousel } from "antd";
import { Avatar, Card } from "antd";
import { sampleData } from "../../constants";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const { Meta } = Card;

const contentStyle = {
  height: "260px",
  color: "#fff",
  lineHeight: "260px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  const [top10, setTop10] = useState(sampleData);
  const dispatch = useDispatch()
  return (
    <div className="w-full px-5 py-2 space-y-3 h-screen">
      <div className="w-full ">
        <Carousel autoplay>
          {top10.map((b, index) => (
            <Link
              key={index}
              to={"/book"}
              state={{ book: b }}
              type="text"
              className="w-full bg-sky-900 rounded-lg p-3 shadow-md hover:text-white text-white font-medium text-base"
            >
              <div className="flex  justify-center space-x-4">
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
      <div className="bg-white rounded-md p-3 shadow-md">
        <p>Lịch sử</p>
        <div className="flex whitespace-nowrap overflow-auto space-x-3"></div>
      </div>
      <div className="bg-white rounded-md p-3 shadow-md">
        <p>Đề xuất từ người dùng tương tự</p>
        <div className="flex whitespace-nowrap overflow-auto space-x-3"></div>
      </div>
      <div className="bg-white rounded-md p-3 shadow-md">
        <p>Có thể bạn sẽ thích</p>
        <div className="flex whitespace-nowrap overflow-auto space-x-3"></div>
      </div>
      <div className="bg-white rounded-md p-3 shadow-md">
        <p>Những sách tương tự bạn đã xem</p>
        <div className="flex whitespace-nowrap overflow-auto space-x-3"></div>
      </div>
    </div>
  );
};

export default Home;
