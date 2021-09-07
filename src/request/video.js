import { install } from "@/plugins/axios";

//视频相关
//获取视频标签
export function videoList() {
  return install({
    url: "/video/group/list",
    method: "post",
  });
}
//获取视频分类
export function videoCategory() {
  return install({
    url: "/video/category/list",
    method: "post",
  });
}
//获取全部视频分类
export function videoAll(offset) {
  return install({
    url: "/video/timeline/all",
    method: "post",
    params: {
      offset,
    },
  });
}
//获取推荐视频
export function videoRecommend(offset) {
  return install({
    url: "/video/timeline/recommend",
    method: "post",
    params: {
      offset,
    },
  });
}
//获取视频
export function videoGroup(id, offset) {
  return install({
    url: "/video/group",
    method: "post",
    params: {
      id,
      offset,
    },
  });
}

//MV相关
//获取相似MV
export function simiMv(mvid) {
  return install({
    url: "/simi/mv",
    method: "post",
    params: {
      mvid,
    },
  });
}
//获取全部MV***
export function mvAll(area, type, order, limit, offset) {
  return install({
    url: "/mv/all",
    method: "post",
    params: {
      area,
      type,
      order,
      limit,
      offset,
    },
  });
}
//获取最新MV***
export function mvFirst(area, limit, offset) {
  return install({
    url: "/mv/all",
    method: "post",
    params: {
      area,
      limit,
      offset,
    },
  });
}
//获取网易出品MV***
export function mvExclusiveRcmd(limit, area, offset) {
  return install({
    url: "/mv/exclusive/rcmd",
    method: "post",
    params: {
      limit,
      area,
      offset,
    },
  });
}
//获取推荐MV***
export function personalizedMv() {
  return install({
    url: "/personalized/mv",
    method: "post",
  });
}
//获取推荐排行***
export function topMv(limit, area, offset) {
  return install({
    url: "/top/mv",
    method: "post",
    params: {
      limit,
      area,
      offset,
    },
  });
}

//获取视频详情相关
//获取相关视频
export function relatedAllvideo(id) {
  return install({
    url: "/related/allvideo",
    method: "post",
    params: {
      id,
    },
  });
}
//获取视频详情
export function videoDetail(id) {
  return install({
    url: "/video/detail",
    method: "post",
    params: {
      id,
    },
  });
}
//获取视频数据
export function videoDetailInfo(vid) {
  return install({
    url: "/video/detail/info",
    method: "post",
    params: {
      vid,
    },
  });
}
//获取视频地址
export function videoUrl(id) {
  return install({
    url: "/video/url",
    method: "post",
    params: {
      id,
    },
  });
}
//收藏视频
export function videoSub(id, t) {
  return install({
    url: "/video/sub",
    method: "post",
    params: {
      id,
      t,
    },
  });
}
//收藏MV
export function mvSub(id, t) {
  return install({
    url: "/mv/sub",
    method: "post",
    params: {
      id,
      t,
    },
  });
}
//收藏视频到视频歌单歌单
export function videoSubPlay(pid, ids) {
  return install({
    url: "/playlist/track/add",
    method: "post",
    params: {
      pid,
      ids,
    },
  });
}
//获取MV详情
export function mvDetail(mvid) {
  return install({
    url: "/mv/detail",
    method: "post",
    params: {
      mvid,
    },
  });
}
//获取MV数据
export function mvDetailInfo(mvid) {
  return install({
    url: "/mv/detail/info",
    method: "post",
    params: {
      mvid,
    },
  });
}
//获取MV地址
export function mvUrl(id, r) {
  return install({
    url: "/mv/url",
    method: "post",
    params: {
      id,
      r,
    },
  });
}

//下载
export function downLoad(id, r) {
  return install({
    url: "/mv/url",
    method: "post",
    responseType: "blob",
    params: {
      id,
      r,
    },
  });
}
