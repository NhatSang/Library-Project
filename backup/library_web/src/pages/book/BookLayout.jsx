import React from "react";
import BookDetail from "./components/BookDetail";
import Chapters from "./components/Chapters";
import Reviews from "./components/Reviews";
import { useLocation } from "react-router-dom";

const BookLayout = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 px-5 py-2 gap-3">
        <div className="col-span-1 md:col-span-3">
          <BookDetail />
        </div>
        <Chapters className="col-span-1" />
      </div>
      <div className="px-5 py-2">
        <Reviews />
      </div>
    </div>
  );
};

export default BookLayout;
