<template>
  <div class="searchAlbum">
    <div>
      <videos :video="item" v-for="(item, index) in video" :key="index" />
    </div>
    <page :more="more" @page="pageFn" />
  </div>
</template>

<script>
import page from "page/page.vue";
import { _search } from "@/request/search";
import Videos from "../../components/common/list/video.vue";
export default {
  name: "searchAlbum",
  data() {
    return {
      page: 0,
      video: [],
      more: true,
    };
  },
  components: {
    page,
    Videos,
  },
  methods: {
    searchAlbum() {
      _search(this.$route.query.keywords, 30, this.page * 30, 1014)
        .then((res) => {
          this.video = res.result.videos;
          this.$bus.$emit("search", res.result.videoCount, "个视频");
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
  > div {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>