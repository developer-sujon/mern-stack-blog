//External import
import axios from "axios";
import SessionHelper from "../helper/SessionHelper";

//Internal Import

//axios default setting
axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const axiosHeaders = {
  headers: {
    Authorization: `Bearer ${SessionHelper.getToken()}`,
  },
};

class RestClient {
  static async getRequest(url) {
    return await axios.get(url, axiosHeaders);
  }
  static async postRequest(url, postBody) {
    return await axios.post(url, postBody, axiosHeaders);
  }
  static async updateRequest(url, postBody) {
    return await axios.patch(url, postBody, axiosHeaders);
  }
  static async deleteRequest(url) {
    return await axios.delete(url, axiosHeaders);
  }
}

export default RestClient;
