//External import
import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
    isError: false,
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = true;
    },
    removeLoading(state, action) {
      state.isLoading = false;
    },
  },
});

export const { setLoading, removeLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
