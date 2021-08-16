import {
  install
} from "@/plugins/axios";

export function loginPhone(phone, password) {
  return install({
    url: "/login/cellphone",
    method: "post",
    params: {
      phone,
      password
    }
  })
}

export function loginOut() {
  return install({
    url: "/logout",
  })
}

export function loginStatus() {
  return install({
    url: "/login/status",
  })
}