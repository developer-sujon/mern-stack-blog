//External import
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
    category: {},
  },
  reducers: {
    setCategoryList(state, action) {
      state.categoryList = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setCategoryList, setCategory } = categorySlice.actions;
export default categorySlice.reducer;
