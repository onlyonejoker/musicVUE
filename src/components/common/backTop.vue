<template>
  <div class="backTop" @click="backTop">
    <p>回到顶部</p>
  </div>
</template>

<script>
export default {
  name: "backTop",
  methods: {
    backTop() {
      document.querySelector("#app").scrollIntoView({
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.backTop {
  width: 50px;
  height: 50px;
  position: fixed;
  z-index: 2000;
  bottom: 30px;
  right: 30px;
  padding-right: 5px;
}
</style>