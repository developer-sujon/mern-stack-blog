//External Import
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ToastMessage from "../../helper/ToastMessage";
import { axiosHeaders } from "../../utils/confiqAxios";

//Category Action
export const createCategoryAction = createAsyncThunk(
  "category/createCategory",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(
        "/category/createCategory",
        category,
        axiosHeaders(getState()?.auth?.accessToken),
      );
      ToastMessage.successMessage(data?.message);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

export const selectAllCategoryAction = createAsyncThunk(
  "category/selectAllCategory",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        "/category/selectAllCategory",
        axiosHeaders(getState()?.auth?.accessToken),
      );

      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

export const selectCategoryAction = createAsyncThunk(
  "category/selectCategory",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        "/category/selectCategory/" + id,
        axiosHeaders(getState()?.auth?.accessToken),
      );

      return data[0];
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

export const updateCategoryAction = createAsyncThunk(
  "category/updateCategory",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.patch(
        "/category/updateCategory/" + payload.id,
        payload.data,
        axiosHeaders(getState()?.auth?.accessToken),
      );

      ToastMessage.successMessage(data?.message);

      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

export const deleteCategoryAction = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.delete(
        "/category/deleteCategory/" + id,
        axiosHeaders(getState()?.auth?.accessToken),
      );

      dispatch(selectAllCategoryAction());

      ToastMessage.successMessage(data?.message);

      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

//Category Slice
const categorySlice = createSlice({
  name: "category",
  initialState: {},

  extraReducers: (builder) => {
    //createCategory
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = false;
      state.serverError = false;
      state.categoryCreated = false;
    });

    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appError = false;
      state.serverError = false;
      state.categoryCreated = true;
    });

    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action.error.message;
      state.appError = action.payload.message;
      state.categoryCreated = false;
    });

    //selectAllCategory
    builder.addCase(selectAllCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.categoryList = [];
      state.appError = false;
      state.serverError = false;
    });

    builder.addCase(selectAllCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryList = action?.payload;
      state.appError = false;
      state.serverError = false;
      state.categoryUpdated = false;
      state.categoryCreated = false;
    });

    builder.addCase(selectAllCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.categoryList = [];
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });

    //selectCategory
    builder.addCase(selectCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.category = {};
      state.appError = false;
      state.serverError = false;
    });

    builder.addCase(selectCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action?.payload;
      state.appError = false;
      state.serverError = false;
    });

    builder.addCase(selectCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = {};
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });

    //updateCategory
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = false;
      state.serverError = false;
      state.categoryUpdated = false;
    });

    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appError = false;
      state.serverError = false;
      state.categoryUpdated = true;
    });

    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
      state.categoryUpdated = false;
    });

    //deleteCategory
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appError = false;
      state.serverError = false;
    });

    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.appError = false;
      state.serverError = false;
    });

    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });
  },
});

export default categorySlice.reducer;
