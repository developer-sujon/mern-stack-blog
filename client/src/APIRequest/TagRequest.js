//Internal Import
import store from "../redux/store/store";
import ToastMessage from "../helper/ToastMessage";
import RestClient from "./RestClient";
import { SetTag, SetTagList } from "../redux/slices/TagSlice";

class TagRequest {
  static async createTagRequest(postBody) {
    const { data } = await RestClient.postRequest("/tag/createTag", postBody);
    if (data) {
      ToastMessage.successMessage(data.message);
      return true;
    }
  }

  static async selectAllTagRequest(postBody) {
    const { data } = await RestClient.getRequest("/tag/selectAllTag");
    if (data) {
      store.dispatch(SetTagList(data));
      return true;
    }
  }

  static async selectTagRequest(id) {
    const { data } = await RestClient.getRequest("tag/selectTag/" + id);
    if (data) {
      store.dispatch(SetTag(data?.[0]));
      return true;
    }
  }

  static async updateTagRequest({ id, postBody }) {
    const { data } = await RestClient.updateRequest(
      "Tag/updateTag/" + id,
      postBody,
    );
    if (data) {
      ToastMessage.successMessage(data.message);
      return true;
    }
  }

  static async deleteTagRequest(id) {
    const { data } = await RestClient.deleteRequest("tag/deleteTag/" + id);
    if (data) {
      ToastMessage.successMessage(data.message);
      return true;
    }
  }
}

export default TagRequest;
