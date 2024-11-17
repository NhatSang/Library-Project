import { Button } from 'antd';
import React from 'react'
import { RiCloseLargeFill } from "react-icons/ri";
const UserProfileSidebar = ({ user, isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-fit w-2/12 bg-slate-200 shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <Button
        className="absolute top-4 right-4 text-xl text-gray-500"
        onClick={onClose}
      >
        <RiCloseLargeFill />
      </Button>

      <div className="p-6 text-black mt-10">
        <div className="rounded-full flex justify-center items-center">
          <Button className="h-fit rounded-lg p-0 bg-slate-200 hover:!bg-slate-300 flex items-center justify-center">
            <img
              src={user.image}
              alt="User Avatar"
              className="w-48 h-48 object-cover rounded-full"
            />
          </Button>
        </div>
        <div className="pt-4">
          <p className="mb-2">
            Tên: <span className="font-semibold">{user.name}</span>
          </p>
          <p className="mb-2">
            Email: <span className="font-semibold">{user.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar