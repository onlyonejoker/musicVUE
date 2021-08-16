"use strict";
import axios from "axios";

let config = {
  baseURL: "http://152.136.185.210:7878/api/m5",
  timeout: 5 * 1000,
  withCredentials: true, // Check cross-site Access-Control
};

const install = axios.create(config);
install.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

install.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

const request = function (config) {
  return install(config);
};

export {
  request
};