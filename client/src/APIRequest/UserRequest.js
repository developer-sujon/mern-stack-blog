//Internal Import
import store from "../redux/store/store";
import RestClient from "./RestClient";
import {
  SetOtherUserDetails,
  SetUserDetails,
  SetUserList,
} from "../redux/slices/UserSlice";
import ToastMessage from "../helper/ToastMessage";

class UserRequest {
  static async selectUserRequest() {
    const { data } = await RestClient.getRequest("/user/selectProfile");
    if (data) {
      store.dispatch(SetUserDetails(data?.[0]));
      return true;
    }
  }
  static async selectAllUser() {
    const { data } = await RestClient.getRequest("/admin/selectAllUser");
    if (data) {
      store.dispatch(SetUserList(data));
      return true;
    }
  }
  static async sendEmailMessage(postBody) {
    const { data } = await RestClient.postRequest(
      "/email/sendEmailMessage",
      postBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async blockUser(id) {
    const { data } = await RestClient.putRequest(`/admin/blockUser/${id}`);
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async unblockUser(id) {
    const { data } = await RestClient.putRequest(`/admin/unblockUser/${id}`);
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async selectUserProfile(userName) {
    const { data } = await RestClient.getRequest(
      `/user/selectUserProfile/${userName}`,
    );
    if (data) {
      store.dispatch(SetOtherUserDetails(data?.[0]));
      return true;
    }
  }

  static async followingUser(postBody) {
    const { data } = await RestClient.updateRequest(
      `/user/followingUser`,
      postBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async unFollowingUser(postBody) {
    const { data } = await RestClient.updateRequest(
      `/user/unFollowingUser`,
      postBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }
}

export default UserRequest;
