//External import
import { createSlice } from "@reduxjs/toolkit";

//Enternel lib imports

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: undefined,
  },
  reducers: {
    setProfile(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
