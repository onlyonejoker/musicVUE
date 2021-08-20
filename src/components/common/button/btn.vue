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
  width: 120px;
  height: 38px;
  border: 1px solid white;
  display: inline-block;
  text-align: center;
  line-height: 38px;
  background-color: transparent;
  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.63);
  }
}
</style>