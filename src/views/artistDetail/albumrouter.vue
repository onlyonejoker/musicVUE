<template>
  <div class="albumrouter">
    <div class="hot">
      <h2>全部歌曲</h2>
      <p>
        <span :class="{ active: isActive == 'hot' }" @click="hotBtn">
          热门
        </span>
        <span :class="{ active: isActive == 'time' }" @click="timeBtn">
          时间
        </span>
      </p>
      <songItem :song="songs" :uid="artistUid" />
      <page :more="more" @page="page" />
    </div>
  </div>
</template>

<script>
import songItem from "@/components/common/song/songItem.vue";
import page from "@/components/common/page/page.vue";
import { artistTop, artistSongs } from "@/request/artist";
export default {
  name: "albumrouter",
  components: {
    songItem,
    page,
  },

  data() {
    return {
      songs: null,
      more: false,
      order: "hot",
      offset: 0,
      isActive: "hot",
    };
  },
  computed: {
    uid() {
      return this.$route.query.id;
    },
    artistUid() {
      return this.$store.state.artistUid;
    },
  },
  methods: {
    artistTop() {
      artistTop(this.uid)
        .then((res) => {
          this.more = res.more;
          this.songs = res.songs;
        })
        .catch();
    },
    artistSong() {
      artistSongs(this.uid, this.order, 50, this.offset)
        .then((res) => {
          this.more = res.more;
          this.songs = res.songs;
        })
        .catch();
    },
    //分页器
    page(p) {
      this.offset = p;
      this.artistSong();
    },
    //事件相关
    timeBtn() {
      this.order = "time";
      this.isActive = "time";
      this.artistSong();
    },
    hotBtn() {
      this.order = "hot";
      this.isActive = "hot";
      this.artistSong();
    },
  },
  mounted() {
    this.artistTop();
  },
};
</script>

<style lang="less" scoped>
.albumrouter {
  .hot {
    position: relative;
    > p {
      margin: 20px 0;
      span {
        margin-right: 10px;
      }
    }
  }
}
.active {
  color: red !important;
}
</style>