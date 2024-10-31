import React, { useEffect, useState } from "react";
import { Button, Carousel } from "antd";
import { Avatar, Card } from "antd";
import { sampleData } from "../../constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListBooks from "./components/ListBooks";
import { getHistories } from "./api";
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
  const user = useSelector((state) => state.user.data);
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetchHistories();
  }, []);

  const fetchHistories = async () => {
    try {
      const response = await getHistories();
      setHistories(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-5 py-2 space-y-3">
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
      <ListBooks title={"Đề xuất từ người dùng tương tự"} data={[]} />
      <ListBooks title={"Có thể bạn sẽ thích"} data={[]} />
      <ListBooks title={"Những sách tương tự bạn đã xem"} data={[]} />
    </div>
  );
};

export default Home;
