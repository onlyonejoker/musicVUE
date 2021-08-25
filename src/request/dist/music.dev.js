"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.music = music;

var _axios = require("@/plugins/axios");

//请求音乐Url
function music(id) {
  var timestamp = new Date().getTime();
  return (0, _axios.install)({
    url: "/song/url",
    method: "post",
    params: {
      id: id,
      timestamp: timestamp
    }
  });
}