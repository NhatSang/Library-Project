import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    banUser: (state, action) => {
      state.data.data = state.data.data.map((u) =>
        u._id == action.payload.userId
          ? {
              ...u,
              status:
                action.payload.currentStatus === "active" ? "banned" : "active",
            }
          : u
      );
    },
  },
});

export const { setUserData, banUser } = userSlice.actions;

export default userSlice.reducer;

export const fetchUser = (page, limit, keyword) => async (dispatch) => {
    const response = await axios.post(
      `http://localhost:3000/api/v1/find-user?page=${page}&limit=${limit}`,
      { keyword: keyword }
    );
  dispatch(setUserData(response.data));
};
