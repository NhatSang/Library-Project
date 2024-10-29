import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    data: {},
  },
  reducers: {
    setBookData: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { setBookData } = bookSlice.actions;

export default bookSlice.reducer;