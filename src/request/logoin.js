import { install } from "@/plugins/axios";
//手机登录
export function loginPhone(phone, password) {
  return install({
    url: "/login/cellphone",
    method: "post",
    params: {
      phone,
      password,
    },
  });
}
//退出登录
export function loginOut() {
  return install({
    url: "/logout",
  });
}
//登录状态
export function loginStatus() {
  return install({
    url: "/login/status",
  });
}
