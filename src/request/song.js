import { install } from "@/plugins/axios";
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
