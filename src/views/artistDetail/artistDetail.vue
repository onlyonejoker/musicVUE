<template>
  <div id="artistDetail">
    <topbar></topbar>
    <artistDetail />
  </div>
</template>

<script>
import topbar from "@/components/common/title/topbar.vue";
import artistDetail from "@/components/content/artist/detail.vue";
export default {
  name: "artist",
  components: {
    topbar,
    artistDetail,
  },
};
</script>

<style lang="less" scoped>
</style>