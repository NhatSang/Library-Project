import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Flex } from "antd";
import { IMAGES } from "../../constants";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { notification, Space } from "antd";
import { login } from "./api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { openNotificationWithIcon } from "../../helper";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useDispatch } from "react-redux";


const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const { instance } = useMsal();

  const onFinish = async (values) => {
    try {
      const response = await login(values.username, values.password);
      console.log(response);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );

      navigate("/home");
    } catch (error) {
      openNotificationWithIcon(
        api,
        "Đăng nhập không thành công",
        error.response.data.error.message
      );
    }
  };
  const handleLogin = () => {
    instance
      .loginPopup({
        scopes: ["User.Read"],
        prompt: "select_account",
      })
      .then((response) => {
        console.log("Login successful:", response);
      })
      .catch((error) => {
        console.log("Login failed:", error);
      });
  };
  return (
    <>
      {contextHolder}
      <div className="p-10">
        <div className="border flex flex-col justify-center items-center space-y-5 shadow-2xl rounded-xl">
          <div>
            <img src={IMAGES.LOGO} width={250} />
          </div>
          <div>
            <Form
              name="login"
              initialValues={{
                remember: true,
              }}
              style={{
                maxWidth: 500,
                width: 300,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  value={email}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Link href="">Quên Mật khẩu?</Link>
                  <Link to={"/register"} className="font-bold">
                    Đăng ký
                  </Link>
                </Flex>
              </Form.Item>

              <Form.Item className="mb-3">
                <Button block type="primary" htmlType="submit">
                  Log in
                </Button>
              </Form.Item>
              <p className="mb-3 font-medium">Hoặc</p>
              <Form.Item>
                <Button block type="primary" onClick={handleLogin}>
                  Đăng nhập với Outlook{" "}
                  <span className="text-xl">
                    {PiMicrosoftOutlookLogoFill()}
                  </span>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
