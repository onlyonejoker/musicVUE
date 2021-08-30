import { install } from "@/plugins/axios";
//获取热门话题
export function hotTopic(limit, offset) {
  return install({
    url: "/hot/topic",
    method: "post",
    params: {
      limit,
      offset,
    },
  });
}
//获取动态
export function event(pagesize, lasttime) {
  return install({
    url: "/event",
    method: "post",
    params: {
      pagesize,
      lasttime,
    },
  });
}
//获取热门话题详情
export function topicDetail(actid) {
  return install({
    url: "/topic/detail",
    method: "post",
    params: {
      actid,
    },
  });
}
//获取热门话题详情热门动态
export function eventHot(actid) {
  return install({
    url: "/topic/detail/event/hot",
    method: "post",
    params: {
      actid,
    },
  });
}
