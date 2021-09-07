"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commentLike = commentLike;
exports.commentFloor = commentFloor;

var _axios = require("@/plugins/axios");

//点赞
function commentLike(id, cid, t, type) {
  return (0, _axios.install)({
    url: "/comment/like",
    method: "post",
    params: {
      id: id,
      cid: cid,
      t: t,
      type: type
    }
  });
} //楼层评论


function commentFloor(parentCommentId, id, type, limit, time) {
  return (0, _axios.install)({
    url: "/comment/floor",
    method: "post",
    params: {
      parentCommentId: parentCommentId,
      id: id,
      type: type,
      limit: limit,
      time: time
    }
  });
}