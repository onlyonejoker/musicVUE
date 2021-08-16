import axios from "axios";
import Vue from "../main";
let config = {
  baseURL: "https://quhua.ipchaxun.com/api/areas",
  timeout: 5 * 1000,
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
_axios.interceptors.request.use(
  config => {
    Vue.$store.commit("loading");
    return config;
  },
  error => {
    Vue.$store.commit("loading");
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  response => {
    Vue.$store.commit("loading");
    return response.data;
  },
  error => {
    Vue.$store.commit("loading");
    return Promise.reject(error);
  }
);



export function install1(params) {
  return _axios(params);
}