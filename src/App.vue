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
    return {
      res: null,
    };
  },
  methods: {
    status() {
      this.res = JSON.parse(sessionStorage.getItem("res"));
      console.log(this.res);
      if (this.res == null) return;
      this.$store.commit("token", this.res.token);
      this.$store.commit("login", this.res);
      loginStatus()
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
  },
  mounted() {
    this.status();
  },
};
</script>

<style less>
  @import url(./assets/css/base.css);
</style>
