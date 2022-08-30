//External import
import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tagList: [],
    tag: {},
  },
  reducers: {
    setTagList(state, action) {
      state.tagList = action.payload;
    },
    setTag(state, action) {
      state.tag = action.payload;
    },
  },
});

export const { setTagList, setTag } = tagSlice.actions;
export default tagSlice.reducer;
