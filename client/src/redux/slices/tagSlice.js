//External import
import { createSlice } from "@reduxjs/toolkit";

const TagSlice = createSlice({
  name: "Tag",
  initialState: {
    TagList: [],
    Tag: {},
  },
  reducers: {
    SetTagList(state, action) {
      state.TagList = action.payload;
    },
    SetTag(state, action) {
      state.Tag = action.payload;
    },
  },
});

export const { SetTagList, SetTag } = TagSlice.actions;
export default TagSlice.reducer;
