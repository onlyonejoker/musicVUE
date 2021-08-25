"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Home = function Home() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/home/Home.vue"));
  });
}; //用户相关


var User = function User() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/user/user.vue"));
  });
};

var userHome = function userHome() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userHome.vue"));
  });
};

var userLike = function userLike() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userLike.vue"));
  });
};

var userMyPlay = function userMyPlay() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userMyPlay.vue"));
  });
};

var mySub = function mySub() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userMyPlay/mySub.vue"));
  });
};

var myCreat = function myCreat() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userMyPlay/myCreat.vue"));
  });
};

var myDj = function myDj() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userMyPlay/myDj.vue"));
  });
};

var userFocus = function userFocus() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userFocus.vue"));
  });
};

var song = function song() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userFocus/song.vue"));
  });
};

var user = function user() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userFocus/user.vue"));
  });
};

var userFans = function userFans() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userFans.vue"));
  });
};

var userEvent = function userEvent() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userEvent.vue"));
  });
};

var comment = function comment() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userEvent/comment.vue"));
  });
};

var event = function event() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userhome/userEvent/event.vue"));
  });
};

var userSet = function userSet() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userSet.vue"));
  });
};

var updata = function updata() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userset/updata.vue"));
  });
};

var bind = function bind() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userset/bind.vue"));
  });
};

var userLeave = function userLeave() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userView/userLeave.vue"));
  });
};

var userHistory = function userHistory() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("userHistory/userHistory.vue"));
  });
}; //歌单相关


var play = function play() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/play/play.vue"));
  });
};

var playDetail = function playDetail() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/play/playDetail/playDetail.vue"));
  });
};

var playUpdata = function playUpdata() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/play/playUpdata/playUpdata.vue"));
  });
}; //详情相关


var albumDetail = function albumDetail() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/albumDetail/albumDetail.vue"));
  });
};

var songDetail = function songDetail() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/songDetail/songDetail.vue"));
  });
};

var artistDetail = function artistDetail() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/artistDetail/artistDetail.vue"));
  });
}; //热门


var hot = function hot() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/views/hot/hot.vue"));
  });
};

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "",
  redirect: "/home"
}, //首页相关路由
{
  path: "/home",
  name: "Home",
  component: Home
}, //用户相关路由
{
  path: "/user",
  name: "User",
  component: User,
  children: [{
    path: "/user",
    redirect: "/user/home"
  }, {
    path: "home",
    name: "home",
    component: userHome,
    children: [{
      path: "/user/home",
      redirect: "/user/home/like"
    }, {
      path: "like",
      name: "like",
      component: userLike
    }, {
      path: "myPlay",
      name: "myPlay",
      component: userMyPlay,
      children: [{
        path: "/user/home/myPlay",
        redirect: "/user/home/myPlay/myCreat"
      }, {
        path: "myCreat",
        name: "myCreat",
        component: myCreat
      }, {
        path: "mySub",
        name: "mySub",
        component: mySub
      }, {
        path: "myDj",
        name: "myDj",
        component: myDj
      }]
    }, {
      path: "focus",
      name: "focus",
      component: userFocus,
      children: [{
        path: "/user/home/focus",
        redirect: "/user/home/focus/song"
      }, {
        path: "song",
        name: "song",
        component: song
      }, {
        path: "user",
        name: "user",
        component: user
      }]
    }, {
      path: "fans",
      name: "fans",
      component: userFans
    }, {
      path: "event",
      name: "event",
      component: userEvent,
      children: [{
        path: "/user/home/event",
        redirect: "/user/home/event/comment"
      }, {
        path: "comment",
        name: "comment",
        component: comment
      }, {
        path: "events",
        name: "events",
        component: event
      }]
    }]
  }, {
    path: "leave",
    name: "userLeave",
    component: userLeave
  }, {
    path: "set",
    name: "userSet",
    component: userSet,
    children: [{
      path: "/user/set",
      redirect: "/user/set/updata"
    }, {
      path: "updata",
      name: "updata",
      component: updata
    }, {
      path: "bind",
      name: "bind",
      component: bind
    }]
  }, {
    path: "history",
    name: "history",
    component: userHistory
  }]
}, //歌单详情路由
{
  path: "/play",
  name: "play",
  component: play,
  children: [{
    path: "/play",
    redirect: "/play/Detail"
  }, {
    path: "Detail",
    name: "playDetail",
    component: playDetail
  }, {
    path: "updata",
    name: "updataPlay",
    component: playUpdata
  }]
}, //专辑详情路由
{
  path: "/albumDetail",
  name: "albumDetail",
  component: albumDetail
}, //歌手详情路由
{
  path: "/artistDetail",
  name: "artistDetail",
  component: artistDetail
}, //歌曲详情路由
{
  path: "/songDetail",
  name: "songDetail",
  component: songDetail
}, //热门路由
{
  path: "/hot",
  name: "hot",
  component: hot
}];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
router.beforeEach(function (to, from, next) {
  var token = sessionStorage.getItem("token");

  if (token || to.path == "/home") {
    //一定要两个判断 否则递归
    //为什么一定要两个参数，如果只判断token 如果token为空 那么会一直跳转页面，因为一直在跳转一直在回调 所以必须要设置一个跳转到那么页面就不跳了的限制
    next(); //如果有token或者准备前往/home，那么继续
  } else {
    next("/home"); //如果没有token或者不准备前往/home，那么跳转到home
  }
});
var _default = router;
exports["default"] = _default;