<template>
  <div class="play-detail">
    <detail />
    <song-item />
  </div>
</template>

<script>
import detail from "@/components/playdetail/detail.vue";
import songItem from "@/components/playdetail/songItem.vue";
export default {
  name: "playDetail",
  components: {
    detail,
    songItem,
  },
};
</script>

<style lang="less" scoped>
</style>