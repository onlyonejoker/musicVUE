import {
  install
} from "@/plugins/axios";

export function music(id) {
  return install({
    url: "/song/url",
    method: "post",
    params: {
      id
    }
  })
}