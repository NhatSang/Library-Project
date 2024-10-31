import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { sampleReviews } from "../../../constants";
import { Button, Image, Input, message } from "antd";
const { TextArea } = Input;
import Rating from "./Rating";
import { useSelector } from "react-redux";
import { Rate } from "antd";
const Reviews = () => {
  const book = useSelector((state) => state.book.data);
  const user = useSelector((state) => state.user.data);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  useEffect(() => {
    setReviews(sampleReviews);
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
      handleSubmit(); // Gọi hàm xử lý submit
    }
  };

  const handleSubmit = () => {
    if (content.trim() && rating > 0) {
      const review = {
        rating: rating,
        content: content,
        updatedAt: "2024-10-30",
      };
      setReviews( [...reviews, review]);
      setContent("");
      setRating(0);
    } else {
      message.warning("Vui lòng nhập đánh giá và chọn số sao.");
    }
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2 bg-white rounded-lg shadow-md p-4">
        <p className="mb-2 font-medium text-lg">Để lại đánh giá của bạn:</p>
        <div>
          <Rating totalStars={5} rating={rating} setRating={setRating} />
        </div>
        <div>
          <TextArea
            rows={4}
            value={content}
            onKeyDown={handleKeyPress}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="primary"
            className="w-40 text-lg font-semibold"
            onClick={handleSubmit}
          >
            Đăng
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        {reviews.map((r, index) => (
          <div key={index} className="border-b border-gray-300 py-2 space-y-2">
            <div className="flex items-center space-x-2 font-medium">
              <Image src={user.image} width={40} className="rounded-full" />
              <p>{user.name}</p>
            </div>
            <div className="flex space-x-5 items-center font-thin">
              <Rate disabled defaultValue={r.rating} />
              <p>{r.updatedAt}</p>
            </div>
            <div>
              <p>{r.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
