"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.artistDetail = artistDetail;

var _axios = require("@/plugins/axios");

//获取歌手详情
function artistDetail(id) {
  return (0, _axios.install)({
    url: "artist/detail",
    method: "post",
    params: {
      id: id
    }
  });
}