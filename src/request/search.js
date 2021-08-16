import {
  install
} from "@/plugins/axios";

export function _search(keywords) {
  return install({
    url: "/cloudsearch",
    params: {
      keywords
    }
  })
}