
<template>
  <div class="mySubPlay">
    <playItem v-for="(item,index) in collectPlay" :key="index" :play="item" />
  </div>
</template>

<script>
import playItem from "@/components/common/play/playItem.vue";

export default {
  name: "mySubPlay",
  components: {
    playItem,
  },
  data() {
    return {};
  },
  computed: {
    collectPlay() {
      if (this.$store.state.play !== null) {
        return this.$store.state.play.collectPlay;
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .mySubPlay {
    display: flex;
    flex-wrap: wrap;
  }
</style>