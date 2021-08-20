const Home = () => import("@/views/home/Home.vue");

const User = () => import("@/views/user/user.vue");
const userHome = () => import("userView/userHome.vue");
const userLike = () => import("userView/userhome/userLike.vue");
const userMyPlay = () => import("userView/userhome/userMyPlay.vue");
const mySub = () => import("userView/userhome/userMyPlay/mySub.vue");
const myCreat = () => import("userView/userhome/userMyPlay/myCreat.vue");
const userFocus = () => import("userView/userhome/userFocus.vue");
const userFans = () => import("userView/userhome/userFans.vue");
const userEvent = () => import("userView/userhome/userEvent.vue");
const song = () => import("userView/userhome/userFocus/song.vue");
const user = () => import("userView/userhome/userFocus/user.vue");

const userSet = () => import("userView/userSet.vue");
const updata = () => import("userView/userset/updata.vue");
const bind = () => import("userView/userset/bind.vue");

const userLeave = () => import("userView/userLeave.vue");

const myMusic = () => import("@/views/mymusic/myMusic.vue");
const mySubPlay = () => import("@/views/mymusic/view/mySubPlay.vue");
const myPlay = () => import("@/views/mymusic/view/myPlay.vue");
const myArtist = () => import("@/views/mymusic/view/myArtist.vue");
const playDetail = () => import("@/views/playdetail/playDetail.vue");

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/user",
    name: "User",
    component: User,
    children: [
      {
        path: "/user",
        redirect: "/user/home",
      },
      {
        path: "home",
        name: "home",
        component: userHome,
        children: [
          {
            path: "/user/home",
            redirect: "/user/home/like",
          },
          {
            path: "like",
            name: "like",
            component: userLike,
          },
          {
            path: "myPlay",
            name: "myPlay",
            component: userMyPlay,
            children: [
              {
                path: "/user/home/myPlay",
                redirect: "/user/home/myPlay/myCreat",
              },
              {
                path: "myCreat",
                name: "myCreat",
                component: myCreat,
              },
              {
                path: "mySub",
                name: "mySub",
                component: mySub,
              },
            ],
          },
          {
            path: "focus",
            name: "focus",
            component: userFocus,
            children: [
              {
                path: "/user/home/focus",
                redirect: "/user/home/focus/song",
              },
              {
                path: "song",
                name: "song",
                component: song,
              },
              {
                path: "user",
                name: "user",
                component: user,
              },
            ],
          },
          {
            path: "fans",
            name: "fans",
            component: userFans,
          },
          {
            path: "event",
            name: "event",
            component: userEvent,
          },
        ],
      },
      {
        path: "leave",
        name: "userLeave",
        component: userLeave,
      },
      {
        path: "set",
        name: "userSet",
        component: userSet,
        children: [
          {
            path: "/user/set",
            redirect: "/user/set/updata",
          },
          {
            path: "updata",
            name: "updata",
            component: updata,
          },
          {
            path: "bind",
            name: "bind",
            component: bind,
          },
        ],
      },
    ],
  },
  {
    path: "/myMusic",
    name: "myMusic",
    component: myMusic,
    children: [
      {
        path: "/myMusic",
        redirect: "/myMusic/myPlay",
      },
      {
        path: "myPlay",
        name: "myPlay",
        component: myPlay,
      },
      {
        path: "myArtist",
        name: "myArtist",
        component: myArtist,
      },
      {
        path: "mySubPlay",
        name: "mySubPlay",
        component: mySubPlay,
      },
    ],
  },
  {
    path: "/playDetail",
    name: "playDetail",
    component: playDetail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  if (token || to.path == "/home") {
    //一定要两个判断 否则递归
    //为什么一定要两个参数，如果只判断token 如果token为空 那么会一直跳转页面，因为一直在跳转一直在回调 所以必须要设置一个跳转到那么页面就不跳了的限制
    next(); //如果有token或者准备前往/home，那么继续
  } else {
    next("/home"); //如果没有token或者不准备前往/home，那么跳转到home
  }
});
export default router;
