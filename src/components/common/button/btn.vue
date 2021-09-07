<template>
  <div class="btn">
    <span :class="icon"></span>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "btn",
  props: {
    icon: {
      type: String,
      default() {
        return null;
      },
    },
    text: {
      type: String,
      default() {
        return null;
      },
    },
  },
};
</script>


<style lang="less" scoped>
.btn {
  min-width: 120px;
  height: 38px;
  border: 1px solid white;
  display: inline-block;
  text-align: center;
  padding: 0 10px;
  line-height: 38px;
  background-color: transparent;
  &:active {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.63);
  }
}
</style>