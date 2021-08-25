"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginPhone = loginPhone;
exports.loginOut = loginOut;
exports.loginStatus = loginStatus;

var _axios = require("@/plugins/axios");

//手机登录
function loginPhone(phone, password) {
  return (0, _axios.install)({
    url: "/login/cellphone",
    method: "post",
    params: {
      phone: phone,
      password: password
    }
  });
} //退出登录


function loginOut() {
  return (0, _axios.install)({
    url: "/logout"
  });
} //登录状态


function loginStatus() {
  return (0, _axios.install)({
    url: "/login/status"
  });
}