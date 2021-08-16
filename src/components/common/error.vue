<template>
  <div v-if="display">
    {{value}}错误
  </div>
</template>

<script>
export default {
  name: "error",
  data() {
    return {
      display: false,
      value: "",
    };
  },
  methods: {
    error() {
      this.$bus.$on("error", (value) => {
        this.display = true;
        this.value = value;
      });
    },
  },
  mounted() {
    this.error();
  },
};
</script>

<style lang="less" scoped>
  div {
    height: 30px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50% -50%);
    color: red;
    font-size: 25px;
    line-height: 30px;
    text-align: center;
  }
</style>