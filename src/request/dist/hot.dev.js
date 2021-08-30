"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotTopic = hotTopic;
exports.event = event;
exports.topicDetail = topicDetail;
exports.eventHot = eventHot;

var _axios = require("@/plugins/axios");

//获取热门话题
function hotTopic(limit, offset) {
  return (0, _axios.install)({
    url: "/hot/topic",
    method: "post",
    params: {
      limit: limit,
      offset: offset
    }
  });
} //获取动态


function event(pagesize, lasttime) {
  return (0, _axios.install)({
    url: "/event",
    method: "post",
    params: {
      pagesize: pagesize,
      lasttime: lasttime
    }
  });
} //获取热门话题详情


function topicDetail(actid) {
  return (0, _axios.install)({
    url: "/topic/detail",
    method: "post",
    params: {
      actid: actid
    }
  });
} //获取热门话题详情热门动态


function eventHot(actid) {
  return (0, _axios.install)({
    url: "/topic/detail/event/hot",
    method: "post",
    params: {
      actid: actid
    }
  });
}