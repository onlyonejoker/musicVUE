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
  bottom: 50px;
  right: 30px;
  padding-right: 5px;
  background-color: red;
  color: white;
  text-align: center;
  border-radius: 100%;
  p {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>