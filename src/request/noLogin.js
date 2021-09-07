import { install } from "@/plugins/axios";
//推荐歌单
export function personalized(limit) {
  return install({
    url: "/personalized",
    method: "post",
    params: {
      limit,
    },
  });
}
