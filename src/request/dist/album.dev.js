"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.album = album;
exports.albumSub = albumSub;
exports.albumDynamic = albumDynamic;
exports.commentAlbum = commentAlbum;

var _axios = require("@/plugins/axios");

//获取专辑详情
function album(id) {
  return (0, _axios.install)({
    url: "album",
    method: "post",
    params: {
      id: id
    }
  });
} //收藏取消专辑


function albumSub(id, t) {
  return (0, _axios.install)({
    url: "/album/sub",
    method: "post",
    params: {
      id: id,
      t: t
    }
  });
} //专辑信息


function albumDynamic(id) {
  return (0, _axios.install)({
    url: "/album/detail/dynamic",
    method: "post",
    params: {
      id: id
    }
  });
} //专辑评论


function commentAlbum(id, limit, offset, before) {
  return (0, _axios.install)({
    url: "/comment/album",
    method: "post",
    params: {
      id: id,
      before: before,
      offset: offset,
      limit: limit
    }
  });
}