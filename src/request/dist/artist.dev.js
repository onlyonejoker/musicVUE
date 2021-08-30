"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.artistDetail = artistDetail;
exports.artistDesc = artistDesc;
exports.artistList = artistList;
exports.artistSub = artistSub;
exports.artistTop = artistTop;
exports.artistSongs = artistSongs;
exports.artistMv = artistMv;

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
} //获取歌手描述


function artistDesc(id) {
  return (0, _axios.install)({
    url: "/artist/desc",
    method: "post",
    params: {
      id: id
    }
  });
} //获取歌手列表


function artistList(limit, offset, initial, type, area) {
  return (0, _axios.install)({
    url: "/artist/list",
    method: "post",
    params: {
      limit: limit,
      offset: offset,
      initial: initial,
      type: type,
      area: area
    }
  });
} //取消/关注歌手


function artistSub(id, t) {
  return (0, _axios.install)({
    url: "/artist/sub",
    method: "post",
    params: {
      id: id,
      t: t
    }
  });
} //歌手热门50首


function artistTop(id) {
  return (0, _axios.install)({
    url: "/artist/top/song",
    method: "post",
    params: {
      id: id
    }
  });
} //歌手全部歌


function artistSongs(id, order, limit, offset) {
  return (0, _axios.install)({
    url: "/artist/songs",
    method: "post",
    params: {
      limit: limit,
      offset: offset,
      id: id,
      order: order
    }
  });
} //歌手MV


function artistMv(id) {
  return (0, _axios.install)({
    url: "/artist/mv",
    method: "post",
    params: {
      id: id
    }
  });
}