"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

require("./plugins/axios");

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

require("./plugins/element.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;
_vue["default"].prototype.$bus = new _vue["default"]();

_vue["default"].prototype.$time = function (time) {
  var date = new Date(time);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m < 10 ? m = "0" + m : m;
  var d = date.getDate();
  d < 10 ? d = "0" + d : d;
  var h = date.getHours();
  h < 10 ? h = "0" + h : h;
  var f = date.getMinutes();
  f < 10 ? f = "0" + f : f;
  var s = date.getSeconds();
  s < 10 ? s = "0" + s : s;
  return y + "年" + m + "月" + d + "日" + "  " + h + ":" + f + ":" + s;
};

var vm = new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");
var _default = vm;
exports["default"] = _default;