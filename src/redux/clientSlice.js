import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    users: JSON.parse(localStorage.getItem("users")) || [],
    isLoading: false,
    error: false,
  },
  reducers: {
    getUserStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    getUserFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    deleteUserStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
      state.isLoading = false;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    deleteUserFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    updateUserStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    updateUserSuccess: (state) => {
      state.isLoading = false;
    },
    updateUserFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    addUserStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.users = [...state.users, action.payload];
      state.isLoading = false;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    addUserFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} = clientSlice.actions;
export default clientSlice.reducer;
