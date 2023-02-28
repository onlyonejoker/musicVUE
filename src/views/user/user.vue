<template>
  <div id="user">
    <topbar></topbar>
    <router-view />
  </div>
</template>

<script>
import topbar from "@/components/common/title/topbar.vue";
export default {
  name: "user",
  components: {
    topbar,
  },
};
</script>

<style lang="less" scoped>
</style>