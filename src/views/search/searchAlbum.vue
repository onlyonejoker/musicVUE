<template>
  <div class="searchAlbum">
    <div
      v-for="(item, index) in albums"
      @click="linkAlbumDetail(item.id)"
      :key="index"
      class="albums"
    >
      <img v-lazy="item.picUrl" alt="picUrl" />
      <span>{{ item.name }}</span>
      <span>{{ item.artist.name }}</span>
    </div>
    <page :more="more" @page="pageFn" />
  </div>
</template>

<script>
import page from "page/page.vue";
import { _search } from "@/request/search";
export default {
  name: "searchAlbum",
  data() {
    return {
      page: 0,
      albums: [],
      more: true,
    };
  },
  components: {
    page,
  },
  methods: {
    searchAlbum() {
      _search(this.$route.query.keywords, 30, this.page * 30, 10)
        .then((res) => {
          console.log(res);
          this.albums = res.result.albums;
          this.$bus.$emit("search", res.result.albumCount, "张专辑");
        })
        .catch();
    },
    pageFn(page) {
      this.page = page;
      this.searchAlbum();
    },
    linkAlbumDetail(id) {
      this.$router.push({ path: "/albumDetail", query: { id } });
    },
  },
  mounted() {
    this.searchAlbum();
  },
};
</script>

<style lang="less" scoped>
.searchAlbum {
  position: relative;
  padding: 20px 15%;
  .albums {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 75px;
      height: 75px;
      border-radius: 10px;
      margin-right: 20px;
    }
  }
}
</style>