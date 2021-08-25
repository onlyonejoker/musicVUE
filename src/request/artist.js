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
