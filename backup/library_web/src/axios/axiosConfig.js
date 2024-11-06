// src/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:6001/api/v1", // Đặt URL gốc của API
  timeout: 10000, // Thời gian timeout
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosInstance2 = axios.create({
  baseURL: "http://localhost:5001/api/v1", // Đặt URL gốc của API
  timeout: 10000, // Thời gian timeout
  headers: {
    "Content-Type": "application/json",
  },
});
// Thêm interceptor cho request nếu cần
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token vào headers nếu có
    const token = localStorage.getItem("accessToken");
    console.log(token);
    
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    config.params = { ...config.params };
    return config;
  },
  (error) => Promise.reject(error)
);

// Thêm interceptor cho response nếu cần
axiosInstance.interceptors.response.use(
  (response) => response.data,
  // (error) => {
  //   // Xử lý lỗi như kiểm tra 401 Unauthorized
  //   if (error.response && error.response.status === 401) {
  //     // Thực hiện xử lý khi gặp lỗi 401
  //   }
  //   return Promise.reject(error);
  // }
);

export default axiosInstance;
