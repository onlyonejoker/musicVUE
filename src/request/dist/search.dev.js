"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._search = _search;
exports.searchDefault = searchDefault;
exports.searchHot = searchHot;
exports.searchSuggest = searchSuggest;

var _axios = require("@/plugins/axios");

//搜索
function _search(keywords, limit, offset, type) {
  return (0, _axios.install)({
    url: "/cloudsearch",
    params: {
      keywords: keywords,
      limit: limit,
      offset: offset,
      type: type
    }
  });
} //默认搜索关键字


function searchDefault() {
  return (0, _axios.install)({
    url: "/search/default"
  });
} //默认热搜


function searchHot() {
  return (0, _axios.install)({
    url: "/search/hot/detail"
  });
} //搜索建议


function searchSuggest(keywords) {
  return (0, _axios.install)({
    url: "/search/suggest",
    params: {
      keywords: keywords
    }
  });
}