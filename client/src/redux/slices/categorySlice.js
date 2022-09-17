//External import
import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    CategoryList: [],
    Category: {},
  },
  reducers: {
    SetCategoryList(state, action) {
      state.CategoryList = action.payload;
    },
    SetCategory(state, action) {
      state.Category = action.payload;
    },
  },
});

export const { SetCategoryList, SetCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
