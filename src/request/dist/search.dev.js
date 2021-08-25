"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._search = _search;

var _axios = require("@/plugins/axios");

//搜索
function _search(keywords) {
  return (0, _axios.install)({
    url: "/cloudsearch",
    params: {
      keywords: keywords
    }
  });
}