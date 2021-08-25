"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.city = city;
exports.ip = ip;

var _city = require("../plugins/city");

//城市查询

/* 
name	否	空	查找条件：地区名称
code	否	空	查找条件：行政区号
parentcode	否	空	查找条件：父级行政区号
zip	否	空	查找条件：邮政编码
tel	否	空	查找条件：电话区号
children	否	0	往下查找多少级，0-4之间 
*/
function city(code) {
  return (0, _city.install1)({
    url: "/city?code=" + code
  });
}

function ip(ip) {
  return (0, _city.install1)({
    withCredentials: false,
    url: "http://ip-api.com/json/" + ip + "?lang=zh-CN"
  });
}