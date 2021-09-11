<template>
  <div class="dj">
    <topbar />
    <div class="dj-cate">
      <span
        v-for="(item, index) in djCatelist"
        :key="'djCatelist' + index"
        @click="typeFn(item.id)"
      >
        {{ item.name }}
      </span>
    </div>
    <div class="dj-list">
      <dj-list :dj="item" v-for="(item, index) in dj" :key="index" />
      <page :more="more" @page="pageFn" />
    </div>
  </div>
</template>

<script>
import { djCatelist, djRecommendType } from "@/request/dj";
import topbar from "../../components/common/topbar.vue";
import DjList from "../../components/common/list/djList.vue";
import Page from "../../components/common/page/page.vue";
export default {
  components: { topbar, DjList, Page },
  name: "dj",
  data() {
    return {
      djCatelist: null,
      dj: null,
      more: false,
      page: 0,
      type: null,
    };
  },
  methods: {
    djCatelistFn() {
      djCatelist()
        .then((res) => {
          this.djCatelist = res.categories;
          this.type = res.categories[0].id;
          this.djRecommendType();
        })
        .catch();
    },
    djRecommendType() {
      djRecommendType(this.type, 10, this.page * 10)
        .then((res) => {
          console.log(res);
          this.dj = res.djRadios;
          this.more = res.hasMore;
        })
        .catch();
    },
    pageFn(page) {
      this.page = page;
      this.djRecommendType();
    },
    typeFn(id) {
      this.type = id;
      this.djRecommendType();
    },
  },
  mounted() {
    this.djCatelistFn();
  },
};
</script>

<style lang="less" scoped>
.dj {
  .dj-cate {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10%;
    margin: 20px 0;
    span {
      width: 100px;
      padding: 10px;
      border-radius: 10px 10px;
      &:active {
        color: red;
      }
    }
  }
  .dj-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10%;
    position: relative;
    margin-bottom: 100px;
  }
}
</style>