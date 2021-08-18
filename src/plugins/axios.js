"use strict";
import axios from "axios";

import {
  Notification
} from 'element-ui';

let config = {
  baseURL: "https://netease-cloud-music-api-ochre-nine.vercel.app",
  timeout: 5 * 1000,
  withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
_axios.interceptors.request.use(
  config => {
    Notification({
      title: "消息",
      message: "正在加载",
      type: "info",
      duration: 2000,
      showClose: false
    })
    return config;
  },
  error => {
    Notification({
      title: "错误",
      message: "请求错误",
      type: "error",
      duration: 2000,
      showClose: false
    })
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  response => {
    Notification({
      title: "成功",
      message: "加载成功",
      type: "success",
      duration: 2000,
      showClose: false
    })
    return response.data;
  },
  error => {
    Notification({
      title: "失败",
      message: "加载失败",
      type: "error",
      duration: 2000,
      showClose: false
    })
    return Promise.reject(error);
  }
);



export function install(params) {
  return _axios(params);
}