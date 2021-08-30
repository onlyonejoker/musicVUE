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
exports.playlistCatlist = playlistCatlist;
exports.playlistHot = playlistHot;
exports.topPlaylist = topPlaylist;
exports.playlistHighqualityTags = playlistHighqualityTags;
exports.highquality = highquality;
exports.relatedPlaylist = relatedPlaylist;

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
} //获取歌单分类


function playlistCatlist() {
  return (0, _axios.install)({
    url: "/playlist/catlist",
    method: "post"
  });
} //获取热门歌单分类


function playlistHot() {
  return (0, _axios.install)({
    url: "/playlist/hot",
    method: "post"
  });
} //获取网友精选歌单


function topPlaylist(order, cat, limit, offset) {
  return (0, _axios.install)({
    url: "/top/playlist",
    method: "post",
    params: {
      order: order,
      cat: cat,
      limit: limit,
      offset: offset
    }
  });
} //获取精品歌单分类


function playlistHighqualityTags() {
  return (0, _axios.install)({
    url: "/playlist/highquality/tags",
    method: "post"
  });
} //获取精品歌单


function highquality(cat, limit, before) {
  return (0, _axios.install)({
    url: "/top/playlist/highquality",
    method: "post",
    params: {
      cat: cat,
      limit: limit,
      before: before
    }
  });
} //获取歌单推荐


function relatedPlaylist(id) {
  return (0, _axios.install)({
    url: "/related/playlist",
    method: "post",
    params: {
      id: id
    }
  });
}