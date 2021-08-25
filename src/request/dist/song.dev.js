"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.songDetail = songDetail;

var _axios = require("@/plugins/axios");

//获取歌曲详情
function songDetail(ids) {
  return (0, _axios.install)({
    url: "/song/detail",
    method: "post",
    params: {
      ids: ids
    }
  });
}