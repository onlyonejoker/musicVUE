"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detail = detail;
exports.account = account;
exports.subcount = subcount;
exports.level = level;
exports.update = update;
exports.upload = upload;
exports.playlist = playlist;
exports.likelist = likelist;
exports.like = like;
exports.follow = follow;
exports.playlistUpdate = playlistUpdate;
exports.playlistUpdateImg = playlistUpdateImg;
exports.followList = followList;
exports.followedsList = followedsList;
exports.artistList = artistList;
exports.userHistory = userHistory;
exports.userDj = userDj;
exports.userEvent = userEvent;
exports.userEventForwards = userEventForwards;
exports.userEventDel = userEventDel;
exports.resource = resource;
exports.commentEvent = commentEvent;
exports.history = history;

var _axios = require("@/plugins/axios");

//获取用户信息
function detail(uid) {
  return (0, _axios.install)({
    url: "/user/detail",
    method: "post",
    params: {
      uid: uid
    }
  });
} //获取账号信息


function account() {
  return (0, _axios.install)({
    url: "/user/account",
    method: "post"
  });
} //获取用户信息 , 歌单，收藏，mv, dj 数量


function subcount() {
  return (0, _axios.install)({
    url: "/user/subcount",
    method: "post"
  });
} //用户等级level


function level() {
  return (0, _axios.install)({
    url: "/user/level",
    method: "post"
  });
} //更新用户信息


function update() {
  return (0, _axios.install)({
    url: "/user/update",
    method: "post",
    params: {
      nickname: arguments[0],
      signature: arguments[1],
      gender: arguments[2],
      birthday: arguments[3],
      province: 440000,
      city: 440300
    }
  });
} //更新头像


function upload(file) {
  return (0, _axios.install)({
    url: "/avatar/upload",
    method: "post",
    timeout: 60 * 1000,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: file
  });
} //获取用户歌单


function playlist(uid, limit, offset) {
  return (0, _axios.install)({
    url: "/user/playlist",
    method: "post",
    params: {
      uid: uid,
      limit: limit,
      offset: offset
    }
  });
} //喜欢列表


function likelist(uid) {
  return (0, _axios.install)({
    url: "/likelist",
    method: "post",
    params: {
      uid: uid
    }
  });
} //我喜欢


function like(id, like) {
  return (0, _axios.install)({
    url: "/like",
    method: "get",
    params: {
      id: id,
      like: like
    }
  });
} //关注/取消关注


function follow(id, t) {
  return (0, _axios.install)({
    url: "/follow",
    method: "post",
    params: {
      id: id,
      t: t
    }
  });
} //更新用户歌单


function playlistUpdate(id, name, desc, tags) {
  return (0, _axios.install)({
    url: "/playlist/update",
    method: "post",
    params: {
      id: id,
      name: name,
      desc: desc,
      tags: tags
    }
  });
} //更新歌单封面


function playlistUpdateImg(file, id) {
  return (0, _axios.install)({
    url: "/avatar/upload",
    method: "post",
    timeout: 60 * 1000,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: file,
    params: {
      id: id,
      param: "168y168"
    }
  });
} //获取用户关注列表


function followList(uid, limit, offset) {
  return (0, _axios.install)({
    url: "/user/follows",
    method: "post",
    params: {
      uid: uid,
      limit: limit,
      offset: offset
    }
  });
} //获取用户粉丝列表


function followedsList(uid, limit, offset) {
  return (0, _axios.install)({
    url: "/user/followeds",
    method: "post",
    params: {
      uid: uid,
      limit: limit,
      offset: offset
    }
  });
} //获取用户歌手列表


function artistList() {
  return (0, _axios.install)({
    url: "/artist/sublist",
    method: "post"
  });
} //获取用户动态(历史评论)


function userHistory(uid, limit, time) {
  return (0, _axios.install)({
    url: "/user/comment/history",
    method: "post",
    params: {
      uid: uid,
      time: time,
      limit: limit
    }
  });
} //获取用户电台


function userDj(uid) {
  return (0, _axios.install)({
    url: "/user/dj",
    method: "post",
    params: {
      uid: uid
    }
  });
} //获取用户动态(动态)


function userEvent(uid, limit, lasttime) {
  return (0, _axios.install)({
    url: "/user/event",
    method: "post",
    params: {
      uid: uid,
      lasttime: lasttime,
      limit: limit
    }
  });
} //转发用户动态(动态)


function userEventForwards(uid, evId, forwards) {
  return (0, _axios.install)({
    url: "/event/forward",
    method: "post",
    params: {
      uid: uid,
      evId: evId,
      forwards: forwards
    }
  });
} //删除用户动态(动态)


function userEventDel(evId) {
  return (0, _axios.install)({
    url: "/event/del",
    method: "post",
    params: {
      evId: evId
    }
  });
} //分享


function resource(id, type, msg) {
  return (0, _axios.install)({
    url: "/share/resource",
    method: "post",
    params: {
      id: id,
      type: type,
      msg: msg
    }
  });
} //获取动态评论


function commentEvent(threadId) {
  return (0, _axios.install)({
    url: "/comment/event",
    method: "post",
    params: {
      threadId: threadId
    }
  });
} //获取用户历史记录


function history(uid, type) {
  return (0, _axios.install)({
    url: "/user/record",
    method: "post",
    params: {
      uid: uid,
      type: type
    }
  });
}