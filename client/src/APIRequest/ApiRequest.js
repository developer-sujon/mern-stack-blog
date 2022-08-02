//external lib import
import axios from "axios";
import SessionHelper from "../helper/SessionHelper";
import ToastMessage from "../helper/ToastMessage";
import { setProfile } from "../redux/features/profileSlice";
import { setLoading, removeLoading } from "../redux/features/settingSlice";
import store from "../redux/store/store";

axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
const AxiosHeader = {
  headers: {
    Authorization: `Bearer ${SessionHelper.getToken()}`,
  },
};

class ApiRequest {
  static loginUserRequest = (email, password) => {
    store.dispatch(setLoading());
    return axios
      .post("/auth/loginUser", { email, password })
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 200) {
          SessionHelper.setToken(response.data.accessToken);
          window.location.href = "/";
          return true;
        }
      })
      .catch((error) => {
        store.dispatch(removeLoading());
        ToastMessage.errorMessage(error.response.data.message);
        return false;
      });
  };
  static registrationUserRequest = ({
    name,
    email,
    phone,
    userName,
    password,
  }) => {
    store.dispatch(setLoading());

    return axios
      .post("/auth/registrationUser", {
        name,
        email,
        phone,
        userName,
        password,
      })
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 201) {
          return true;
        }
      })
      .catch((error) => {
        store.dispatch(removeLoading());
        ToastMessage.errorMessage(error.response.data.message);
        return false;
      });
  };
  static selectUserRequest = () => {
    store.dispatch(setLoading());
    return axios
      .get("/user/selectUser", AxiosHeader)
      .then((response) => {
        console.log(response);
        store.dispatch(removeLoading());
        if (response.status === 200) {
          store.dispatch(setProfile(response.data[0]));
          return true;
        }
      })
      .catch((error) => {
        store.dispatch(removeLoading());
        if (error.response.status === 401) {
          SessionHelper.removeToken();
        }
        return false;
      });
  };
}

export default ApiRequest;
