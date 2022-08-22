//external import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SessionHelper from "../../helper/SessionHelper";
import axios from "axios";

//axios headers
const headers = {
  headers: { Authorization: `Bearer ${SessionHelper.getToken()}` },
};

//profile action
export const profileAction = createAsyncThunk(
  "/user/selectUser",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get("/user/selectUser", headers);
      return data;
    } catch (e) {
      rejectWithValue(e?.response?.data);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(profileAction.pending, (state, action) => {
      state.loading = true;
      state.user = null;
      state.serverError = false;
      state.appError = false;
    });
    builder.addCase(profileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.serverError = false;
      state.appError = false;
    });
    builder.addCase(profileAction.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.serverError = action.error.message;
      state.appError = action.payload.message;
    });
  },
});

export default profileSlice.reducer;
