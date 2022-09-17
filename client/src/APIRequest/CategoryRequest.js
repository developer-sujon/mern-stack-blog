//Internal Import
import store from "../redux/store/store";
import ToastMessage from "../helper/ToastMessage";
import RestClient from "./RestClient";
import { SetCategory, SetCategoryList } from "../redux/slices/CategorySlice";

class CategoryRequest {
  static async createCategoryRequest(postBody) {
    const { data } = await RestClient.postRequest(
      "/category/createCategory",
      postBody,
    );
    if (data) {
      ToastMessage.successMessage(data.message);
      return true;
    }
  }

  static async selectAllCategoryRequest() {
    const { data } = await RestClient.getRequest("/category/selectAllCategory");

    if (data) {
      store.dispatch(SetCategoryList(data));
      return true;
    }
  }

  static async selectCategoryRequest(id) {
    const { data } = await RestClient.getRequest(
      "category/selectCategory/" + id,
    );
    if (data) {
      store.dispatch(SetCategory(data?.[0]));
      return true;
    }
  }

  static async updateCategoryRequest({ id, postBody }) {
    const { data } = await RestClient.updateRequest(
      "category/updateCategory/" + id,
      postBody,
    );

    if (data) {
      ToastMessage.successMessage(data.message);
      return true;
    }
  }

  static async deleteCategoryRequest(id) {
    const { data } = await RestClient.deleteRequest(
      "category/deleteCategory/" + id,
    );

    if (data) {
      ToastMessage.successMessage(data.message);
      return true;
    }
  }
}

export default CategoryRequest;
