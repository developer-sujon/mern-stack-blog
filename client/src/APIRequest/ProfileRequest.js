//Internal Import
import store from "../redux/store/store";
import ToastMessage from "../helper/ToastMessage";
import RestClient from "./RestClient";
import { setLoading, removeLoading } from "../redux/slices/loaderSlice";
import { setProfile } from "../redux/slices/profileSlice";

class ProfileRequest {
  static async selectProfileRequest() {
    store.dispatch(setLoading());
    try {
      const { data } = await RestClient.getRequest("/user/selectProfile");
      store.dispatch(setProfile(data?.[0]));
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

export default ProfileRequest;
