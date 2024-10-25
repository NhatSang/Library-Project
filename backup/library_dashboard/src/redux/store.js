// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import export mặc định từ userSlice

export const store = configureStore({
  reducer: {
    user: userReducer, // Đặt tên reducer cho state user
  },
});

export default store;
