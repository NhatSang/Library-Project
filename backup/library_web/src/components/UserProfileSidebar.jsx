import React, { useEffect, useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { Form, Input, Button, Upload, Avatar, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { MdOutlineArrowBack } from "react-icons/md";

const UserProfileSidebar = ({ user, isOpen, onClose }) => {
  const [nuser, setUser] = useState(user);
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [listMajors, setListMajors] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getMajors();
      setListMajors(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);

    if (file) {
      formData.append("image", file); // Thêm file vào formData
    }

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Thông tin đã được gửi thành công!");
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Đã xảy ra lỗi khi gửi thông tin!");
    }
  };

  const handleImageUpload = (file) => {
    const imageUrl = URL.createObjectURL(file); // Hiển thị trước ảnh
    console.log(imageUrl);

    setUser({ ...nuser, image: imageUrl });
    setFile(file); // Lưu file ảnh vào state
    return false; // Ngăn không upload mặc định của Upload
  };
  return (
    <div
      className={`fixed top-0 right-0 h-fit w-3/12 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <Button
        className="absolute top-4 right-4 text-xl text-gray-500"
        onClick={onClose}
      >
        <RiCloseLargeFill />
      </Button>
      {isEditing && (
        <Button
          className="absolute top-4 left-4 text-xl text-gray-500"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          <MdOutlineArrowBack />
        </Button>
      )}
      <div className="p-6 text-black mt-10 w-full overflow-hidden">
        <Form
          layout="vertical"
          initialValues={{
            name: nuser.name,
            email: nuser.email,
            code: nuser.code,
          }}
          onFinish={handleFormSubmit}
          className="space-y-4"
        >
          {/* Avatar Upload */}
          <Form.Item>
            <div className="flex flex-col items-center">
              <Avatar size={120} src={nuser.image} className="mb-4" />
              {isEditing && (
                <Upload
                  beforeUpload={handleImageUpload}
                  showUploadList={false}
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
              )}
            </div>
          </Form.Item>

          {/* Name */}
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
          >
            <Input placeholder="Nhập tên" readOnly={!isEditing} />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" readOnly={!isEditing} />
          </Form.Item>
          <Form.Item
            label="Mã số sinh viên/ giảng viên"
            name="code"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập!",
              },
            ]}
          >
            <Input readOnly={!isEditing} />
          </Form.Item>
          {/* Action Buttons */}
          <Form.Item>
            <Button
              type="primary"
              htmlType={isEditing ? "submit" : "button"}
              onClick={() => setIsEditing(!isEditing)}
              block
            >
              {isEditing ? "Lưu" : "Chỉnh sửa thông tin"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
