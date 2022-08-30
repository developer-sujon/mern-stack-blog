//Internal Import
import store from "../redux/store/store";
import ToastMessage from "../helper/ToastMessage";
import RestClient from "./RestClient";
import { setLoading, removeLoading } from "../redux/slices/loaderSlice";
import { setPost, setPostList } from "../redux/slices/postSlice";

class PostRequest {
  static async createPostRequest(postBody) {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.postRequest(
        "/post/createPost",
        postBody,
      );
      ToastMessage.successMessage(data.message);
      store.dispatch(removeLoading());
      return true;
    } catch (err) {
      store.dispatch(removeLoading());
      const error = err?.response?.data?.message || "Something Went Wrong";
      ToastMessage.errorMessage(error);
      return false;
    }
  }

  static async selectAllPostRequest() {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.getRequest("/post/selectAllPost");

      store.dispatch(setPostList(data));
      store.dispatch(removeLoading());
      return true;
    } catch (err) {
      store.dispatch(removeLoading());
      const error = err?.response?.data?.message || "Something Went Wrong";
      ToastMessage.errorMessage(error);
      return false;
    }
  }

  static async selectPostRequest(id) {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.getRequest(
        "post/selectPostBySlug/" + id,
      );

      store.dispatch(setPost(data?.[0]));
      store.dispatch(removeLoading());
      return true;
    } catch (err) {
      store.dispatch(removeLoading());
      const error = err?.response?.data?.message || "Something Went Wrong";
      ToastMessage.errorMessage(error);
      return false;
    }
  }

  static async updatePostRequest({ id, postBody }) {
    store.dispatch(setLoading());

    try {
      const { data } = await RestClient.updateRequest(
        "Post/updatePost/" + id,
        postBody,
      );
      ToastMessage.successMessage(data.message);
      store.dispatch(removeLoading());

      return true;
    } catch (err) {
      store.dispatch(removeLoading());
      const error = err?.response?.data?.message || "Something Went Wrong";
      ToastMessage.errorMessage(error);
      return false;
    }
  }

  static async deletePostRequest(id) {
    store.dispatch(setLoading());

    try {
      const { data } = await RestClient.deleteRequest("post/deletePost/" + id);
      ToastMessage.successMessage(data.message);
      store.dispatch(removeLoading());
      return true;
    } catch (err) {
      store.dispatch(removeLoading());
      const error = err?.response?.data?.message || "Something Went Wrong";
      ToastMessage.errorMessage(error);
      return false;
    }
  }
}

export default PostRequest;
