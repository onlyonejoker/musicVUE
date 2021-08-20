<template>
  <section class="song-conter">
    <div class="song-title">
      <span>歌曲</span>
      <span></span>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </div>
    <div class="song-body" v-for="(item, index) in song" :key="index">
      <span>{{ index + 1 }}.{{ item.name }}</span>
      <span class="play-btn">
        <span class="el-icon-video-play" @click="playMusic(item)"></span>
        <span class="el-icon-circle-plus-outline" @click.stop="addList(index)">
        </span>
        <span class="el-icon-share"></span>
      </span>
      <span>{{ item.al.name }}</span>
      <span>{{ item.ar[0].name }}</span>
      <span>
        {{ Math.floor(item.dt / 1000 / 60) }}:{{
          Math.floor((item.dt / 1000) % 60) > 10
            ? Math.floor((item.dt / 1000) % 60)
            : "0" + Math.floor((item.dt / 1000) % 60)
        }}
      </span>
      <div class="addList" :class="{ display: isDispaly == index }">
        <p>播放列队</p>
        <ul>
          <li>我喜欢</li>
        </ul>
        <p @click="playCreate">添加到新歌单</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "songItem",
  data() {
    return {
      isDispaly: null,
    };
  },
  components: {},
  props: { song: Array },
  methods: {
    playMusic(songs) {
      this.$store.commit("musicInfo", songs);
    },
    addList(i) {
      this.isDispaly = i;
    },
    playCreate() {
      this.$bus.$emit("create");
    },
  },
  mounted() {
    //清除添加表单
    document.addEventListener("click", (e) => {
      e.stopPropagation();
      this.isDispaly = null;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:nth-child(1) {
      width: 50%;
    }
    &:nth-child(3) {
      width: 20%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:nth-child(4) {
      width: 20%;
    }
    &:nth-child(5) {
      width: 10%;
    }
  }
}
.song-conter {
  width: 100%;
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
        &:nth-child(2) {
          position: relative;
        }
      }
    }
    .addList {
      position: absolute;
      display: none;
      width: 170px;
      height: 357px;
      top: 44px;
      left: 30%;
      z-index: 1000;
      padding: 5px 0;
      border: 1px solid white;
      p {
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        &:hover {
          background-color: red;
          color: #fff;
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
.display {
  display: flex !important;
  flex-flow: column;
  justify-content: space-between;
}
</style>