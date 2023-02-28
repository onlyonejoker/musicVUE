<template>
  <div id="artist">
    <topbar></topbar>
    <artistItem />
  </div>
</template>

<script>
import topbar from "@/components/common/title/topbar.vue";
import artistItem from "@/components/content/artist/artistItem.vue";
export default {
  name: "artist",
  components: {
    topbar,
    artistItem,
  },
};
</script>

<style lang="less" scoped>
</style>