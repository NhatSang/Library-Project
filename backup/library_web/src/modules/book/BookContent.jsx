import React, { useEffect, useState } from "react";
import PDFViewer from "./components/PDFViewer";
import { Outlet, useLocation } from "react-router-dom";
import Chapters from "./components/Chapters";
import Note from "./components/Note";

const BookContent = () => {
  // const location = useLocation();
  // const book = location.state.book;

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-2 pl-4">
        <Chapters />
      </div>
      <div className="col-span-6 bg-white ">
        <Outlet />
      </div>
      <div className="col-span-2">
        <Note/>
      </div>
    </div>
  );
};

export default BookContent;
