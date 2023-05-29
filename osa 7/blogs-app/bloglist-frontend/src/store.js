import { configureStore, combineReducers } from "@reduxjs/toolkit";
import notificationReducer from "./features/notificationSlice";

const rootReducer = combineReducers({
  notification: notificationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const RootState = store.getState();
