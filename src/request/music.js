import { install } from "@/plugins/axios";
//请求音乐Url
export function music(id) {
  let timestamp = new Date().getTime();
  return install({
    url: "/song/url",
    method: "post",
    params: {
      id,
      timestamp,
    },
  });
}
