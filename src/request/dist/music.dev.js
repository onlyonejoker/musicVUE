"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.music = music;
exports.musicLyric = musicLyric;

var _axios = require("@/plugins/axios");

//请求音乐Url
function music(id) {
  var timestamp = new Date().getTime();
  return (0, _axios.install)({
    url: "/song/url",
    method: "post",
    params: {
      id: id,
      realIP: "14.30.28.102",
      timestamp: timestamp
    }
  });
} //请求音乐Url


function musicLyric(id) {
  return (0, _axios.install)({
    url: "/lyric",
    method: "post",
    params: {
      id: id
    }
  });
}