//External import
import { configureStore } from "@reduxjs/toolkit";

//Internal Import
import loaderReducer from "../slices/loaderSlice";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import categoryReducer from "../slices/categorySlice";
import tagReducer from "../slices/tagSlice";
import postReducer from "../slices/postSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loaderReducer,
    profile: profileReducer,
    category: categoryReducer,
    tag: tagReducer,
    post: postReducer,
  },
});

export default store;
