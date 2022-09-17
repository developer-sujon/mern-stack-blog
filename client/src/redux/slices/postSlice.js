//External import
import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "Post",
  initialState: {},
  reducers: {
    SetPostList(state, action) {
      state.PostList = action.payload;
    },
    SetPost(state, action) {
      state.Post = action.payload;
    },
  },
});

export const { SetPostList, SetPost } = PostSlice.actions;
export default PostSlice.reducer;
