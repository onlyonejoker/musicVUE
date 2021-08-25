import { install } from "@/plugins/axios";
//搜索
export function _search(keywords) {
  return install({
    url: "/cloudsearch",
    params: {
      keywords,
    },
  });
}
