<template>
  <div id="app" v-if="display() > 500">
    <router-view></router-view>
    <login />
    <music />
    <footers />
    <playCreate />
    <zhuanfa />
    <fenxiang />
    <back-top :style="{ display: backTop }" />
  </div>
  <div id="app" v-else>暂不支持移动端，请前往PC端查看</div>
</template>

<script>
import login from "./components/common/title/login.vue";
import music from "./views/musicplay/music.vue";
import footers from "./components/common/footer.vue";
import playCreate from "./components/common/play/playCreate.vue";
import BackTop from "./components/common/backTop.vue";
import zhuanfa from "./components/common/zhuanfa/zhuanfa.vue";
import fenxiang from "./components/common/zhuanfa/fenxiang.vue";
import { loginStatus, loginRefresh } from "./request/logoin";
export default {
  name: "app",
  components: {
    login,
    music,
    footers,
    playCreate,
    BackTop,
    zhuanfa,
    fenxiang
  },
  data() {
    return {
      num: 0,
      falg: true,
      backTop: "none"
    };
  },
  methods: {
    //更新信息
    async status() {
      let { data: loginStatusData } = await loginStatus();
      this.$store.commit("login", loginStatusData); //更新数据
    },

    backTopFn() {
      this.backTop = window.pageYOffset >= 500 ? "block" : "none";
    },

    display() {
      let app = document.querySelector("#app");
      return app.offsetWidth;
    }
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
    this.display();
  }
};
</script>

<style less>
@import url(./assets/css/base.css);
</style>
