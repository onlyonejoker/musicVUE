<template>
  <div class="searchPlay">
    <div class="play-item">
      <playItem :play="item" v-for="(item, index) in playlists" :key="index" />
    </div>
    <page :more="more" @page="pageFn" />
  </div>
</template>

<script>
import playItem from "@/components/common/play/playItem.vue";
import page from "page/page.vue";
import { _search } from "@/request/search";
export default {
  name: "searchPlay",
  data() {
    return {
      page: 0,
      playlists: [],
      more: true,
    };
  },
  components: {
    playItem,
    page,
  },
  methods: {
    searchPlay() {
      _search(this.$route.query.keywords, 30, this.page * 30, 1000)
        .then((res) => {
          console.log(res);
          this.playlists = res.result.playlists;
          this.$bus.$emit("search", res.result.playlistCount, "个歌单");
        })
        .catch();
    },
    pageFn(page) {
      this.page = page;
      this.searchPlay();
    },
  },
  mounted() {
    this.searchPlay();
  },
};
</script>

<style lang="less" scoped>
.searchPlay {
  position: relative;
  padding: 20px 15%;
  .play-item {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>