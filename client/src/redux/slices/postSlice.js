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

//post action to redirect
const resetCreateAction = createAction("post/create/reset");
const resetEditAction = createAction("post/edit/reset");
const resetDeleteAction = createAction("post/delete/reset");

//post Action
export const createPostAction = createAsyncThunk(
  "post/createPost",
  async (post, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await postRequest("/post/createPost", post);
      dispatch(resetCreateAction());
      ToastMessage.successMessage(data?.message);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

export const selectAllPostAction = createAsyncThunk(
  "post/selectAllpost",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await getRequest("/post/selectAllPost");
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

export const selectPostBySlug = createAsyncThunk(
  "post/selectPostBySlug",
  async (slug, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await getRequest(`/post/selectPostBySlug/${slug}`);
      return data[0];
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

export const updatepostAction = createAsyncThunk(
  "post/updatePost",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await updateRequest(
        `/post/updatePost/${payload.id}`,
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

export const deletepostAction = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await deleteRequest(`/post/deletePost/${id}`);

      dispatch(resetDeleteAction());
      ToastMessage.successMessage(data?.message);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  },
);

//post Slice
const postSlice = createSlice({
  name: "post",
  initialState: {},

  extraReducers: (builder) => {
    //createpost
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetCreateAction, (state, dispatch) => {
      state.isCreated = true;
    });

    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.appError = undefined;
      state.serverError = undefined;
      state.isCreated = true;
    });

    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = undefined;
      state.serverError = action.error.message;
      state.appError = action.payload.message;
    });

    //selectAllpost
    builder.addCase(selectAllPostAction.pending, (state, action) => {
      state.loading = true;
      state.postLists = [];
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(selectAllPostAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.postLists = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
      state.postUpdated = undefined;
      state.postCreated = undefined;
    });

    builder.addCase(selectAllPostAction.rejected, (state, action) => {
      state.loading = undefined;
      state.postLists = [];
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });

    //selectPostBySlug
    builder.addCase(selectPostBySlug.pending, (state, action) => {
      state.loading = true;
      state.postDetails = undefined;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(selectPostBySlug.fulfilled, (state, action) => {
      state.loading = undefined;
      state.postDetails = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });

    builder.addCase(selectPostBySlug.rejected, (state, action) => {
      state.loading = undefined;
      state.postDetails = undefined;
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });

    //updatepost
    builder.addCase(updatepostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetEditAction, (state, action) => {
      state.isEdited = true;
    });

    builder.addCase(updatepostAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.appError = undefined;
      state.serverError = undefined;
      state.isEdited = undefined;
    });

    builder.addCase(updatepostAction.rejected, (state, action) => {
      state.loading = undefined;
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });

    //deletepost
    builder.addCase(deletepostAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetDeleteAction, (state, dispatch) => {
      state.isDeleted = true;
    });

    builder.addCase(deletepostAction.fulfilled, (state, action) => {
      state.loading = undefined;
      state.appError = undefined;
      state.serverError = undefined;
      state.isDeleted = undefined;
    });

    builder.addCase(deletepostAction.rejected, (state, action) => {
      state.loading = undefined;
      state.serverError = action?.error?.message;
      state.appError = action?.payload?.message;
    });
  },
});

export default postSlice.reducer;
