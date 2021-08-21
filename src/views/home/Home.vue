<template>
  <div class="home">
    <topbar></topbar>
    <home-nav />
    <section></section>
  </div>
</template>

<script>
import topbar from "@/components/common/topbar.vue";
import homeNav from "@/components/common/nav/homeNav.vue";

export default {
  name: "Home",
  components: {
    topbar,
    homeNav,
  },
};
</script>

<style lang="less" scoped>
section {
  padding: 0 15%;
}
</style>
