////External import
import { createSlice } from "@reduxjs/toolkit";

//Enternel lib imports
import SessionHelper from "../../helper/SessionHelper";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: SessionHelper.getUserDetails(),
    accessToken: SessionHelper.getToken(),
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logOut(state, action) {
      state.user = undefined;
      state.accessToken = undefined;
      SessionHelper.removeToken();
      SessionHelper.removeUserDetails();
    },
  },
});

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;
