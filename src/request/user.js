import {
  installApi
} from "@/plugins/axios";

//获取用户信息
export function detail(uid) {
  return installApi({
    url: "/user/detail",
    method: "post",
    params: {
      uid
    }
  })
}
//获取账号信息
export function account() {
  return installApi({
    url: "/user/account",
    method: "post",
  })
}
//获取用户信息 , 歌单，收藏，mv, dj 数量
export function subcount() {
  return installApi({
    url: "/user/subcount",
    method: "post",
  })
}
//用户等级level
export function level() {
  return installApi({
    url: "/user/level",
    method: "post",
  })
}

//更新用户信息
export function update() {
  return installApi({
    url: "/user/update",
    method: "post",
    params: {
      nickname: arguments[0],
      signature: arguments[1],
      gender: arguments[2],
      birthday: arguments[3],
      province: 440000,
      city: 440300,
    }
  })
}
//更新头像
export function upload(file) {
  let param = new FormData() // 创建form对象
  param.append('file', file) // 通过append向form对象添加数据
  console.log(param.get('file'))
  return installApi({
    url: "/avatar/upload",
    method: "post",
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}