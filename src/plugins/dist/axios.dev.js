"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;

var _axios2 = _interopRequireDefault(require("axios"));

var _elementUi = require("element-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = {
  //baseURL: "https://netease-cloud-music-api-ochre-nine.vercel.app",
  baseURL: " http://127.0.0.1:3000",
  //baseURL: " http://www.dexie.xyz:3000",
  timeout: 30 * 1000,
  withCredentials: true // Check cross-site Access-Control

};

var _axios = _axios2["default"].create(config);

_axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  (0, _elementUi.Notification)({
    title: "错误",
    message: "请求错误",
    type: "error",
    duration: 2000,
    showClose: false
  });
  return Promise.reject(error);
});

_axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  (0, _elementUi.Notification)({
    title: "失败",
    message: "加载失败",
    type: "error",
    duration: 2000,
    showClose: false
  });
  return Promise.reject(error);
});

function install(params) {
  return _axios(params);
}