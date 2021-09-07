"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.personalized = personalized;

var _axios = require("@/plugins/axios");

//推荐歌单
function personalized(limit) {
  return (0, _axios.install)({
    url: "/personalized",
    method: "post",
    params: {
      limit: limit
    }
  });
}