<template>
  <div class="play-song">
    <section class="song-conter">
      <songItem :song="song" @del="del" :uid="playlist.creator.userId" />
    </section>
    <section class="intro">
      <h4>简介</h4>
      <p>{{ playlist.description }}</p>
      <div>
        <h4>推荐歌单</h4>
        <related :play="item" v-for="(item, index) in related" :key="index" />
      </div>
    </section>
  </div>
</template>

<script>
import songItem from "../common/song/songItem.vue";
import { playTracks, relatedPlaylist } from "@/request/playList";
import related from "../common/play/related.vue";
export default {
  name: "playSong",
  data() {
    return {
      playlist: { id: null, creator: { userId: 0 } },
      song: [],
      related: [],
    };
  },
  components: {
    songItem,
    related,
  },

  methods: {
    //发射歌曲到播放器
    playMusic(songs) {
      this.$store.commit("musicInfo", songs);
    },
    //删除歌单歌曲
    del(id) {
      playTracks("del", this.playlist.id, id)
        .then(() => {
          this.$router.go(0);
        })
        .catch();
    },
    relatedPlaylist(id) {
      relatedPlaylist(id)
        .then((res) => {
          console.log(res);
          this.related = res.playlists;
        })
        .catch();
    },
  },
  mounted() {
    //接受歌单详情
    this.$bus.$on("playItem", (res, play) => {
      this.playlist = play;
      this.song = res.songs;
      this.relatedPlaylist(play.id);
    });
  },
};
</script>

<style lang="less" scoped>
.Method {
  height: 44px;
  line-height: 44px;
  color: rgb(75, 75, 75);
  display: flex;
  padding-right: 10%;
  position: relative;
  span {
    &:nth-child(1) {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:nth-child(3) {
      width: 20%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:nth-child(4) {
      width: 20%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:nth-child(5) {
      width: 10%;
    }
  }
}
.play-song {
  padding: 0 10%;
  display: flex;
  .song-conter {
    width: 80%;
    min-width: 500px;
    .song-title {
      .Method;
    }
    .song-body {
      .Method;
      &:hover {
        .play-btn {
          display: flex;
          justify-content: center;
        }
        span {
          &:nth-child(1) {
            width: 20%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .play-btn {
        width: 30%;
        height: 100%;
        display: none;
        span {
          display: block;
          font-size: 36px;
          color: rgba(0, 0, 0, 0.466);
          line-height: 44px;
          width: 33%;
          text-align: center;
          &:hover {
            color: red;
          }
        }
      }
    }
  }
  .intro {
    width: 20%;
    min-width: 200px;
    p {
      &:nth-child(2) {
        line-height: 20px;
        font-size: 14px;
        &::before {
          content: "";
          display: block;
          float: left;
          width: 14px;
          height: 14px;
        }
      }
    }
    > div {
      h4 {
        width: 100%;
        margin-bottom: 20px;
      }
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
    }
  }
}
</style>