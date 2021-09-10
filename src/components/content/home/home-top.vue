<template>
  <div
    class="homeTop"
    :style="{ backgroundColor: color[index] }"
    v-if="index < 5"
    @click="play"
  >
    <p>巅峰榜</p>
    <h2>{{ top.name }}</h2>
    <div class="split"></div>
    <i class="el-icon-video-play"></i>
    <div class="song">
      <div v-for="(item, index) in song" :key="'topSong' + index">
        <p>
          <span>NO:{{ index + 1 }}</span>
          <span>{{ item.name }}</span>
        </p>
        <p>{{ item.ar[0].name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { playDetail, songDetail } from "@/request/playList";
export default {
  name: "homeTop",
  props: { top: Object, index: Number },
  data() {
    return {
      color: [
        "PaleVioletRed",
        "PaleVioletRed",
        "CornflowerBlue",
        "LightSkyBlue",
        "LightSkyBlue",
      ],
      song: null,
      ids: null,
    };
  },
  methods: {
    //请求相关
    playDetail() {
      playDetail(this.top.id)
        .then((res) => {
          this.ids = res.playlist.trackIds.map((e) => {
            return e.id;
          });
          res.playlist.tracks.splice(5);
          this.song = res.playlist.tracks;
        })
        .catch();
    },
    //事件相关
    play() {
      songDetail(this.ids.join(","))
        .then((res) => {
          console.log(res);
          this.$store.commit("musicInfo", res.songs);
        })
        .catch();
    },
  },
  mounted() {
    if (this.index < 5) {
      this.playDetail();
    }
  },
};
</script>

<style lang="less" scoped>
.homeTop {
  width: 224px;
  height: 567px;
  padding: 20px;
  color: white;
  position: relative;
  > p {
    text-align: center;
  }
  h2 {
    margin-top: 10px;
    text-align: center;
  }
  .split {
    width: 100px;
    height: 2px;
    background-color: white;
    margin: 20px auto;
    opacity: 1;
    transition: all 0.3s;
  }
  .el-icon-video-play {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    font-size: 46px;
    transition: all 0.3s;
  }
  .song {
    height: 400px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    div {
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
          margin-right: 20px;
        }
        margin-bottom: 10px;
        &:nth-child(2) {
          padding-left: 58px;
        }
      }
    }
  }
  &:hover {
    .split {
      opacity: 0;
      transition: all 0.3s;
    }
    .el-icon-video-play {
      opacity: 1;
      transition: all 0.3s;
    }
  }
}
</style>