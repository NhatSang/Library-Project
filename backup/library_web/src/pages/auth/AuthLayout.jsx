import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className=" h-screen w-full grid grid-cols-10 justify-center items-center">
      <div className="col-span-6 h-svh">
        <img src="/login/bg.jpg" className="h-screen w-full" />
      </div>
      <div className="col-span-4 p-10">
        <Outlet/>
      </div>
    </div>
  );
};

export default AuthLayout;
