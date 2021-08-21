<template>
  <div id="app">
    <router-view></router-view>
    <login />
    <music />
    <footers />
    <playCreate />
    <back-top :style="{ display: backTop }" />
  </div>
</template>

<script>
import login from "./components/common/login.vue";
import music from "./views/musicplay/music.vue";
import footers from "./components/common/footer.vue";
import playCreate from "./components/common/play/playCreate.vue";
import { loginStatus } from "./request/logoin";
import { playlist } from "@/request/user";
import BackTop from "./components/common/backTop.vue";
export default {
  name: "app",
  components: {
    login,
    music,
    footers,
    playCreate,
    BackTop,
  },
  data() {
    return {
      num: 0,
      falg: true,
      backTop: "none",
    };
  },
  methods: {
    //更新信息
    status() {
      let token = sessionStorage.getItem("token");
      if (!token) return; //如果token为空  那么不执行初始化  需要登录
      let user = JSON.parse(sessionStorage.getItem("user")); //刷新保存数据
      this.$store.commit("login", user); //刷新保存数据
      this.$store.commit("token", token); //刷新保存数据
      loginStatus()
        .then((res) => {
          console.log(res.data);
          this.$store.commit("login", res.data); //更新数据
          this.myCreatPlay(res.data.account.id);
        })
        .catch();
    },
    //获取我收藏的歌单的id和name
    myCreatPlay(uid) {
      playlist(uid, 1000, 0)
        .then((res) => {
          let myCreatPlay = [];
          res.playlist.forEach((e) => {
            !e.subscribed ? myCreatPlay.push({ id: e.id, name: e.name }) : null;
          });
          this.$store.commit("myCreatPlay", myCreatPlay);
        })
        .catch(() => {
          if (this.num >= 3) {
            null;
          } else {
            this.myCreatPlay(this.$store.state.login.account.id);
            this.num++;
          }
        });
    },
    backTopFn() {
      if (window.pageYOffset >= 500) {
        this.backTop = "block";
      } else if (window.pageYOffset < 500) {
        this.backTop = "none";
      }
    },
  },
  created() {
    this.status();
  },
  mounted() {
    document.addEventListener("scroll", () => {
      if (this.falg) {
        this.falg = false;
        setTimeout(() => {
          this.backTopFn();
          this.falg = true;
        }, 500);
      }
    });
  },
};
</script>

<style less>
@import url(./assets/css/base.css);
</style>
