//Internal Import
import store from "../redux/store/store";
import ToastMessage from "../helper/ToastMessage";
import RestClient from "./RestClient";
import { setLoading, removeLoading } from "../redux/slices/loaderSlice";
import { setTag, setTagList } from "../redux/slices/tagSlice";

class TagRequest {
  static async createTagRequest(postBody) {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.postRequest("/tag/createTag", postBody);
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

  static async selectAllTagRequest(postBody) {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.getRequest("/tag/selectAllTag");

      store.dispatch(setTagList(data));
      store.dispatch(removeLoading());
      return true;
    } catch (err) {
      store.dispatch(removeLoading());
      const error = err?.response?.data?.message || "Something Went Wrong";
      ToastMessage.errorMessage(error);
      return false;
    }
  }

  static async selectTagRequest(id) {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.getRequest("tag/selectTag/" + id);

      store.dispatch(setTag(data?.[0]));
      store.dispatch(removeLoading());
      return true;
    } catch (err) {
      store.dispatch(removeLoading());
      const error = err?.response?.data?.message || "Something Went Wrong";
      ToastMessage.errorMessage(error);
      return false;
    }
  }

  static async updateTagRequest({ id, postBody }) {
    store.dispatch(setLoading());

    try {
      const { data } = await RestClient.updateRequest(
        "Tag/updateTag/" + id,
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

  static async deleteTagRequest(id) {
    store.dispatch(setLoading());

    try {
      const { data } = await RestClient.deleteRequest("tag/deleteTag/" + id);
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

export default TagRequest;
