import React, { useState } from "react";
import { LuBox, LuUser, LuBook, LuBarChart2 } from "react-icons/lu";
import { Link } from "react-router-dom";
const Slidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  const SLIDEBAR_LINKS = [
    { id: 1, path: "/", name: "Dashboard", icon: LuBarChart2 },
    { id: 2, path: "/users", name: "Users", icon: LuUser },
    { id: 3, path: "/books", name: "Books", icon: LuBook },
  ];
  return (
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-slate-900">
      <div className="mb-8">
        <p className="w-28 hidden md:flex text-white font-medium">
          IUH Library
        </p>
      </div>
      <ul className="mt-6 space-y-6">
        {SLIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`font-medium rounded-md py-2 px-5 text-gray-500 hover:bg-slate-400 hover:text-slate-900 ${
              activeLink === index ? "bg-slate-400 text-slate-900" : ""
            }`}
          >
            <Link
              to={link.path}
              className="flex justify-center md:justify-start items-center md:space-x-5"
              onClick={() => handleLinkClick(index)}
            >
              <span>{link.icon()}</span>
              <span className="text-sm hidden md:flex">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link className="w-full absolute bottom-5 left-0 px-4 py-2 text-center ">
        <p className="flex items-center justify-center space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-violet-900 to-slate-600 rounded-full ">
          <span className="md:hidden">?</span>
          <span className=" hidden md:flex">Need help?</span>
        </p>
      </Link>
    </div>
  );
};

export default Slidebar;
