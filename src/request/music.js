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
//请求音乐Url
export function musicLyric(id) {
  return install({
    url: "/lyric",
    method: "post",
    params: {
      id,
    },
  });
}
