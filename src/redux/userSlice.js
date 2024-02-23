import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    loginFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
