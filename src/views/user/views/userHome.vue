<template>
  <div class="userHome">
    <info />
    <router-view />
  </div>
</template>

<script>
import info from "@/components/user/userhome/info.vue";
export default {
  name: "userhome",
  components: {
    info,
  },
  watch: {
    //监听路由，很重要
    $route() {
      this.$router.go(0);
    },
  },
  methods: {
    //写入路由id
    setRouterId() {
      this.$route.query.id
        ? (sessionStorage.setItem("others", this.$route.query.id),
          this.$store.commit("others", this.$route.query.id))
        : null;
    },
    //读取漏油id
    getRouterId() {
      sessionStorage.getItem("others")
        ? this.$store.commit("others", sessionStorage.getItem("others"))
        : this.$store.commit("others", null);
    },
  },
  created() {
    this.setRouterId();
    this.getRouterId();
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("others");
    next();
  },
};
</script>

<style lang="less" scoped>
.userHome {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
}
</style>