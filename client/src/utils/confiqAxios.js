//External import
import axios from "axios";

//Internal import
import SessionHelper from "../helper/SessionHelper";
axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export const axiosHeaders = () => {
  return { headers: { Authorization: `Bearer ${SessionHelper.getToken()}` } };
};
