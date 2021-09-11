"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.djCatelist = djCatelist;
exports.djRecommendType = djRecommendType;
exports.djDetail = djDetail;
exports.djProgram = djProgram;

var _axios = require("@/plugins/axios");

//电台分类
function djCatelist() {
  return (0, _axios.install)({
    url: "/dj/catelist"
  });
} //电台分类详情


function djRecommendType(type, limit, offset) {
  return (0, _axios.install)({
    url: "/dj/recommend/type",
    params: {
      type: type,
      limit: limit,
      offset: offset
    }
  });
} //电台详情


function djDetail(rid) {
  return (0, _axios.install)({
    url: "/dj/detail",
    params: {
      rid: rid
    }
  });
} //电台节目


function djProgram(rid, limit, offset) {
  return (0, _axios.install)({
    url: "/dj/program",
    params: {
      rid: rid,
      limit: limit,
      offset: offset
    }
  });
}