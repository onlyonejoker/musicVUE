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
