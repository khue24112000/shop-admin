import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: JSON.parse(localStorage.getItem("orders")) || [],
    isLoading: false,
    error: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    getOrderStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getOrderSuccess: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    getOrderFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    deleteOrderStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteOrderSuccess: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
      state.isLoading = false;
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    deleteOrderFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    updateOrderStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    updateOrderSuccess: (state) => {
      state.isLoading = false;
    },
    updateOrderFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,

  startLoading,
  endLoading,
} = orderSlice.actions;
export default orderSlice.reducer;
