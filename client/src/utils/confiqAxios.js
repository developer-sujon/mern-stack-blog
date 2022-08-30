//External import
import axios from "axios";

//Internal import
import store from "../redux/store/store";
import { logoutUserAction } from "../redux/slices/authSlice";

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       store.dispatch(logoutUserAction());
//     }
//     return error;
//   },
// );

export const axiosHeaders = (accessToken) => {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};
