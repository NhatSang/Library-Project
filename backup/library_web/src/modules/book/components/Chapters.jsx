import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa6";
import { sampleChapters } from "../../../constants";
import { IoIosBook } from "react-icons/io";
const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [isAudio, setIsAudio] = useState(false);
  const navigate = useNavigate();
  const book = JSON.parse(localStorage.getItem("book"));
  useEffect(() => {
    setChapters(sampleChapters);
  }, []);

  const handleAudio = () => {
    setIsAudio(true);
    navigate("/book-audio", { state: { book: book, page: 1 } });
  };
  const handleText = () => {
    setIsAudio(false);
    navigate("/book-content", { state: { book: book, page: 1 } });
  };
  const handleChangeChapter = (c) => {
    if (isAudio)
      navigate("/book-audio", { state: { book: book, page: c.startPage } });
    else navigate("/book-content", { state: { book: book, page: c.startPage } });
  };
  return (
    <div className="p-4 bg-white">
      <Button style={{ fontSize: 25 }} onClick={handleText}>
        <IoIosBook />
      </Button>
      <Button style={{ fontSize: 25 }} onClick={handleAudio}>
        <FaHeadphones />
      </Button>
      <div className="space-y-4 mt-2">
        {chapters?.map((c, index) => (
          <div className="flex justify-between w-full items-center" key={index}>
            <Button
              onClick={() => handleChangeChapter(c)}
              type="link"
              className=" hover:text-sky-600 flex justify-start text-black text-lg"
            >
              {c.title}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chapters;
