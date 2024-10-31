import React from "react";
import BookDetail from "./components/BookDetail";
import Chapters from "./components/Chapters";
import Reviews from "./components/Reviews";
import { useLocation } from "react-router-dom";

const BookLayout = () => {
  return (
    <div>
      <div className="px-5 py-2">
        <BookDetail />
      </div>
      <div className="px-5 py-2">
        <Reviews />
      </div>
    </div>
  );
};

export default BookLayout;
