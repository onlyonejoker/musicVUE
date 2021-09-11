"use strict";
import axios from "axios";

import { Notification } from "element-ui";

let config = {
  //baseURL: "https://netease-cloud-music-api-ochre-nine.vercel.app",
  baseURL: " http://127.0.0.1:3000",
  //baseURL: " http://www.dexie.xyz:3000",
  timeout: 30 * 1000,
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
_axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Notification({
      title: "错误",
      message: "请求错误",
      type: "error",
      duration: 2000,
      showClose: false,
    });
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    Notification({
      title: "失败",
      message: "加载失败",
      type: "error",
      duration: 2000,
      showClose: false,
    });
    return Promise.reject(error);
  }
);

export function install(params) {
  return _axios(params);
}
