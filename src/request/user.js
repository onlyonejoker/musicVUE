import { install } from "@/plugins/axios";

//获取用户信息
export function detail(uid) {
  return install({
    url: "/user/detail",
    method: "post",
    params: {
      uid,
    },
  });
}
//获取账号信息
export function account() {
  return install({
    url: "/user/account",
    method: "post",
  });
}
//获取用户信息 , 歌单，收藏，mv, dj 数量
export function subcount() {
  return install({
    url: "/user/subcount",
    method: "post",
  });
}
//用户等级level
export function level() {
  return install({
    url: "/user/level",
    method: "post",
  });
}
//更新用户信息
export function update() {
  return install({
    url: "/user/update",
    method: "post",
    params: {
      nickname: arguments[0],
      signature: arguments[1],
      gender: arguments[2],
      birthday: arguments[3],
      province: 440000,
      city: 440300,
    },
  });
}
//更新头像
export function upload(file) {
  return install({
    url: "/avatar/upload",
    method: "post",
    timeout: 60 * 1000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: file,
  });
}
//获取用户歌单
export function playlist(uid, limit, offset) {
  return install({
    url: "/user/playlist",
    method: "post",
    params: {
      uid,
      limit,
      offset,
    },
  });
}
//喜欢列表
export function likelist(uid) {
  return install({
    url: "/likelist",
    method: "post",
    params: {
      uid,
    },
  });
}
//我喜欢
export function like(id, like) {
  return install({
    url: "/like",
    method: "get",
    params: {
      id,
      like,
    },
  });
}
//关注/取消关注
export function follow(id, t) {
  return install({
    url: "/follow",
    method: "post",
    params: {
      id,
      t,
    },
  });
}
//更新用户歌单
export function playlistUpdate(id, name, desc, tags) {
  return install({
    url: "/playlist/update",
    method: "post",
    params: {
      id,
      name,
      desc,
      tags,
    },
  });
}
//更新歌单封面
export function playlistUpdateImg(file, id) {
  return install({
    url: "/avatar/upload",
    method: "post",
    timeout: 60 * 1000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: file,
    params: { id, param: "168y168" },
  });
}

//获取用户关注列表
export function followList(uid, limit, offset) {
  return install({
    url: "/user/follows",
    method: "post",
    params: {
      uid,
      limit,
      offset,
    },
  });
}
//获取用户粉丝列表
export function followedsList(uid, limit, offset) {
  return install({
    url: "/user/followeds",
    method: "post",
    params: {
      uid,
      limit,
      offset,
    },
  });
}
//获取用户歌手列表
export function artistList() {
  return install({
    url: "/artist/sublist",
    method: "post",
  });
}
//获取用户动态(历史评论)
export function userHistory(uid, limit, time) {
  return install({
    url: "/user/comment/history",
    method: "post",
    params: { uid, time, limit },
  });
}
//获取用户电台
export function userDj(uid) {
  return install({
    url: "/user/dj",
    method: "post",
    params: { uid },
  });
}
//获取用户动态(动态)
export function userEvent(uid, limit, lasttime) {
  return install({
    url: "/user/event",
    method: "post",
    params: { uid, lasttime, limit },
  });
}
//转发用户动态(动态)
export function userEventForwards(uid, evId, forwards) {
  return install({
    url: "/event/forward",
    method: "post",
    params: { uid, evId, forwards },
  });
}
//删除用户动态(动态)
export function userEventDel(evId) {
  return install({
    url: "/event/del",
    method: "post",
    params: { evId },
  });
}
//分享
export function resource(id, type, msg) {
  return install({
    url: "/share/resource",
    method: "post",
    params: { id, type, msg },
  });
}
//获取动态评论
export function commentEvent(threadId) {
  return install({
    url: "/comment/event",
    method: "post",
    params: { threadId },
  });
}
//获取用户历史记录
export function history(uid, type) {
  return install({
    url: "/user/record",
    method: "post",
    params: { uid, type },
  });
}
