//External import
import { createSlice } from "@reduxjs/toolkit";

//Internal import
import SessionHelper from "../../helper/SessionHelper";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    accessToken: SessionHelper.GetToken() || undefined,
  },
  reducers: {
    SetLogin: (state, action) => {
      SessionHelper.SetToken(action.payload);
      state.accessToken = SessionHelper.GetToken() || undefined;
    },
    SetLogout: (state, action) => {
      SessionHelper.RemoveToken();
      SessionHelper.RemoveUserDetails();
      state.accessToken = SessionHelper.GetToken() || undefined;
    },
  },
});

export const { SetLogin, SetLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
