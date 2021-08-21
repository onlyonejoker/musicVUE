import { install } from "@/plugins/axios";
//歌单详情，图片，播放量之内的
export function playDetail(id) {
  return install({
    url: "/playlist/detail",
    method: "post",
    params: {
      id,
    },
  });
}
//创建歌单
export function playCreate(name) {
  return install({
    url: "/playlist/create",
    method: "post",
    params: {
      name,
    },
  });
}

//歌单收藏者判断歌单我是否已收藏
export function play(name) {
  return install({
    url: "/playlist/detail/dynamic",
    method: "post",
    params: {
      name,
    },
  });
}
//取消/收藏
export function subscribe(t, id) {
  return install({
    url: "/playlist/subscribe",
    method: "post",
    params: {
      t,
      id,
    },
  });
}
