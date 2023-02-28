<template>
  <div class="play-detail">
    <topbar />
    <router-view />
  </div>
</template>

<script>
import topbar from "@/components/common/title/topbar.vue";

export default {
  name: "playDetail",
  components: {
    topbar,
  },
};
</script>

<style lang="less" scoped>
</style>