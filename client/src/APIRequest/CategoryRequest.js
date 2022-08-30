//Internal Import
import store from "../redux/store/store";
import ToastMessage from "../helper/ToastMessage";
import RestClient from "./RestClient";
import { setLoading, removeLoading } from "../redux/slices/loaderSlice";
import { setCategory, setCategoryList } from "../redux/slices/categorySlice";

class CategoryRequest {
  static async createCategoryRequest(postBody) {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.postRequest(
        "/category/createCategory",
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

  static async selectAllCategoryRequest(postBody) {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.getRequest(
        "/category/selectAllCategory",
      );

      store.dispatch(setCategoryList(data));
      store.dispatch(removeLoading());
      return true;
    } catch (err) {
      store.dispatch(removeLoading());
      const error = err?.response?.data?.message || "Something Went Wrong";
      ToastMessage.errorMessage(error);
      return false;
    }
  }

  static async selectCategoryRequest(id) {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.getRequest(
        "category/selectCategory/" + id,
      );

      store.dispatch(setCategory(data?.[0]));
      store.dispatch(removeLoading());
      return true;
    } catch (err) {
      store.dispatch(removeLoading());
      const error = err?.response?.data?.message || "Something Went Wrong";
      ToastMessage.errorMessage(error);
      return false;
    }
  }

  static async updateCategoryRequest({ id, postBody }) {
    store.dispatch(setLoading());

    try {
      const { data } = await RestClient.updateRequest(
        "category/updateCategory/" + id,
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

  static async deleteCategoryRequest(id) {
    store.dispatch(setLoading());

    try {
      const { data } = await RestClient.deleteRequest(
        "category/deleteCategory/" + id,
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
}

export default CategoryRequest;
