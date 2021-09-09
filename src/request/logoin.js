import { install } from "@/plugins/axios";
//手机登录
export function loginPhone(phone, password) {
  let timestamp = new Date().getTime();
  return install({
    url: "/login/cellphone",
    method: "post",
    params: {
      phone,
      password,
      timestamp,
    },
  });
}
//退出登录
export function loginOut() {
  return install({
    url: "/logout",
  });
}
//刷新登录状态
export function loginRefresh() {
  return install({
    url: "/login/refresh",
  });
}

//登录状态
export function loginStatus() {
  return install({
    url: "/login/status",
  });
}
