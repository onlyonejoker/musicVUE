"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mvSublist = mvSublist;

var _axios = require("@/plugins/axios");

//获取收藏的MV
function mvSublist() {
  return (0, _axios.install)({
    url: "/mv/sublist",
    method: "post"
  });
}