"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playDetail = playDetail;
exports.playCreate = playCreate;
exports.play = play;
exports.subscribe = subscribe;
exports.playTracks = playTracks;
exports.playDelete = playDelete;
exports.playTags = playTags;

var _axios = require("@/plugins/axios");

//歌单详情，图片，播放量之内的
function playDetail(id) {
  return (0, _axios.install)({
    url: "/playlist/detail",
    method: "post",
    params: {
      id: id
    }
  });
} //创建歌单


function playCreate(name) {
  return (0, _axios.install)({
    url: "/playlist/create",
    method: "post",
    params: {
      name: name
    }
  });
} //歌单收藏者判断歌单我是否已收藏


function play(name) {
  return (0, _axios.install)({
    url: "/playlist/detail/dynamic",
    method: "post",
    params: {
      name: name
    }
  });
} //取消/收藏


function subscribe(t, id) {
  return (0, _axios.install)({
    url: "/playlist/subscribe",
    method: "post",
    params: {
      t: t,
      id: id
    }
  });
} //添加/删除歌曲到歌单


function playTracks(op, pid, tracks) {
  return (0, _axios.install)({
    url: "/playlist/tracks",
    method: "post",
    params: {
      op: op,
      pid: pid,
      tracks: tracks
    }
  });
} //删除歌单


function playDelete(id) {
  return (0, _axios.install)({
    url: "/playlist/delete",
    method: "post",
    params: {
      id: id
    }
  });
} //获取歌单标签列表


function playTags() {
  return (0, _axios.install)({
    url: "/playlist/highquality/tags",
    method: "post"
  });
}