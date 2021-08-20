<template>
  <div class="play-song">
    <section class="song-conter">
      <div class="song-title">
        <span>歌曲</span>
        <span></span>
        <span>歌手</span>
        <span>专辑</span>
        <span>时长</span>
      </div>
      <div class="song-body" v-for="(item, index) in song.songs" :key="index">
        <span>{{ index + 1 }}.{{ item.name }}</span>
        <span class="play-btn">
          <span class="el-icon-video-play" @click="playMusic(item)"></span>
          <span class="el-icon-circle-plus-outline"></span>
          <span class="el-icon-share"></span>
        </span>
        <span>{{ item.al.name }}</span>
        <span>{{ item.ar[0].name }}</span>
        <span
          >{{ Math.floor(item.dt / 1000 / 60) }}:{{
            Math.floor((item.dt / 1000) % 60) > 10
              ? Math.floor((item.dt / 1000) % 60)
              : "0" + Math.floor((item.dt / 1000) % 60)
          }}</span
        >
      </div>
    </section>
    <section class="intro">
      <p>简介</p>
      <p>{{ playlist.description }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "playSong",
  data() {
    return {
      playlist: {},
      song: {},
    };
  },
  methods: {
    playMusic(songs) {
      this.$store.commit("musicInfo", songs);
    },
  },
  mounted() {
    this.$bus.$on("playItem", (res, play) => {
      this.playlist = play;
      this.song = res;
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
  }
}
</style>