//Internal Import
import store from "../redux/store/store";
import ToastMessage from "../helper/ToastMessage";
import RestClient from "./RestClient";
import { setLoading, removeLoading } from "../redux/slices/loaderSlice";
import { login } from "../redux/slices/authSlice";
import SessionHelper from "../helper/SessionHelper";

class AuthRequest {
  static async registerUserRequest(postBody) {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.postRequest(
        "/auth/registrationUser",
        postBody,
      );
      ToastMessage.successMessage(data?.message);
      store.dispatch(removeLoading());
      return true;
    } catch (err) {
      store.dispatch(removeLoading());
      const error = err?.response?.data?.message || "Something Went Wrong";
      ToastMessage.errorMessage(error);
      return false;
    }
  }

  static async loginUserRequest(postBody) {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.postRequest(
        "/auth/loginUser",
        postBody,
      );
      SessionHelper.setToken(data?.accessToken);
      SessionHelper.setUserDetails(data?.user);
      store.dispatch(login(data));
      ToastMessage.successMessage("User Login Successfull");
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

export default AuthRequest;
