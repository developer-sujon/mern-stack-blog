//External import
import { configureStore } from "@reduxjs/toolkit";

//Internal Import
import loaderReducer from "../slices/LoaderSlice";
import AuthSlice from "../slices/AuthSlice";
import UserSlice from "../slices/UserSlice";
import CategorySlice from "../slices/CategorySlice";
import TagSlice from "../slices/TagSlice";
import PostSlice from "../slices/PostSlice";

const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Loader: loaderReducer,
    User: UserSlice,
    Category: CategorySlice,
    Tag: TagSlice,
    Post: PostSlice,
  },
});

export default store;
