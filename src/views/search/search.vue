<template>
  <div class="search">
    <topbar />
    <h2>共找到{{ num }}{{ type }}</h2>
    <nav>
      <router-link
        active-class="active"
        :to="{
          path: 'searchSong',
          query: { keywords: this.$route.query.keywords },
        }"
      >
        单曲
      </router-link>
      <router-link
        active-class="active"
        :to="{
          path: 'searchArtist',
          query: { keywords: this.$route.query.keywords },
        }"
      >
        歌手
      </router-link>
      <router-link
        active-class="active"
        :to="{
          path: 'searchAlbum',
          query: { keywords: this.$route.query.keywords },
        }"
      >
        专辑
      </router-link>
      <router-link
        active-class="active"
        :to="{
          path: 'searchVideo',
          query: { keywords: this.$route.query.keywords },
        }"
      >
        视频
      </router-link>
      <router-link
        active-class="active"
        :to="{
          path: 'searchPlay',
          query: { keywords: this.$route.query.keywords },
        }"
      >
        歌单
      </router-link>
      <router-link
        active-class="active"
        :to="{
          path: 'searchUser',
          query: { keywords: this.$route.query.keywords },
        }"
      >
        用户
      </router-link>
      <router-link
        active-class="active"
        :to="{
          path: 'searchMV',
          query: { keywords: this.$route.query.keywords },
        }"
      >
        MV
      </router-link>
      <router-link
        active-class="active"
        :to="{
          path: 'searchLyric',
          query: { keywords: this.$route.query.keywords },
        }"
      >
        歌词
      </router-link>
      <router-link
        active-class="active"
        :to="{
          path: 'searchStation',
          query: { keywords: this.$route.query.keywords },
        }"
      >
        电台
      </router-link>
      <router-link
        active-class="active"
        :to="{
          path: 'searchSynthesize',
          query: { keywords: this.$route.query.keywords },
        }"
      >
        综合
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import topbar from "@/components/common/topbar.vue";
export default {
  name: "search",
  data() {
    return {
      num: 0,
      type: null,
    };
  },
  components: {
    topbar,
  },
  mounted() {
    this.$bus.$on("search", (num, type) => {
      this.num = num;
      this.type = type;
    });
  },
};
</script>

<style lang="less" scoped>
.search {
  h2 {
    padding: 20px 15%;
  }
  nav {
    display: flex;
    padding: 20px 15%;
    justify-content: space-between;
    line-height: 30px;
  }
}

.active {
  color: red;
  border-bottom: 1px solid red;
}
</style>