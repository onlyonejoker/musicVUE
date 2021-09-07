import { install } from "@/plugins/axios";
//获取专辑详情
export function album(id) {
  return install({
    url: "album",
    method: "post",
    params: {
      id,
    },
  });
}
//收藏取消专辑
export function albumSub(id, t) {
  return install({
    url: "/album/sub",
    method: "post",
    params: {
      id,
      t,
    },
  });
}
//专辑信息
export function albumDynamic(id) {
  return install({
    url: "/album/detail/dynamic",
    method: "post",
    params: {
      id,
    },
  });
}
//专辑评论
export function commentAlbum(id, limit, offset, before) {
  return install({
    url: "/comment/album",
    method: "post",
    params: {
      id,
      before,
      offset,
      limit,
    },
  });
}
