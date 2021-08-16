const Home = () => import("@/views/home/Home.vue");
const User = () => import("@/views/user/user.vue");
const userSet = () => import("@/views/user/views/userSet.vue");
const userHome = () => import("@/views/user/views/userHome.vue");
const userLeave = () => import("@/views/user/views/userLeave.vue");
const updata = () => import("@/views/user/views/updata.vue");
const bind = () => import("@/views/user/views/bind.vue");

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
            path: "/user/userSet",
            redirect: "/user/userSet/updata",
          },
          {
            path: "/updata",
            name: "updata",
            component: updata,
          },
          {
            path: "/bind",
            name: "bind",
            component: bind,
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router