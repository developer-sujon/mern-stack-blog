//External import
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";

//Internal Import
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
