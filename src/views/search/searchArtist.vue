<template>
  <div class="searchArtist">
    <div
      v-for="(item, index) in artists"
      :key="index"
      @click="linkArtistDetail(item.id)"
      class="artists"
    >
      <img v-lazy="item.img1v1Url" alt="img1v1Url" />
      <span>{{ item.name }}</span>
    </div>
    <page :more="more" @page="pageFn" />
  </div>
</template>

<script>
import page from "page/page.vue";
import { _search } from "@/request/search";
export default {
  name: "searchArtist",
  data() {
    return {
      page: 0,
      artists: [],
      more: true,
    };
  },
  components: {
    page,
  },
  methods: {
    searchSong() {
      _search(this.$route.query.keywords, 30, this.page * 30, 100)
        .then((res) => {
          console.log(res);
          this.artists = res.result.artists;
          this.$bus.$emit("search", res.result.artistCount, "位歌手");
        })
        .catch();
    },
    pageFn(page) {
      this.page = page;
      this.searchSong();
    },
    linkArtistDetail(id) {
      this.$router.push({ path: "/artistDetail", query: { id } });
    },
  },
  mounted() {
    this.searchSong();
  },
};
</script>

<style lang="less" scoped>
.searchArtist {
  position: relative;
  padding: 20px 15%;
  .artists {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    img {
      width: 75px;
      height: 75px;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
}
</style>