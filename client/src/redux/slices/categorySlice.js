//External Import
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

//INternal Imports
import ToastMessage from "../../helper/ToastMessage";
import {
  postRequest,
  getRequest,
  updateRequest,
  deleteRequest,
} from "../../RestApi/RestClient";

//category action to redirect
const resetCreateAction = createAction("category/create/reset");
const resetEditAction = createAction("category/edit/reset");
const resetDeleteAction = createAction("category/delete/reset");

//Category Action
export const createCategoryAction = createAsyncThunk(
  "category/createCategory",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await postRequest("/category/createCategory", category);
      dispatch(resetCreateAction());
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
      const { data } = await getRequest("/category/selectAllCategory");
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
      const { data } = await getRequest(`/category/selectCategory/${id}`);
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
      const { data } = await updateRequest(
        `/category/updateCategory/${payload.id}`,
        payload.data,
      );
      dispatch(resetEditAction());
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
      const { data } = await deleteRequest(`/category/deleteCategory/${id}`);

      dispatch(resetDeleteAction());
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
    });

    builder.addCase(resetCreateAction, (state, dispatch) => {
      state.isCreated = true;
    });

    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.appError = undefined;
      state.serverError = undefined;
      state.isCreated = true;
    });

    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = undefined;
      state.serverError = action.error.message;
      state.appError = action.payload.message;
    });

    //selectAllCategory
    builder.addCase(selectAllCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.categoryList = [];
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(selectAllCategoryAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.categoryList = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
      state.categoryUpdated = undefined;
      state.categoryCreated = undefined;
    });

    builder.addCase(selectAllCategoryAction.rejected, (state, action) => {
      state.loading = undefined;
      state.categoryList = [];
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });

    //selectCategory
    builder.addCase(selectCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.category = {};
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(selectCategoryAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.category = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(selectCategoryAction.rejected, (state, action) => {
      state.loading = undefined;
      state.category = {};
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });

    //updateCategory
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetEditAction, (state, action) => {
      state.isEdited = true;
    });

    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.appError = undefined;
      state.serverError = undefined;
      state.isEdited = undefined;
    });

    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = undefined;
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });

    //deleteCategory
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetDeleteAction, (state, dispatch) => {
      state.isDeleted = true;
    });

    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.appError = undefined;
      state.serverError = undefined;
      state.isDeleted = undefined;
    });

    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = undefined;
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });
  },
});

export default categorySlice.reducer;
