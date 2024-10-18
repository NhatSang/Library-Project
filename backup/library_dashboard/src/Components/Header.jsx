import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white m-2 rounded-lg">
      <div>
        <h1 className="text-xs hidden md:flex">Welcome to IUH Library!</h1>
        <h1 className="text-xs md:hidden">Welcome!</h1>
      </div>
      <div className="flex items-center space-x-5">
        <div>
          <Link className=" hover:text-slate-500">
            <span className="text-md font-semibold underline">Logout</span>
          </Link>
        </div>
        <div className=" flex items-center justify-center space-x-5">
          <p className="text-md font-semibold hidden md:flex">Admin</p>
          <img
            className="w-8 h-8 rounded-full border-2"
            src="https://placehold.co/400x400/orange/white"
            alt="avt"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
