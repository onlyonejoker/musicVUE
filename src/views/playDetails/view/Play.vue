<template>
  <div class="Play">
    <playItem v-for="(item,index) in myPlay" :key="index" :playUrl="item.coverImgUrl" :playName="item.name" :id="{id:item.id,e:2}" />
  </div>
</template>

<script>
import playItem from "@/components/common/play/playItem.vue";

export default {
  name: "Play",
  components: {
    playItem,
  },
  data() {
    return {};
  },
  computed: {
    myPlay() {
      return this.$bus.play.myPlay;
    },
  },
};
</script>

<style lang="less" scoped>
  .Play {
    display: flex;
    flex-wrap: wrap;
  }
</style>