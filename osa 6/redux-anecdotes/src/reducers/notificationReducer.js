import { createSlice } from "@reduxjs/toolkit";
import notificationService from "../services/notifications";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setMsg(state, action) {
      console.log("notification action payload: ", action.payload);
      return action.payload;
    },
    clearNotification(state, action) {
      return null;
    },
    // setNotification(state, action) {
    //   return action.payload;
    // },
  },
});

export const { setMsg, clearNotification } = notificationSlice.actions;

export const setNotification = (data, time) => {
  console.log("data in notificationReducer: ", data);
  console.log("time in notificationReducer: ", time);
  const delay = time * 1000;
  return async (dispatch) => {
    await notificationService.createNew(data);
    dispatch(setMsg(data));
    setTimeout(() => {
      dispatch(clearNotification());
    }, delay);
  };
};

export default notificationSlice.reducer;
