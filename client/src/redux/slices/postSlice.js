//External import
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
    post: {},
  },
  reducers: {
    setPostList(state, action) {
      state.postList = action.payload;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
  },
});

export const { setPostList, setPost } = postSlice.actions;
export default postSlice.reducer;
