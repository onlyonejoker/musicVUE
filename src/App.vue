<template>
  <div id="app">
    <router-view></router-view>
    <login />

  </div>
</template>

<script>
import login from "./components/common/login.vue";
import { loginStatus } from "./request/logoin";
export default {
  name: "app",
  components: {
    login,
  },
  data() {
    return {};
  },
  methods: {
    status() {
      let token = sessionStorage.getItem("token");
      if (!token) return; //如果token为空  那么不执行初始化  需要登录
      let user = JSON.parse(sessionStorage.getItem("user")); //刷新保存数据
      this.$store.commit("login", user); //刷新保存数据
      this.$store.commit("token", token); //刷新保存数据
      loginStatus()
        .then((res) => {
          console.log(res);
          this.$store.commit("login", res.data); //更新数据
        })
        .catch();
    },
  },
  created() {
    this.status();
  },
};
</script>

<style less>
  @import url(./assets/css/base.css);
</style>
