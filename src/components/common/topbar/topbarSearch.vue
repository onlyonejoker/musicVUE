<template>
  <div class="search">
    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2" size="mini" type="search">
    </el-input>
    <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
  </div>
</template>

<script>
import { _search } from "@/request/search.js";
export default {
  name: "search",
  data() {
    return {
      input2: "",
    };
  },
  methods: {
    search() {
      _search(this.input2)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
  .search {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .el-button {
      color: black;
      padding: 0;
      line-height: 26px;
      margin-left: 10px;
    }
  }
</style>