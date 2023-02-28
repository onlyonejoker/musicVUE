<template>
  <div class="top">
    <topbar />
    <h2>全部榜单</h2>
    <div class="">
      <play-item
        :play="item"
        v-for="(item, index) in toplist"
        :key="'top' + index"
      />
    </div>
  </div>
</template>

<script>
import PlayItem from "../../components/common/play/playItem.vue";
import topbar from "../../components/common/title/topbar.vue";
import { toplist } from "@/request/home";
export default {
  components: { topbar, PlayItem },
  name: "rankeing",
  data() {
    return {
      toplist: null,
    };
  },
  methods: {
    toplistFn() {
      toplist()
        .then((res) => {
          console.log(res);
          this.toplist = res.list;
        })
        .catch();
    },
  },
  created() {
    this.toplistFn();
  },
};
</script>

<style lang="less" scoped>
.top {
  > h2 {
    padding: 0 10%;
    margin: 20px 0;
  }
  > div {
    padding: 0 10%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>