import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sampleChapters } from "../../../constants";

const Chapters = () => {
  const location = useLocation();
  // const book = location?.state?.book;
  const [chapters, setChapters] = useState();
  useEffect(() => {
    setChapters(sampleChapters);
  });
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <p>Mục lục</p>
      <div className=" flex space-x-4 pl-2 mt-2">
        {sampleChapters.map((c, index) => (
          <div key={index} className="underline hover:text-sky-600">
            <Link to={"/book-content"}>{c.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chapters;
