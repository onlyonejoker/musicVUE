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
export function playCreate(name, privacy, type) {
  return install({
    url: "/playlist/create",
    method: "post",
    params: {
      name,
      privacy,
      type,
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
//添加/删除歌曲到歌单
export function playTracks(op, pid, tracks) {
  return install({
    url: "/playlist/tracks",
    method: "post",
    params: {
      op,
      pid,
      tracks,
    },
  });
}
//删除歌单
export function playDelete(id) {
  return install({
    url: "/playlist/delete",
    method: "post",
    params: {
      id,
    },
  });
}
//获取歌单标签列表
export function playTags() {
  return install({
    url: "/playlist/highquality/tags",
    method: "post",
  });
}
//获取歌单分类
export function playlistCatlist() {
  return install({
    url: "/playlist/catlist",
    method: "post",
  });
}
//获取热门歌单分类
export function playlistHot() {
  return install({
    url: "/playlist/hot",
    method: "post",
  });
}
//获取网友精选歌单
export function topPlaylist(order, cat, limit, offset) {
  return install({
    url: "/top/playlist",
    method: "post",
    params: {
      order,
      cat,
      limit,
      offset,
    },
  });
}
//获取精品歌单分类
export function playlistHighqualityTags() {
  return install({
    url: "/playlist/highquality/tags",
    method: "post",
  });
}
//获取精品歌单
export function highquality(cat, limit, before) {
  return install({
    url: "/top/playlist/highquality",
    method: "post",
    params: {
      cat,
      limit,
      before,
    },
  });
}
//获取歌单推荐
export function relatedPlaylist(id) {
  return install({
    url: "/related/playlist",
    method: "post",
    params: {
      id,
    },
  });
}
//歌单评论
export function commentLlaylist(id, limit, offset, before) {
  return install({
    url: "/comment/playlist",
    method: "post",
    params: {
      id,
      before,
      offset,
      limit,
    },
  });
}
//添加视频到视频歌单
export function playlistTrackAdd(pid, ids) {
  return install({
    url: "/playlist/track/add",
    method: "post",
    params: {
      pid,
      ids,
    },
  });
}
//获取歌曲详情
export function songDetail(ids) {
  return install({
    url: "/song/detail",
    method: "post",
    params: {
      ids,
    },
  });
}
