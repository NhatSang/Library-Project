import { Button, Modal } from "antd";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { sampleNote } from "../../../constants";
const Note = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal1 = () => {
    setOpen1(true);
  };
  const showModal2 = () => {
    setOpen2(true);
  };
  const handleOk1 = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen1(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleOk2 = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen2(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel1 = () => {
    console.log("Clicked cancel button");
    setOpen1(false);
  };
  const handleCancel2 = () => {
    console.log("Clicked cancel button");
    setOpen2(false);
  };
  return (
    <div className="py-2 pr-4 bg-white h-svh flex flex-col">
      <div className="flex-grow overflow-auto bg-white rounded-lg shadow-inner border border-gray-300">
        {/* Tiêu đề của danh sách chương */}
        <div className="p-3 bg-blue-100 border-b border-gray-300 text-gray-700 font-semibold text-lg justify-between items-center flex">
          <p>Ghi chú</p>
          <Button style={{ fontSize: 25, color: "#2563EB" }} onClick={showModal1}>
            <IoMdAdd />
          </Button>
        </div>

        {/* Nội dung danh sách chương */}
        <div className="space-y-2 p-3">
          {sampleNote?.map((c, index) => (
            <div
              className="flex justify-between items-center px-4 rounded-md transition-colors duration-200 hover:bg-blue-100"
              key={index}
            >
              <Button
                onClick={showModal2}
                type="link"
                className="text-gray-700 hover:text-blue-600 font-medium text-lg flex justify-start w-full"
              >
                <p className="text-ellipsis overflow-hidden">{c.content}</p>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Title"
        open={open1}
        onOk={handleOk1}
        confirmLoading={confirmLoading}
        onCancel={handleCancel1}
      >
        <p>{modalText}</p>
      </Modal>
      <Modal
        title="Title"
        open={open2}
        onOk={handleOk2}
        confirmLoading={confirmLoading}
        onCancel={handleCancel2}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default Note;
