import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./features/notificationSlice";
import blogsReducer from "./features/blogsSlice";
import loginReducer from "./features/loginSlice";
import usersReducer from "./features/usersSlice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogsInState: blogsReducer,
    userInState: loginReducer,
    usersInState: usersReducer,
  },
});
