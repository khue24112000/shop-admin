import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: JSON.parse(localStorage.getItem("categories")) || [],
    isLoading: false,
    error: false,
  },
  reducers: {
    getCategoryStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getCategorySuccess: (state, action) => {
      state.category = action.payload;
      state.isLoading = false;
      localStorage.setItem("categories", JSON.stringify(state.category));
    },
    getCategoryFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    deleteCategoryStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteCategorySuccess: (state, action) => {
      state.category = state.category.filter(
        (cat) => cat._id !== action.payload
      );
      state.isLoading = false;
      localStorage.setItem("categories", JSON.stringify(state.category));
    },
    deleteCategoryFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    updateCategoryStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    updateCategorySuccess: (state) => {
      state.isLoading = false;
    },
    updateCategoryFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    addCategoryStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    addCategorySuccess: (state) => {
      state.isLoading = false;
    },
    addCategoryFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  addCategoryStart,
  addCategorySuccess,
  addCategoryFailure,
} = categorySlice.actions;
export default categorySlice.reducer;
