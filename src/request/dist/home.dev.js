"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.banner = banner;
exports.personalized = personalized;
exports.personalizedMv = personalizedMv;
exports.personalizedNewsong = personalizedNewsong;
exports.personalizedDjprogram = personalizedDjprogram;
exports.programRecommend = programRecommend;
exports.personalizedPrivatecontent = personalizedPrivatecontent;
exports.toplist = toplist;

var _axios = require("@/plugins/axios");

//获取首页轮播图
function banner(type) {
  return (0, _axios.install)({
    url: "/banner",
    method: "post",
    params: {
      type: type
    }
  });
} //获取首页推荐歌单


function personalized() {
  return (0, _axios.install)({
    url: "/personalized"
  });
} //获取首页推荐MV


function personalizedMv() {
  return (0, _axios.install)({
    url: "/personalized/mv"
  });
} //获取首页推荐新歌


function personalizedNewsong() {
  return (0, _axios.install)({
    url: "/personalized/newsong"
  });
} //获取首页推荐电台


function personalizedDjprogram() {
  return (0, _axios.install)({
    url: "/personalized/djprogram"
  });
} //获取首页推荐节目


function programRecommend() {
  return (0, _axios.install)({
    url: "/program/recommend"
  });
} //获取首页独家放送


function personalizedPrivatecontent() {
  return (0, _axios.install)({
    url: "/personalized/privatecontent"
  });
} //获取首页排行


function toplist() {
  return (0, _axios.install)({
    url: "/toplist"
  });
}