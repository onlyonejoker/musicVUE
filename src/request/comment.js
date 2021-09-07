import { install } from "@/plugins/axios";
//点赞
export function commentLike(id, cid, t, type) {
  return install({
    url: "/comment/like",
    method: "post",
    params: {
      id,
      cid,
      t,
      type,
    },
  });
}
//楼层评论
export function commentFloor(parentCommentId, id, type, limit, time) {
  return install({
    url: "/comment/floor",
    method: "post",
    params: {
      parentCommentId,
      id,
      type,
      limit,
      time,
    },
  });
}
