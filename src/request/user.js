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
//我喜欢
export function likelist(uid) {
  return install({
    url: "/likelist",
    method: "post",
    params: {
      uid,
    },
  });
}
