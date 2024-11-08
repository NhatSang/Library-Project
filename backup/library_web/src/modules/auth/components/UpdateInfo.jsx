import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Radio } from "antd";
import { IMAGES } from "../../../constants";
import { getMajors, register } from "../api";
import { openNotificationWithIcon } from "../../../helper";

const { Option } = Select;

const UpdateInfo = ({ handleBack, email, setStage }) => {
  const [listMajors, setListMajors] = useState([]);

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

  const onFinish = async (values) => {
    try {
      const user = {
        name: values.name,
        password: values.password,
        repassword: values.repassword,
        email: email,
        gender: values.gender,
        dob: values.dob,
        majors: values.majors,
        code: values.code,
      };
      const response = await register(user);
      setStage(4);
    } catch (error) {
      openNotificationWithIcon(
        api,
        "Đăng ký thất bại!",
        error.response.data.error.message
      );
    }
  };

  const validateInput = (values) => {};

  return (
    <div className="border items-center shadow-2xl rounded-xl p-3 bg-white">
      <div className="flex justify-end">
        <img src={IMAGES.LOGO} width={90} />
      </div>
      <Form
        className="space-y-2 mt-1"
        onFinish={onFinish}
        layout="vertical"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu"
          name="comfirmPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Họ tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập!",
            },
          ]}
        >
          <Input />
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Chuyên ngành"
          name="majors"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn!",
            },
          ]}
        >
          <Select>
            {listMajors.map((m) => (
              <Option key={m._id} value={m._id}>
                {m.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div className="flex space-x-20">
          <Form.Item
            label="Ngày sinh"
            name="dob"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name={"gender"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="Male"> Nam </Radio>
              <Radio value="Female"> Nữ </Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div className="flex justify-center items-center space-x-2">
          <Button type="primary" onClick={handleBack}>
            Trở về
          </Button>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateInfo;
