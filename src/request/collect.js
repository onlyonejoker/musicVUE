import { install } from "@/plugins/axios";
//获取收藏的MV
export function mvSublist() {
  return install({
    url: "/mv/sublist",
    method: "post",
  });
}
//获取收藏的专辑
export function albumSublist(limit, offset) {
  return install({
    url: "/album/sublist",
    method: "post",
    params: {
      limit,
      offset,
    },
  });
}
