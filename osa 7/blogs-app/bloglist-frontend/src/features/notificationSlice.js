import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload;
      console.log("state.message: : ", state.message);
      console.log("action: ", action.payload);
    },
  },
});

export const { setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
