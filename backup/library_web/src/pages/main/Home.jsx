import React from "react";
import { Carousel } from "antd";
import { Avatar, Card } from "antd";
const { Meta } = Card;

const contentStyle = {
  height: "260px",
  color: "#fff",
  lineHeight: "260px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  return (
    <div className="w-full px-5 py-2 space-y-3 h-screen">
      <div className="w-full">
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
      <div className="bg-white rounded-md p-3">
        <p>Lịch sử</p>
        <div className="flex whitespace-nowrap overflow-auto space-x-3"></div>
      </div>
      <div className="bg-white rounded-md p-3">
        <p>Đề xuất từ người dùng tương tự</p>
        <div className="flex whitespace-nowrap overflow-auto space-x-3"></div>
      </div>
      <div className="bg-white rounded-md p-3">
        <p>Có thể bạn sẽ thích</p>
        <div className="flex whitespace-nowrap overflow-auto space-x-3"></div>
      </div>
      <div className="bg-white rounded-md p-3">
        <p>Những sách tương tự bạn đã xem</p>
        <div className="flex whitespace-nowrap overflow-auto space-x-3"></div>
      </div>
    </div>
  );
};

export default Home;
