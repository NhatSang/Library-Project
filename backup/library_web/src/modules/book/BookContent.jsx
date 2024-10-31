import React, { useEffect, useState } from "react";
import PDFViewer from "./components/PDFViewer";
import { Outlet, useLocation } from "react-router-dom";
import Chapters from "./components/Chapters";

const BookContent = () => {
  // const location = useLocation();
  // const book = location.state.book;

  return (
    <div className="grid grid-cols-10">
      <div className="col-span-3 sticky top-14 h-screen overflow-y-auto">
        <Chapters />
      </div>
      <div className="col-span-7 px-3 bg-white ">
        <Outlet />
      </div>
    </div>
  );
};

export default BookContent;
