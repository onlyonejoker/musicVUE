"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.music = music;
exports.musicLyric = musicLyric;
exports.musicComment = musicComment;
exports.songDetail = songDetail;

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
} //请求音乐歌词


function musicLyric(id) {
  return (0, _axios.install)({
    url: "/lyric",
    method: "post",
    params: {
      id: id
    }
  });
} //请求音乐评论


function musicComment(id, limit, offset) {
  return (0, _axios.install)({
    url: "/comment/music",
    method: "post",
    params: {
      id: id,
      limit: limit,
      offset: offset
    }
  });
} //请求音乐详情


function songDetail(ids) {
  return (0, _axios.install)({
    url: "/song/detail",
    method: "post",
    params: {
      ids: ids
    }
  });
}