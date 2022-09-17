//Internal Import
import store from "../redux/store/store";
import ToastMessage from "../helper/ToastMessage";
import RestClient from "./RestClient";
import { SetPost, SetPostList } from "../redux/slices/PostSlice";

class PostRequest {
  static async createPostRequest(postBody) {
    const { data } = await RestClient.postRequest("/post/createPost", postBody);
    if (data) {
      ToastMessage.successMessage(data.message);
      return true;
    }
  }

  static async selectAllPostRequest() {
    const { data } = await RestClient.getRequest("/post/selectAllPost");
    if (data) {
      store.dispatch(SetPostList(data));
      return true;
    }
  }

  static async selectPostRequestBySlug(slug) {
    const { data } = await RestClient.getRequest(
      "post/selectPostBySlug/" + slug,
    );
    if (data) {
      store.dispatch(SetPost(data?.[0]));
      return true;
    }
  }

  static async selectPostRequest(id) {
    const { data } = await RestClient.getRequest("post/selectPost/" + id);

    if (data) {
      store.dispatch(SetPost(data?.[0]));
      return true;
    }
  }

  static async selectPostBySlug(slug) {
    const { data } = await RestClient.getRequest(
      "post/selectPostBySlug/" + slug,
    );

    if (data) {
      store.dispatch(SetPost(data?.[0]));
      return true;
    }
  }

  static async updatePostRequest(id, postBody) {
    const { data } = await RestClient.updateRequest(
      "Post/updatePost/" + id,
      postBody,
    );
    if (data) {
      ToastMessage.successMessage(data.message);
      return true;
    }
  }

  static async deletePostRequest(id) {
    const { data } = await RestClient.deleteRequest("post/deletePost/" + id);

    if (data) {
      ToastMessage.successMessage(data.message);
      return true;
    }
  }

  static async likePostRequest(id) {
    const { data } = await RestClient.putRequest("post/likePost/" + id);

    if (data) {
      ToastMessage.successMessage(data.message);
      return true;
    }
  }

  static async disLikePostRequest(id) {
    const { data } = await RestClient.putRequest("post/disLikePost/" + id);

    if (data) {
      ToastMessage.successMessage(data.message);
      return true;
    }
  }
}

export default PostRequest;
