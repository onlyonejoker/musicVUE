<template>
  <div class="topbar">
    <topBarImg />
    <topbarSearch />
    <topbarLogoing />
    <home-nav />
  </div>
</template>

<script>
import topBarImg from "./topbar/topBarImg.vue";
import topbarSearch from "./topbar/topbarSearch.vue";
import topbarLogoing from "./topbar/topbarLogoing.vue";
import homeNav from "@/components/common/nav/homeNav.vue";
export default {
  name: "topbar",
  components: {
    topBarImg,
    topbarSearch,
    topbarLogoing,
    homeNav,
  },
};
</script>

<style lang="less" scoped>
.topbar {
  width: 100%;
  min-width: 800px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.5s;
  background-color: #c4c4c4;
  &:hover {
    transition: all 0.5s;
    margin-bottom: 54px;
    .nav {
      transition: all 0.3s;
      opacity: 1;
      z-index: 99;
      top: 44px;
    }
  }
  .nav {
    transition: all 0.3s;
    opacity: 0;
    position: absolute;
    z-index: -999;
    top: 0px;
    left: 0;
    min-width: 1000px;
  }
}
</style>