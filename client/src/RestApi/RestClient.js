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

export const getRequest = async (url) => {
  return await axios.get(url, axiosHeaders);
};

export const postRequest = async (url, postBody) => {
  return await axios.post(url, postBody, axiosHeaders);
};

export const updateRequest = async (url, postBody) => {
  return await axios.patch(url, postBody, axiosHeaders);
};

export const deleteRequest = async (url) => {
  return await axios.delete(url, axiosHeaders);
};
