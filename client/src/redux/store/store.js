//External import
import { configureStore } from "@reduxjs/toolkit";

//Internal Import
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import categoryReducer from "../slices/categorySlice";
import tagReducer from "../slices/tagSlice";
import postReducer from "../slices/postSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    category: categoryReducer,
    tag: tagReducer,
    post: postReducer,
  },
});

export default store;
