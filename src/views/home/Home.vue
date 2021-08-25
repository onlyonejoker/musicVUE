<template>
  <div class="home">
    <topbar></topbar>

    <section></section>
  </div>
</template>

<script>
import topbar from "@/components/common/topbar.vue";
export default {
  name: "Home",
  components: {
    topbar,
  },
};
</script>

<style lang="less" scoped>
section {
  padding: 0 15%;
}
</style>
