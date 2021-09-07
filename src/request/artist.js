import { install } from "@/plugins/axios";
//获取歌手详情
export function artistDetail(id) {
  return install({
    url: "artist/detail",
    method: "post",
    params: {
      id,
    },
  });
}
//获取歌手描述
export function artistDesc(id) {
  return install({
    url: "/artist/desc",
    method: "post",
    params: {
      id,
    },
  });
}
//获取歌手列表
export function artistList(limit, offset, initial, type, area) {
  return install({
    url: "/artist/list",
    method: "post",
    params: {
      limit,
      offset,
      initial,
      type,
      area,
    },
  });
}
//取消/关注歌手
export function artistSub(id, t) {
  return install({
    url: "/artist/sub",
    method: "post",
    params: {
      id,
      t,
    },
  });
}
//歌手热门50首
export function artistTop(id) {
  return install({
    url: "/artist/top/song",
    method: "post",
    params: {
      id,
    },
  });
}
//歌手全部歌
export function artistSongs(id, order, limit, offset) {
  return install({
    url: "/artist/songs",
    method: "post",
    params: {
      limit,
      offset,
      id,
      order,
    },
  });
}
//歌手MV
export function artistMv(id) {
  return install({
    url: "/artist/mv",
    method: "post",
    params: {
      id,
    },
  });
}
//歌手专辑
export function artistAlbum(id, limit, offset) {
  return install({
    url: "/artist/album",
    method: "post",
    params: {
      id,
      limit,
      offset,
    },
  });
}
//相似歌手
export function simiArtist(id) {
  return install({
    url: "/simi/artist",
    method: "post",
    params: {
      id,
    },
  });
}
