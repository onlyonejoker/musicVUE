//参数more 点击时发射页码
<template>
  <div class="block">
    <span @click="reducePage" class="el-icon-arrow-left"></span>
    <span>{{ page }}</span>
    <span @click="addPage" class="el-icon-arrow-right" ref="pageCCC"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 0,
    };
  },
  props: { more: Boolean },
  watch: {
    //分页
    more(n) {
      this.forbidClick(n);
    },
  },
  methods: {
    addPage() {
      this.page++;
      this.$emit("page", this.page);
    },
    //分页限制
    reducePage() {
      this.page--;
      this.page <= 0 ? (this.page = 0) : this.page;
      this.$emit("page", this.page);
    },
    //判断是否可以分页
    forbidClick(more) {
      !more
        ? (this.$refs.pageCCC.style.pointerEvents = "none")
        : (this.$refs.pageCCC.style.pointerEvents = null);
    },
  },
  mounted() {
    this.forbidClick(this.more);
  },
};
</script>

<style lang="less" scoped>
.block {
  position: absolute;
  min-width: 500px;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  span {
    display: inline-block;
    width: 100px;
    height: 20px;
    text-align: center;
  }
}
</style>