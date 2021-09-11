import { install } from "@/plugins/axios";
//电台分类
export function djCatelist() {
  return install({
    url: "/dj/catelist",
  });
}
//电台分类详情
export function djRecommendType(type, limit, offset) {
  return install({
    url: "/dj/recommend/type",
    params: {
      type,
      limit,
      offset,
    },
  });
}
//电台详情
export function djDetail(rid) {
  return install({
    url: "/dj/detail",
    params: {
      rid,
    },
  });
}
//电台节目
export function djProgram(rid, limit, offset) {
  return install({
    url: "/dj/program",
    params: {
      rid,
      limit,
      offset,
    },
  });
}
