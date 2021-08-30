import { install } from "@/plugins/axios";
//获取收藏的MV
export function mvSublist() {
  return install({
    url: "/mv/sublist",
    method: "post",
  });
}
