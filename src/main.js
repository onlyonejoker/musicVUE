import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import VueLazyload from "vue-lazyload";
import { Audio } from "./util/util";
import { Copy } from "./util/copy";

import WujieVue from "wujie-vue2";

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

Vue.prototype.$time = function(time) {
  let date = new Date(time);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m < 10 ? (m = "0" + m) : m;
  let d = date.getDate();
  d < 10 ? (d = "0" + d) : d;
  let h = date.getHours();
  h < 10 ? (h = "0" + h) : h;
  let f = date.getMinutes();
  f < 10 ? (f = "0" + f) : f;
  let s = date.getSeconds();
  s < 10 ? (s = "0" + s) : s;
  return y + "年" + m + "月" + d + "日" + "  " + h + ":" + f + ":" + s;
};

Vue.prototype.$audio = new Audio();
Vue.prototype.Copy = new Copy();
Vue.prototype.axios = axios;

Vue.use(VueLazyload, {
  loading: require("./assets/img/loading.gif"),
  error: require("./assets/img/error.jpg")
});

const { bus } = WujieVue;
console.log(bus);
Vue.use(WujieVue);
window.$wujie = bus;

const vm = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

export default vm;
