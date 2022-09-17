//external import
import { createSlice } from "@reduxjs/toolkit";
import SessionHelper from "../../helper/SessionHelper";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    UserDetails: SessionHelper.GetUserDetails() || undefined,
  },
  reducers: {
    SetUserDetails(state, action) {
      SessionHelper.SetUserDetails(action.payload);
      state.UserDetails = SessionHelper.GetUserDetails() || undefined;
    },
    RemoveUserDetails(state, action) {
      SessionHelper.RemoveUserDetails();
      state.UserDetails = SessionHelper.GetUserDetails() || undefined;
    },
    SetUserList(state, action) {
      state.UserList = action.payload;
    },
    SetOtherUserDetails(state, action) {
      state.OtherUserDetails = action.payload;
    },
  },
});

export const {
  SetUserDetails,
  RemoveUserDetails,
  SetUserList,
  SetOtherUserDetails,
} = UserSlice.actions;
export default UserSlice.reducer;
