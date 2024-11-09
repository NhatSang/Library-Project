import axiosInstance from "../../../axios/axiosConfig";

export const login = async (email, password) => {
  const url = "/auth/login";
  return await axiosInstance.post(url, { email, password });
};

export const sendCode = async (email) => {
  const url = "auth/send-code";
  return await axiosInstance.post(url, { email });
};

export const verifyCode = async (email, verificationCode) => {
  const url = "auth/verify-code";
  return await axiosInstance.post(url, { email, verificationCode });
};

export const getMajors = async () => {
  const url = "/majors";
  return await axiosInstance.get(url);
};

export const register = async (user) => {
  const url = "/auth/register";
  return await axiosInstance.post(url, user);
};

export const loginTemp = async (email, password) => {
  const url = "/auth/login";
  return await axiosInstance.post(url, { email, password });
}

export const loginWithMs = async (email, password) => {
  const url = "/auth/login-microsoft";
  return await axiosInstance.post(url, { email, password });
};

export const updateUser = async(user)=>{
  const url = "/users/update-user";
  return await axiosInstance.post(url, user);
}
