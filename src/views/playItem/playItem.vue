<template>
  <div class="playItem">
    <topbar />
    <router-view></router-view>
  </div>
</template>

<script>
import topbar from "@/components/common/title/topbar.vue";
export default {
  name: "playItem",
  components: {
    topbar,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>