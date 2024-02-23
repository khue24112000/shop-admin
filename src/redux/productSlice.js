import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: JSON.parse(localStorage.getItem("products")) || [],
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
    getProductStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    getProductFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    deleteProductStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.isLoading = false;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    deleteProductFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    updateProductStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    updateProductSuccess: (state) => {
      state.isLoading = false;
    },
    updateProductFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    addProductStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    addProductSuccess: (state) => {
      state.isLoading = false;
    },
    addProductFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  startLoading,
  endLoading,
} = productSlice.actions;
export default productSlice.reducer;
