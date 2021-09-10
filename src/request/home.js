import { install } from "@/plugins/axios";
//获取首页轮播图
export function banner(type) {
  return install({
    url: "/banner",
    method: "post",
    params: {
      type,
    },
  });
}
//获取首页推荐歌单
export function personalized() {
  return install({
    url: "/personalized",
  });
}
//获取首页推荐MV
export function personalizedMv() {
  return install({
    url: "/personalized/mv",
  });
}
//获取首页推荐新歌
export function personalizedNewsong() {
  return install({
    url: "/personalized/newsong",
  });
}
//获取首页推荐电台
export function personalizedDjprogram() {
  return install({
    url: "/personalized/djprogram",
  });
}
//获取首页推荐节目
export function programRecommend() {
  return install({
    url: "/program/recommend",
  });
}
//获取首页独家放送
export function personalizedPrivatecontent() {
  return install({
    url: "/personalized/privatecontent",
  });
}
//获取首页排行
export function toplist() {
  return install({
    url: "/toplist",
  });
}
