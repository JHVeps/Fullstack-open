import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./features/notificationSlice";
import blogsReducer from "./features/blogsSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogsInState: blogsReducer,
    userInState: userReducer,
  },
});
