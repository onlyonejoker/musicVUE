<template>
  <div></div>
</template>

<script>
export default {
  name: "effect",
  props: { audio: Array, openPlayer: Boolean },
  watch: {
    openPlayer() {
      console.log("监听到了");
    },
  },
  created() {},
  mounted() {
    setTimeout(() => {}, 1000);
  },
};
</script>

<style lang="less" scoped>
</style>