import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa6";
import { sampleChapters } from "../../../constants";
import { IoIosBook } from "react-icons/io";
import { _getChapterByIdBook } from "../api";
import { MdOutlineArrowBack } from "react-icons/md";

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
    navigate("/book-content", { state: { book: book, page: 0 } });
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
    <div className="p-4 bg-white h-svh flex flex-col">
      <div className="space-x-4 sticky top-4 bg-white z-10 p-3 shadow-lg border border-gray-200 rounded-md flex items-center">
        <Button
          style={{ fontSize: 25, color: "#2563EB" }}
          onClick={() => navigate("/book", { state: { book: book } })}
        >
          <MdOutlineArrowBack />
        </Button>
        <Button style={{ fontSize: 25, color: "#2563EB" }} onClick={handleText}>
          <IoIosBook />
        </Button>
        <Button
          style={{ fontSize: 25, color: "#2563EB" }}
          onClick={handleAudio}
        >
          <FaHeadphones />
        </Button>
      </div>

      <div className="flex-grow overflow-auto bg-white rounded-lg shadow-inner border border-gray-300 mt-4">
        {/* Tiêu đề của danh sách chương */}
        <div className="p-3 bg-blue-100 border-b border-gray-300 text-gray-700 font-semibold text-lg">
          Danh sách chương
        </div>

        {/* Nội dung danh sách chương */}
        <div className="space-y-2 p-3">
          {sampleChapters?.map((c, index) => (
            <div
              className="flex justify-between items-center px-4 rounded-md transition-colors duration-200 hover:bg-blue-100"
              key={index}
            >
              <Button
                onClick={() => handleChangeChapter(c)}
                type="link"
                className="text-gray-700 hover:text-blue-600 font-medium text-lg flex justify-start w-full"
              >
                {c.title}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chapters;
