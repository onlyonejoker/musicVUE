<template>
  <div class="hot">
    <topbar />
    <friendEvent />
  </div>
</template>

<script>
import topbar from "@/components/common/title/topbar.vue";
import friendEvent from "./friendevent/friendEvent.vue";
export default {
  name: "hot",
  components: {
    topbar,
    friendEvent,
  },
};
</script>

<style lang="less" scoped>
.hot {
  min-width: 1440px;
}
</style>