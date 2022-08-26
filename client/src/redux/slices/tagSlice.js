//External Import
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import ToastMessage from "../../helper/ToastMessage";

//Enternal Import
import {
  postRequest,
  getRequest,
  updateRequest,
  deleteRequest,
} from "../../RestApi/RestClient";

//Tag action to redirect
const resetCreateAction = createAction("Tag/create/reset");
const resetEditAction = createAction("Tag/edit/reset");
const resetDeleteAction = createAction("Tag/delete/reset");

//Tag Action
export const createTagAction = createAsyncThunk(
  "tag/createTag",
  async (tag, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await postRequest("/tag/createTag", tag);
      dispatch(resetCreateAction());
      ToastMessage.successMessage(data?.message);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

export const selectAllTagAction = createAsyncThunk(
  "tag/selectAllTag",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await getRequest("/tag/selectAllTag");
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

export const selectTagAction = createAsyncThunk(
  "tag/selectTag",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await getRequest(`/tag/selectTag/${id}`);
      return data[0];
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

export const updateTagAction = createAsyncThunk(
  "tag/updateTag",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await updateRequest(
        `/tag/updateTag/${payload.id}`,
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

export const deleteTagAction = createAsyncThunk(
  "tag/deleteTag",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await deleteRequest(`/tag/deleteTag/${id}`);
      dispatch(resetDeleteAction());
      ToastMessage.successMessage(data?.message);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

//Tag Slice
const tagSlice = createSlice({
  name: "tag",
  initialState: {},

  extraReducers: (builder) => {
    //createTag
    builder.addCase(createTagAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetCreateAction, (state, dispatch) => {
      state.isCreated = true;
    });

    builder.addCase(createTagAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.appError = undefined;
      state.serverError = undefined;
      state.isCreated = false;
    });

    builder.addCase(createTagAction.rejected, (state, action) => {
      state.loading = undefined;
      state.serverError = action.error.message;
      state.appError = action.payload.message;
    });

    //selectAllTag
    builder.addCase(selectAllTagAction.pending, (state, action) => {
      state.loading = true;
      state.tagList = [];
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(selectAllTagAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.tagList = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
      state.tagUpdated = undefined;
      state.tagCreated = undefined;
    });

    builder.addCase(selectAllTagAction.rejected, (state, action) => {
      state.loading = undefined;
      state.tagList = [];
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });

    //selectTag
    builder.addCase(selectTagAction.pending, (state, action) => {
      state.loading = true;
      state.tag = {};
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(selectTagAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.tag = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(selectTagAction.rejected, (state, action) => {
      state.loading = undefined;
      state.tag = {};
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });

    //updateTag
    builder.addCase(updateTagAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetEditAction, (state, action) => {
      state.isEdited = true;
    });

    builder.addCase(updateTagAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.appError = undefined;
      state.serverError = undefined;
      state.isEdited = undefined;
    });

    builder.addCase(updateTagAction.rejected, (state, action) => {
      state.loading = undefined;
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });

    //deleteTag
    builder.addCase(deleteTagAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetDeleteAction, (state, dispatch) => {
      state.isDeleted = true;
    });

    builder.addCase(deleteTagAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.appError = undefined;
      state.serverError = undefined;
      state.isDeleted = undefined;
    });

    builder.addCase(deleteTagAction.rejected, (state, action) => {
      state.loading = undefined;
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });
  },
});

export default tagSlice.reducer;
