const Home = () => import("@/views/home/Home.vue");
const User = () => import("@/views/user/user.vue");
const userSet = () => import("@/views/user/views/userSet.vue");
const userHome = () => import("@/views/user/views/userHome.vue");
const userLeave = () => import("@/views/user/views/userLeave.vue");
const updata = () => import("@/views/user/views/updata.vue");
const bind = () => import("@/views/user/views/bind.vue");
const playDetails = () => import("@/views/playDetails/playDetails.vue")
const subPlay = () => import("@/views/playDetails/view/subPlay.vue")
const Play = () => import("@/views/playDetails/view/Play.vue")
const artist = () => import("@/views/playDetails/view/artist.vue")
const playDetail = () => import("@/views/playDetails/view/playDetail.vue")

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
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
    name: "user",
    component: User,
    children: [{
        path: "/user",
        redirect: "/user/home",
      },
      {
        path: 'home',
        name: "home",
        component: userHome,
      },
      {
        path: 'leave',
        name: "userLeave",
        component: userLeave,
      },
      {
        path: 'set',
        name: "userSet",
        component: userSet,
        children: [{
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
          }
        ]
      }
    ]
  },
  {
    path: "/playDetails",
    name: "playDetails",
    component: playDetails,
    children: [{
        path: "/playDetails",
        redirect: "/playDetails/Play",
      },
      {
        path: 'Play',
        name: "Play",
        component: Play,
      },
      {
        path: 'artist',
        name: "artist",
        component: artist,
      },
      {
        path: 'subPlay',
        name: "subPlay",
        component: subPlay,
      },
      {
        path: 'playDetail',
        name: "playDetail",
        component: playDetail,
      }
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  if (token || to.path == "/home") { //一定要两个判断 否则递归
    //为什么一定要两个参数，如果只判断token 如果token为空 那么会一直跳转页面，因为一直在跳转一直在回调 所以必须要设置一个跳转到那么页面就不跳了的限制
    next(); //如果有token或者准备前往/home，那么继续
  } else {
    next("/home"); //如果没有token或者不准备前往/home，那么跳转到home
  }
})
export default router