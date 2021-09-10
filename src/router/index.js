const Home = () => import("@/views/home/Home.vue");
//用户相关
const User = () => import("@/views/user/user.vue");
const userHome = () => import("userView/userHome.vue");
const userLike = () => import("userView/userhome/userLike.vue");
const userMyPlay = () => import("userView/userhome/userMyPlay.vue");
const mySub = () => import("userView/userhome/userMyPlay/mySub.vue");
const myCreat = () => import("userView/userhome/userMyPlay/myCreat.vue");
const myDj = () => import("userView/userhome/userMyPlay/myDj.vue");
const userFocus = () => import("userView/userhome/userFocus.vue");
const user = () => import("userView/userhome/userFocus/user.vue");
const userFans = () => import("userView/userhome/userFans.vue");
const userEvent = () => import("userView/userhome/userEvent.vue");
const comment = () => import("userView/userhome/userEvent/comment.vue");
const event = () => import("userView/userhome/userEvent/event.vue");
const userSet = () => import("userView/userSet.vue");
const updata = () => import("userView/userset/updata.vue");
const bind = () => import("userView/userset/bind.vue");
const userLeave = () => import("userView/userLeave.vue");
const userHistory = () => import("userHistory/userHistory.vue");

//歌单相关
const play = () => import("@/views/play/play.vue");
const playDetail = () => import("@/views/play/playDetail/playDetail.vue");
const playUpdata = () => import("@/views/play/playUpdata/playUpdata.vue");

//歌单分类
const playItem = () => import("@/views/playItem/playItem.vue");
const playItemAll = () => import("@/views/playItem/playItemAll.vue");
const highquality = () => import("@/views/playItem/highquality.vue");

//歌手相关
const artist = () => import("@/views/artistDetail/artist.vue");
const artistDetailAlbum = () => import("../views/artistDetail/albumrouter.vue");
const artistDetailInfo = () => import("../views/artistDetail/inforouter.vue");
const artistDetailmv = () => import("../views/artistDetail/mvrouter.vue");
const similarity = () => import("../views/artistDetail/similarity.vue");

//详情相关
const albumDetail = () => import("@/views/albumDetail/albumDetail.vue");
const songDetail = () => import("@/views/songDetail/songDetail.vue");
const artistDetail = () => import("@/views/artistDetail/artistDetail.vue");
const hotDetail = () => import("@/views/hotDetail/hotDetail.vue");
const videoDetail = () => import("@/views/videoDetail/videoDetail.vue");
//热门
const events = () => import("@/views/hot/hot.vue");

//收藏
const collect = () => import("@/views/collect/collect.vue");
const subvideo = () => import("@/views/collect/video.vue");
const album = () => import("@/views/collect/album.vue");
const song = () => import("@/views/collect/song.vue");
const special = () => import("@/views/collect/special.vue");

//搜索相关
const search = () => import("@/views/search/search.vue");
const searchSong = () => import("@/views/search/searchSong.vue");
const searchAlbum = () => import("@/views/search/searchAlbum.vue");
const searchPlay = () => import("@/views/search/searchPlay.vue");
const searchArtist = () => import("@/views/search/searchArtist.vue");
const searchVideo = () => import("@/views/search/searchVideo.vue");
const searchUser = () => import("@/views/search/searchUser.vue");
const searchLyric = () => import("@/views/search/searchLyric.vue");
const searchStation = () => import("@/views/search/searchStation.vue");
const searchMV = () => import("@/views/search/searchMV.vue");
const searchSynthesize = () => import("@/views/search/searchSynthesize.vue");

//MV视频
const MV = () => import("@/views/videoDetail/mv.vue");
const mv = () => import("@/views/videoDetail/mvzy.vue");
const mvhome = () => import("@/views/videoDetail/mvhome.vue");
const mvAll = () => import("@/views/videoDetail/mvAll.vue");
const video = () => import("@/views/videoDetail/video.vue");

//电台
const dj = () => import("@/views/djDetail/dj.vue");
const djDetail = () => import("@/views/djDetail/djDetail.vue");
const djPlay = () => import("@/views/djDetail/djPlay.vue");

//排行
const top = () => import("@/views/top/top.vue");

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home",
  },
  //首页相关路由
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  //用户相关路由
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
              {
                path: "myDj",
                name: "myDj",
                component: myDj,
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
                redirect: "/user/home/focus/user",
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
            children: [
              {
                path: "/user/home/event",
                redirect: "/user/home/event/events",
              },
              {
                path: "comment",
                name: "comment",
                component: comment,
              },
              {
                path: "events",
                name: "events",
                component: event,
              },
            ],
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
      {
        path: "history",
        name: "history",
        component: userHistory,
      },
    ],
  },
  //歌单详情路由
  {
    path: "/play",
    name: "play",
    component: play,
    children: [
      {
        path: "/play",
        redirect: "/play/Detail",
      },
      {
        path: "Detail",
        name: "playDetail",
        component: playDetail,
      },
      {
        path: "updata",
        name: "updataPlay",
        component: playUpdata,
      },
    ],
  },
  //专辑详情路由
  {
    path: "/albumDetail",
    name: "albumDetail",
    component: albumDetail,
  },
  //视频详情路由
  {
    path: "/videoDetail",
    name: "videoDetail",
    component: videoDetail,
  },

  //歌手详情路由
  {
    path: "/artistDetail",
    name: "artistDetail",
    component: artistDetail,
    children: [
      {
        path: "/artistDetail",
        redirect: "/artistDetail/album",
      },
      {
        path: "album",
        name: "album",
        component: artistDetailAlbum,
      },
      {
        path: "info",
        name: "info",
        component: artistDetailInfo,
      },
      {
        path: "mv",
        name: "mv",
        component: artistDetailmv,
      },
      {
        path: "similarity",
        name: "similarity",
        component: similarity,
      },
    ],
  },
  //歌手相关
  {
    path: "/artist",
    name: "artist",
    component: artist,
  },
  //歌曲详情路由
  {
    path: "/songDetail",
    name: "songDetail",
    component: songDetail,
  },
  //动态路由
  {
    path: "/eventsDetail",
    name: "eventsDetail",
    component: events,
  },
  //热门路由
  {
    path: "/hotDetail",
    name: "hotDetail",
    component: hotDetail,
  },
  //歌单列表路由
  {
    path: "/playItem",
    name: "playItem",
    component: playItem,
    children: [
      {
        path: "/playItem",
        redirect: "/playItem/all",
      },
      {
        path: "all",
        name: "all",
        component: playItemAll,
      },
      {
        path: "highquality",
        name: "highquality",
        component: highquality,
      },
    ],
  },
  //收藏路由
  {
    path: "/collect",
    name: "collect",
    component: collect,
    children: [
      {
        path: "/collect",
        redirect: "/collect/song",
      },
      {
        path: "song",
        name: "song",
        component: song,
      },
      {
        path: "album",
        name: "albumshoucang",
        component: album,
      },
      {
        path: "special",
        name: "special",
        component: special,
      },
      {
        path: "video",
        name: "video",
        component: subvideo,
      },
    ],
  },
  //搜索路由
  {
    path: "/search",
    name: "search",
    component: search,
    children: [
      {
        path: "/search",
        redirect: "/search/searchSong",
      },
      {
        path: "searchSong",
        name: "searchSong",
        component: searchSong,
      },
      {
        path: "searchAlbum",
        name: "searchAlbum",
        component: searchAlbum,
      },
      {
        path: "searchPlay",
        name: "searchPlay",
        component: searchPlay,
      },
      {
        path: "searchArtist",
        name: "searchArtist",
        component: searchArtist,
      },
      {
        path: "searchVideo",
        name: "searchVideo",
        component: searchVideo,
      },
      {
        path: "searchUser",
        name: "searchUser",
        component: searchUser,
      },
      {
        path: "searchLyric",
        name: "searchLyric",
        component: searchLyric,
      },
      {
        path: "searchStation",
        name: "searchStation",
        component: searchStation,
      },
      {
        path: "searchMV",
        name: "searchMV",
        component: searchMV,
      },
      {
        path: "searchSynthesize",
        name: "searchSynthesize",
        component: searchSynthesize,
      },
    ],
  },
  //视频路由
  {
    path: "/mv",
    name: "MV",
    component: MV,
    children: [
      {
        path: "/mv",
        redirect: "/mv/mv",
      },
      {
        path: "mv",
        name: "mvzy",
        component: mv,
        children: [
          {
            path: "/mv/mv",
            redirect: "/mv/mv/mvhome",
          },
          {
            path: "mvhome",
            name: "mvhome",
            component: mvhome,
          },
          {
            path: "mvAll",
            name: "mvAll",
            component: mvAll,
          },
        ],
      },
      {
        path: "video",
        name: "videozy",
        component: video,
      },
    ],
  },
  //电台路由
  {
    path: "/dj",
    name: "dj",
    component: dj,
    children: [
      //{
      //  path: "/mv",
      //  redirect: "/mv/mv",
      //},
      //{
      //  path: "mv",
      //  name: "mvzy",
      //  component: mv,
      //  children: [
      //    {
      //      path: "/mv/mv",
      //      redirect: "/mv/mv/mvhome",
      //    },
      //    {
      //      path: "mvhome",
      //      name: "mvhome",
      //      component: mvhome,
      //    },
      //    {
      //      path: "mvAll",
      //      name: "mvAll",
      //      component: mvAll,
      //    },
      //  ],
      //},
      //{
      //  path: "video",
      //  name: "videozy",
      //  component: video,
      //},
    ],
  },
  //电台详情路由
  {
    path: "/djDetail",
    name: "djDetail",
    component: djDetail,
    children: [
      //{
      //  path: "/mv",
      //  redirect: "/mv/mv",
      //},
      //{
      //  path: "mv",
      //  name: "mvzy",
      //  component: mv,
      //  children: [
      //    {
      //      path: "/mv/mv",
      //      redirect: "/mv/mv/mvhome",
      //    },
      //    {
      //      path: "mvhome",
      //      name: "mvhome",
      //      component: mvhome,
      //    },
      //    {
      //      path: "mvAll",
      //      name: "mvAll",
      //      component: mvAll,
      //    },
      //  ],
      //},
      //{
      //  path: "video",
      //  name: "videozy",
      //  component: video,
      //},
    ],
  },
  //电台详情路由
  {
    path: "/djPlay",
    name: "djPlay",
    component: djPlay,
  },
  //排行榜路由
  {
    path: "/ranking",
    name: "top",
    component: top,
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
    //为什么一定要两个参数，如果只判断token 如果token为空 那么会一直跳转页面，因为一直在跳转一直在回调
    //所以必须要设置一个跳转到那么页面就不跳了的限制
    next(); //如果有token或者准备前往/home，那么继续
  } else {
    alert("请登录");
    next("/home"); //如果没有token或者不准备前往/home，那么跳转到home
  }
});
export default router;
