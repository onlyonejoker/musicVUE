"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoList = videoList;
exports.videoCategory = videoCategory;
exports.videoAll = videoAll;
exports.videoRecommend = videoRecommend;
exports.videoGroup = videoGroup;
exports.simiMv = simiMv;
exports.mvAll = mvAll;
exports.mvFirst = mvFirst;
exports.mvExclusiveRcmd = mvExclusiveRcmd;
exports.personalizedMv = personalizedMv;
exports.topMv = topMv;
exports.relatedAllvideo = relatedAllvideo;
exports.videoDetail = videoDetail;
exports.videoDetailInfo = videoDetailInfo;
exports.videoUrl = videoUrl;
exports.videoSub = videoSub;
exports.mvSub = mvSub;
exports.videoSubPlay = videoSubPlay;
exports.mvDetail = mvDetail;
exports.mvDetailInfo = mvDetailInfo;
exports.mvUrl = mvUrl;
exports.downLoad = downLoad;

var _axios = require("@/plugins/axios");

//视频相关
//获取视频标签
function videoList() {
  return (0, _axios.install)({
    url: "/video/group/list",
    method: "post"
  });
} //获取视频分类


function videoCategory() {
  return (0, _axios.install)({
    url: "/video/category/list",
    method: "post"
  });
} //获取全部视频分类


function videoAll(offset) {
  return (0, _axios.install)({
    url: "/video/timeline/all",
    method: "post",
    params: {
      offset: offset
    }
  });
} //获取推荐视频


function videoRecommend(offset) {
  return (0, _axios.install)({
    url: "/video/timeline/recommend",
    method: "post",
    params: {
      offset: offset
    }
  });
} //获取视频


function videoGroup(id, offset) {
  return (0, _axios.install)({
    url: "/video/group",
    method: "post",
    params: {
      id: id,
      offset: offset
    }
  });
} //MV相关
//获取相似MV


function simiMv(mvid) {
  return (0, _axios.install)({
    url: "/simi/mv",
    method: "post",
    params: {
      mvid: mvid
    }
  });
} //获取全部MV***


function mvAll(area, type, order, limit, offset) {
  return (0, _axios.install)({
    url: "/mv/all",
    method: "post",
    params: {
      area: area,
      type: type,
      order: order,
      limit: limit,
      offset: offset
    }
  });
} //获取最新MV***


function mvFirst(area, limit, offset) {
  return (0, _axios.install)({
    url: "/mv/all",
    method: "post",
    params: {
      area: area,
      limit: limit,
      offset: offset
    }
  });
} //获取网易出品MV***


function mvExclusiveRcmd(limit, area, offset) {
  return (0, _axios.install)({
    url: "/mv/exclusive/rcmd",
    method: "post",
    params: {
      limit: limit,
      area: area,
      offset: offset
    }
  });
} //获取推荐MV***


function personalizedMv() {
  return (0, _axios.install)({
    url: "/personalized/mv",
    method: "post"
  });
} //获取推荐排行***


function topMv(limit, area, offset) {
  return (0, _axios.install)({
    url: "/top/mv",
    method: "post",
    params: {
      limit: limit,
      area: area,
      offset: offset
    }
  });
} //获取视频详情相关
//获取相关视频


function relatedAllvideo(id) {
  return (0, _axios.install)({
    url: "/related/allvideo",
    method: "post",
    params: {
      id: id
    }
  });
} //获取视频详情


function videoDetail(id) {
  return (0, _axios.install)({
    url: "/video/detail",
    method: "post",
    params: {
      id: id
    }
  });
} //获取视频数据


function videoDetailInfo(vid) {
  return (0, _axios.install)({
    url: "/video/detail/info",
    method: "post",
    params: {
      vid: vid
    }
  });
} //获取视频地址


function videoUrl(id) {
  return (0, _axios.install)({
    url: "/video/url",
    method: "post",
    params: {
      id: id
    }
  });
} //收藏视频


function videoSub(id, t) {
  return (0, _axios.install)({
    url: "/video/sub",
    method: "post",
    params: {
      id: id,
      t: t
    }
  });
} //收藏MV


function mvSub(id, t) {
  return (0, _axios.install)({
    url: "/mv/sub",
    method: "post",
    params: {
      id: id,
      t: t
    }
  });
} //收藏视频到视频歌单歌单


function videoSubPlay(pid, ids) {
  return (0, _axios.install)({
    url: "/playlist/track/add",
    method: "post",
    params: {
      pid: pid,
      ids: ids
    }
  });
} //获取MV详情


function mvDetail(mvid) {
  return (0, _axios.install)({
    url: "/mv/detail",
    method: "post",
    params: {
      mvid: mvid
    }
  });
} //获取MV数据


function mvDetailInfo(mvid) {
  return (0, _axios.install)({
    url: "/mv/detail/info",
    method: "post",
    params: {
      mvid: mvid
    }
  });
} //获取MV地址


function mvUrl(id, r) {
  return (0, _axios.install)({
    url: "/mv/url",
    method: "post",
    params: {
      id: id,
      r: r
    }
  });
} //下载


function downLoad(id, r) {
  return (0, _axios.install)({
    url: "/mv/url",
    method: "post",
    responseType: "blob",
    params: {
      id: id,
      r: r
    }
  });
}