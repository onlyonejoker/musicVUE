<template>
  <div class="myPlay">
    <playItem v-for="(item,index) in myPlay" :key="index" :play="item" />
  </div>
</template>

<script>
import playItem from "@/components/common/play/playItem.vue";

export default {
  name: "myPlay",
  components: {
    playItem,
  },
  data() {
    return {};
  },
  computed: {
    myPlay() {
      if (this.$store.state.play !== null) {
        return this.$store.state.play.myPlay;
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="less" scoped>
  .myPlay {
    display: flex;
    flex-wrap: wrap;
  }
</style>