import { install } from "@/plugins/axios";
//搜索
export function _search(keywords, limit, offset, type) {
  return install({
    url: "/cloudsearch",
    params: {
      keywords,
      limit,
      offset,
      type,
    },
  });
}
//默认搜索关键字
export function searchDefault() {
  return install({
    url: "/search/default",
  });
}
//默认热搜
export function searchHot() {
  return install({
    url: "/search/hot/detail",
  });
}
//搜索建议
export function searchSuggest(keywords) {
  return install({
    url: "/search/suggest",
    params: {
      keywords,
    },
  });
}
