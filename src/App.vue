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
      // let token = sessionStorage.getItem("token");
      // if (!token) return; //如果token为空  那么不执行初始化  需要登录
      // let user = JSON.parse(sessionStorage.getItem("user")); //刷新保存数据
      // this.$store.commit("login", user); //刷新保存数据
      // this.$store.commit("token", token); //刷新保存数据
      let loginRefreshData = await loginRefresh();
      let loginStatusData = await loginStatus();
      console.log(loginStatusData.data);
      this.$store.commit("login", loginStatusData.data); //更新数据
    },

    backTopFn() {
      if (window.pageYOffset >= 500) {
        this.backTop = "block";
      } else if (window.pageYOffset < 500) {
        this.backTop = "none";
      }
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
