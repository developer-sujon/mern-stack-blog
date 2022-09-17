//external import
import { createSlice } from "@reduxjs/toolkit";

const LoaderSlice = createSlice({
  name: "Loader",
  initialState: {
    IsLoading: false,
  },
  reducers: {
    SetLoading(state, action) {
      state.IsLoading = true;
    },
    RemoveLoading(state, action) {
      state.IsLoading = false;
    },
  },
});

export const { SetLoading, RemoveLoading } = LoaderSlice.actions;
export default LoaderSlice.reducer;
