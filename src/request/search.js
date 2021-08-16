import {
  installApi
} from "@/plugins/axios";

export function _search(keywords) {
  return installApi.axios({
    url: "/cloudsearch",
    params: {
      keywords
    }
  })
}