import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },

  extraReducers: (builder) => {},
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
