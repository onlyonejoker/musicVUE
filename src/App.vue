<template>
  <div id="app">
    <router-view></router-view>
    <login />
    <loading />
    <error />
  </div>
</template>

<script>
import login from "./components/common/login.vue";
import loading from "./components/common/loading.vue";
import error from "./components/common/error.vue";

import { loginStatus } from "./request/logoin";
export default {
  name: "app",
  components: {
    login,
    loading,
    error,
  },
  data() {
    return {};
  },
  methods: {
    status() {
      let token = sessionStorage.getItem("token");
      if (token === "true" || token == null) return;
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.$store.commit("login", user);
      this.$store.commit("token", false);
      loginStatus()
        .then((res) => {
          this.$store.commit("login", res.data);
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
