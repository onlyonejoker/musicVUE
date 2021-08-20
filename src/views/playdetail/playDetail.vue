<template>
  <div class="play-detail">
    <topbar />
    <detail />
    <song-item />
  </div>
</template>

<script>
import topbar from "@/components/common/topbar.vue";
import detail from "@/components/playdetail/detail.vue";
import songItem from "@/components/playdetail/songItem.vue";
export default {
  name: "playDetail",
  components: {
    topbar,
    detail,
    songItem,
  },
};
</script>

<style lang="less" scoped>
</style>