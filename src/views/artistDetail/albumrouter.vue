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
      <div v-if="top10" class="top10">
        <songItem :song="songs10" :uid="artistUid" />
        <p @click="allSong">
          <i class="el-icon-arrow-right"></i><span> 查看全部50首</span>
        </p>
      </div>
      <div v-else class="top10">
        <songItem :song="songs" :uid="artistUid" />
        <p @click="allSong">
          <i class="el-icon-arrow-right"></i><span>收起</span>
        </p>
      </div>
      <page :more="songMore" @page="songPage" />
    </div>
    <div class="album">
      <h2>专辑</h2>
      <div>
        <albumList v-for="(item, index) in album" :album="item" :key="index" />
      </div>
      <page :more="albumMore" @page="albumPage" />
    </div>
  </div>
</template>

<script>
import songItem from "@/components/common/song/songItem.vue";
import page from "@/components/common/page/page.vue";
import albumList from "@/components/common/list/albumList.vue";
import { artistTop, artistSongs, artistAlbum } from "@/request/artist";
export default {
  name: "albumrouter",
  components: {
    songItem,
    albumList,
    page,
  },

  data() {
    return {
      songs10: [],
      songs: null,
      songMore: false,
      albumMore: false,
      order: "hot",
      songOffset: 0,
      albumOffset: 0,
      isActive: "hot",
      top10: true,
      album: null,
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
          this.songMore = res.more;
          this.songs = res.songs;
          for (let i = 0; i < 10; i++) {
            this.songs10.push(res.songs[i]);
          }
        })
        .catch();
    },
    artistSong() {
      artistSongs(this.uid, this.order, 50, this.songOffset * 50)
        .then((res) => {
          this.songMore = res.more;
          this.songs = res.songs;
          for (let i = 0; i < 10; i++) {
            this.songs10.push(res.songs[i]);
          }
        })
        .catch();
    },
    artistAlbum() {
      artistAlbum(this.uid, 50, this.albumOffset * 50)
        .then((res) => {
          this.albumMore = res.more;
          this.album = res.hotAlbums;
        })
        .catch();
    },
    //分页器
    songPage(p) {
      this.songOffset = p;
      this.artistSong();
    },
    albumPage(P) {
      this.albumOffset = P;
      this.artistAlbum();
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
    allSong() {
      this.top10 = !this.top10;
    },
  },
  mounted() {
    this.artistTop();
    this.artistAlbum();
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
    .top10 {
      p {
        display: flex;
        flex-flow: row-reverse;
        padding-right: 50px;
        span {
          margin-right: 20px;
        }
        &:hover {
          color: red;
        }
      }
    }
  }
  .album {
    position: relative;
    margin-top: 70px;
    > div {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
    }
  }
}

.active {
  color: red !important;
}
</style>