import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: false,
  toastMessage: "",
  toastType: "success",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    successToast(state, action) {
      state.toastType = "success";
      state.toastMessage = action.payload || "Thành công";
      state.toast = true;
    },
    errorToast(state, action) {
      state.toastType = "error";
      state.toastMessage = action.payload || "Có lỗi xảy ra";
      state.toast = true;
    },
    closeToast(state) {
      state.toast = false;
    },
  },
});

export default toastSlice.reducer;
export const { successToast, errorToast, closeToast } = toastSlice.actions;
