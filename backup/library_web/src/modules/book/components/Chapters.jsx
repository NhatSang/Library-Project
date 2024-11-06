import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa6";
import { sampleChapters } from "../../../constants";
import { IoIosBook } from "react-icons/io";
import { _getChapterByIdBook } from "../api";

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [isAudio, setIsAudio] = useState(false);
  const navigate = useNavigate();
  const book = JSON.parse(localStorage.getItem("book"));
  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      console.log(book._id);
      
      const response = await _getChapterByIdBook(book._id);
      setChapters(response.data.data);
    } catch (error) {}
  };
  const handleAudio = () => {
    setIsAudio(true);
    navigate("/book-audio", { state: { book: book, page: 2 } });
  };
  const handleText = () => {
    setIsAudio(false);
    navigate("/book-content", { state: { book: book, page: 1 } });
  };
  const handleChangeChapter = (c) => {
    if (isAudio)
      navigate("/book-audio", { state: { book: book, page: c.startPage + 1 } });
    else
      navigate("/book-content", {
        state: { book: book, page: c.startPage - 1 },
      });
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
