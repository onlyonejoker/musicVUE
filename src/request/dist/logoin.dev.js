"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginPhone = loginPhone;
exports.loginOut = loginOut;
exports.loginRefresh = loginRefresh;
exports.loginStatus = loginStatus;

var _axios = require("@/plugins/axios");

//手机登录
function loginPhone(phone, password) {
  var timestamp = new Date().getTime();
  return (0, _axios.install)({
    url: "/login/cellphone",
    method: "post",
    params: {
      phone: phone,
      password: password,
      timestamp: timestamp
    }
  });
} //退出登录


function loginOut() {
  return (0, _axios.install)({
    url: "/logout"
  });
} //刷新登录状态


function loginRefresh() {
  return (0, _axios.install)({
    url: "/login/refresh"
  });
} //登录状态


function loginStatus() {
  return (0, _axios.install)({
    url: "/login/status"
  });
}