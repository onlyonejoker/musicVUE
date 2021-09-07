<template>
  <div class="albunCollect">
    <albumList :album="item" v-for="(item, index) in albumList" :key="index" />
    <page :more="more" @page="pages" />
  </div>
</template>

<script>
import { albumSublist } from "@/request/collect";
import albumList from "@/components/common/list/albumList.vue";
import page from "@/components/common/page/page.vue";
export default {
  name: "albunCollect",
  data() {
    return {
      albumList: [],
      page: 0,
      more: false,
    };
  },
  computed: {
    //优先路由id，获取用户信息参数
    uid() {
      return this.$store.state.login.account.id || null;
    },
  },
  components: {
    albumList,
    page,
  },
  watch: {
    //分页
    page() {
      this.songLists();
    },
  },
  methods: {
    //接受分液器事件
    pages(data) {
      this.page = data;
    },
    //请求关注列表
    albumSublist() {
      albumSublist(50, this.page * 50)
        .then((res) => {
          console.log(res);
          this.albumList = res.data;
          this.more = res.hasMore;
        })
        .catch();
    },
  },
  mounted() {
    this.albumSublist();
  },
};
</script>

<style lang="less" scoped>
.albunCollect {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10% 0;
  position: relative;
  min-height: 50vh;
}
</style>