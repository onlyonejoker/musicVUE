<template>
  <div class="topbar">
    <topBarImg />
    <topbarSearch />
    <topbarLogoing />
  </div>
</template>

<script>
import topBarImg from "./topbar/topBarImg.vue";
import topbarSearch from "./topbar/topbarSearch.vue";
import topbarLogoing from "./topbar/topbarLogoing.vue";
export default {
  name: "topbar",
  components: {
    topBarImg,
    topbarSearch,
    topbarLogoing,
  },
};
</script>

<style lang="less" scoped>
  .topbar {
    width: 100%;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>