<template>
  <div class="searchSong">
    <songItem :song="songs" />
    <page :more="more" @page="pageFn" />
  </div>
</template>

<script>
import songItem from "@/components/common/song/songItem.vue";
import page from "page/page.vue";
import { _search } from "@/request/search";
export default {
  name: "searchSong",
  data() {
    return {
      page: 0,
      songs: [],
      more: true,
    };
  },
  components: {
    songItem,
    page,
  },
  watch: {
    $route() {
      this.searchSong();
    },
  },
  methods: {
    searchSong() {
      _search(this.$route.query.keywords, 30, this.page * 30, 1)
        .then((res) => {
          console.log(res);
          this.songs = res.result.songs;
          this.$bus.$emit("search", res.result.songCount, "首单曲");
        })
        .catch();
    },
    pageFn(page) {
      this.page = page;
      this.searchSong();
    },
  },
  mounted() {
    this.searchSong();
  },
};
</script>

<style lang="less" scoped>
.searchSong {
  position: relative;
  padding: 20px 15%;
}
</style>