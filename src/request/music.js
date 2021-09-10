import { install } from "@/plugins/axios";
//请求音乐Url
export function music(id) {
  let timestamp = new Date().getTime();
  return install({
    url: "/song/url",
    method: "post",
    params: {
      id,
      realIP: "14.30.28.102",
      timestamp,
    },
  });
}
//请求音乐歌词
export function musicLyric(id) {
  return install({
    url: "/lyric",
    method: "post",
    params: {
      id,
    },
  });
}
//请求音乐评论
export function musicComment(id, limit, offset) {
  return install({
    url: "/comment/music",
    method: "post",
    params: {
      id,
      limit,
      offset,
    },
  });
}
//请求音乐详情
export function songDetail(ids) {
  return install({
    url: "/song/detail",
    method: "post",
    params: {
      ids,
    },
  });
}
