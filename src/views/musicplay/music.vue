<template>
  <div class="music-play" @click="manualNext">
    <audio :src="music" controls autoplay @ended="autoNext" ref="audio"></audio>
    <div class="music-list-box">
      <div class="music-list">
        <p v-for="(item,index) in musicName" :key="index">{{index+1+item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { music } from "@/request/music";

export default {
  name: "musicPlay",
  data() {
    return {
      index: 0,
      musicList: [],
      music: "",
      musicName: null,
    };
  },
  computed: {
    //获取音乐信息
    musicInfo() {
      return this.$store.state.musicInfo;
    },
  },
  watch: {
    musicInfo(n) {
      let info = this.getMusic(); //读取本地音乐
      if (info) {
        console.log(n);
        Array.isArray(n) ? info.push(...n) : info.push(n); //判断是歌单还是单曲
        let nodup = this.nodup(info); //对象去重函数
        sessionStorage.setItem("musicInfo", JSON.stringify(nodup));
        this.musicPlay(nodup.map((e) => e.id));
      } else {
        Array.isArray(n) ? n : (n = [n]); //判断是歌单还是单曲
        sessionStorage.setItem("musicInfo", JSON.stringify(n));
        this.musicPlay(n.map((e) => e.id));
      }
    },
  },
  methods: {
    //自动下一曲
    autoNext() {
      this.index >= this.music.length ? (this.index = 0) : this.index;
      this.index++;
      this.music = this.musicList[this.index];
      console.log(1);
    },
    //手动下一曲
    manualNext() {
      this.index >= this.music.length ? (this.index = 0) : this.index;
      this.index++;
      this.music = this.musicList[this.index];
      console.log(this.index);
    },
    //存储音乐信息
    setMusicInfo(musicInfo) {
      sessionStorage.setItem("musicInfo", JSON.stringify(musicInfo));
    },
    //读取本地音乐信息
    getMusic() {
      return JSON.parse(sessionStorage.getItem("musicInfo"));
    },
    //歌曲去重
    nodup(info) {
      let map = new Map();
      for (const item of info) {
        if (!map.has(item.id)) {
          map.set(item.id, item);
        }
      }
      let arr = [...map];
      let nodup = [];
      arr.forEach((e) => {
        nodup.push(e[1]);
      });
      return nodup;
    },
    //获取音乐
    musicPlay(musicId) {
      music(musicId)
        .then((res) => {
          console.log(res);
          this.musicList.push(...res.data.map((e) => e.url));
          this.music = this.musicList[0];
        })
        .catch();
    },
  },
  mounted() {
    this.getMusic() ? this.musicPlay(this.getMusic().map((e) => e.id)) : null;
  },
};
</script>

<style lang="less" scoped>
  .music-play {
    width: 100%;
    min-width: 800px;
    height: 44px;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0 15%;
  }
</style>