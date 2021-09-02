<template>
  <div class="music-play" :class="{ openplayer: openPlayer }">
    <audio
      ref="audioMin"
      @timeupdate="playFn"
      :src="audio"
      @canplay="canplay"
      @ended="ended"
      @error="error"
      crossOrigin="anonymous"
    ></audio>
    <div class="play-item" v-if="openPlayer">
      <div><img v-lazy="musicImg()" alt="" /></div>
      <div class="lyric">
        <div class="lyric-title">
          <h2>{{ info[index].name }}</h2>
          <p>{{ info[index].ar[0].name }}</p>
          <p>{{ info[index].al.name }}</p>
        </div>
        <div class="lyric-content">
          <div ref="lyricText">
            <p
              v-for="(item, index) in lyric"
              :key="index"
              :class="{ lyricTextColor: index == lyricTextColor }"
              @click="lyricScrollFn(item[1])"
            >
              <i>
                {{
                  Math.floor(item[1] / 60) >= 10
                    ? Math.floor(item[1] / 60)
                    : "0" + Math.floor(item[1] / 60)
                }}:{{
                  Math.floor(item[1] % 60) >= 10
                    ? Math.floor(item[1] % 60)
                    : "0" + Math.floor(item[1] % 60)
                }}~~~
              </i>
              <span>{{ item[0] }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="effect" v-show="openPlayer">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="player">
      <div class="music-img">
        <div>
          <img v-lazy="musicImg()" alt="img" />
          <i
            :class="{
              'el-icon-arrow-up': !openPlayer,
              'el-icon-arrow-down': openPlayer,
            }"
            @click="openPlayerFn"
          ></i>
        </div>
      </div>
      <div class="control">
        <div class="control-btn">
          <i class="el-icon-refresh" @click="playRendomFn">
            <span>
              {{ random == 0 ? "顺序" : random == 1 ? "随机" : "重复" }}
            </span>
            <div class="play-rendom" v-if="playRendom">
              <p @click="randomFn(0)">顺序播放</p>
              <p @click="randomFn(1)">随机播放</p>
              <p @click="randomFn(2)">重复播放</p>
            </div>
          </i>
          <i class="el-icon-caret-left" @click="previous"></i>
          <i
            :class="{
              'el-icon-video-play': !player,
              'el-icon-video-pause': player,
            }"
            @click="play"
          >
          </i>
          <i class="el-icon-caret-right" @click="next"></i>
          <i class="el-icon-bell" @click="volumeControlFn">
            <div class="volume" v-show="volumeControl">
              <el-slider
                v-model="volume"
                vertical
                height="100px"
                @input="volumeFn"
              ></el-slider>
            </div>
          </i>
        </div>
        <div class="control-time">
          <span>
            {{
              Math.floor(playTime / 60) >= 10
                ? Math.floor(playTime / 60)
                : "0" + Math.floor(playTime / 60)
            }}:{{
              Math.floor(playTime % 60) >= 10
                ? Math.floor(playTime % 60)
                : "0" + Math.floor(playTime % 60)
            }}
          </span>
          <el-slider v-model="schedule" @change="scheduleFn"></el-slider>
          <span>
            {{ Math.floor(duration / 60) }}:{{
              Math.floor(duration % 60) >= 10
                ? Math.floor(duration % 60)
                : "0" + Math.floor(duration % 60)
            }}
          </span>
        </div>
      </div>
      <div class="music-playlist">
        <span @click="openPlaylistFn">播放列表</span>
        <ul v-if="openPlaylist">
          <li
            v-for="(item, index) in info"
            :key="index"
            @click="PlaylistBtn(item.id, index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { music, musicLyric } from "@/request/music";
import { mapState } from "vuex";

export default {
  name: "musicPlay",
  data() {
    return {
      //歌曲信息
      audiolist: [],
      audiolistInfo: [],
      info: [],
      //歌曲播放
      index: 0,
      audio: null,
      //音量
      volume: 50,
      //进度
      playTime: 0,
      duration: 0,
      schedule: 0,
      //播放模式
      random: 0,
      //按钮控件
      player: false,
      playRendom: false,
      volumeControl: false,
      openPlayer: false,
      openPlaylist: false,
      //子组件传值
      childrenData: [],
      flag: true,
      //歌词
      lyric: [],
      lyricTime: [],
      lyricTextColor: 0,
    };
  },
  computed: {
    //获取音乐信息
    ...mapState(["musicInfo"]),
  },
  components: {},
  watch: {
    musicInfo(n) {
      let info = this.getMusic(); //读取本地音乐
      if (info) {
        Array.isArray(n) ? info.unshift(...n) : info.unshift(n); //判断是歌单还是单曲
        this.info = info; //添加信息到播放页面
        let nodup = this.nodup(info); //对象去重函数
        sessionStorage.setItem("musicInfo", JSON.stringify(nodup));
        this.musicPlay(nodup.map((e) => e.id));
      } else {
        Array.isArray(n) ? n : (n = [n]); //判断是歌单还是单曲
        this.info = n; //添加信息到播放页面
        sessionStorage.setItem("musicInfo", JSON.stringify(n));
        this.musicPlay(n.map((e) => e.id));
      }
    },
    playTime(n) {
      this.lyricTextScroll(n);
    },
  },
  methods: {
    //事件相关
    //播放
    play() {
      console.log("开始播放");
      this.player = !this.player;
      //此方法为了保证一致性
      this.audiolistInfo.forEach((e) => {
        if (e.id == this.info[this.index].id) {
          this.audio = e.url;
        }
      });
      if (!this.player) {
        this.$refs.audioMin.pause();
      } else {
        this.$refs.audioMin.load();
      }
    },
    //上一曲
    previous() {
      if (this.random == 0) {
        this.index--;
      } else if (this.random == 1) {
        this.index = Math.floor(Math.random() * this.audiolistInfo.length);
      }
      this.index < 0 ? (this.index = this.audiolistInfo.length - 1) : null;
      this.audiolistInfo.forEach((e) => {
        if (e.id == this.info[this.index].id) {
          this.audio = e.url;
        }
      });
      this.player = true;
    },
    //下一曲
    next() {
      if (this.random == 0) {
        this.index++;
      } else if (this.random == 1) {
        this.index = Math.floor(Math.random() * this.audiolistInfo.length);
      }
      this.index >= this.audiolistInfo.length ? (this.index = 0) : null;
      this.audiolistInfo.forEach((e) => {
        if (e.id == this.info[this.index].id) {
          this.audio = e.url;
        }
      });
      this.player = true;
    },
    //加载
    canplay() {
      this.$refs.audioMin.play();
      console.log("加载成功" + this.index);
      this.duration = this.$refs.audioMin.duration;
      this.$refs.lyricText.scrollTop = 0;
      this.musicLyric(this.info[this.index].id);
      document.documentElement.style.setProperty(
        "--playerBJ",
        "url(" + this.musicImg() + ")"
      );
    },
    //自动下一曲
    ended() {
      if (this.random == 0) {
        this.index++;
        this.index >= this.audiolistInfo.length ? (this.index = 0) : null;
        this.audiolistInfo.forEach((e) => {
          if (e.id == this.info[this.index].id) {
            this.audio = e.url;
          }
        });
        this.player = true;
      } else if (this.random == 1) {
        this.index = Math.floor(Math.random() * this.audiolistInfo.length);
        this.audiolistInfo.forEach((e) => {
          if (e.id == this.info[this.index].id) {
            this.audio = e.url;
          }
        });
        this.player = true;
      } else if (this.random == 2) {
        this.$refs.audioMin.load();
        this.player = true;
      }
    },
    //音量控件
    volumeControlFn() {
      this.volumeControl = !this.volumeControl;
    },
    //音量
    volumeFn() {
      this.$refs.audioMin.volume = parseFloat(this.volume / 100);
      this.volume == 0
        ? (this.$refs.audioMin.muted = true)
        : (this.$refs.audioMin.muted = false);
    },
    //进度
    playFn() {
      if (this.$refs.audioMin.currentTime !== undefined && this.openPlayer) {
        this.playTime = Math.floor(this.$refs.audioMin.currentTime);
        this.schedule = Math.floor(
          (Math.floor(this.$refs.audioMin.currentTime) /
            Math.floor(this.$refs.audioMin.duration)) *
            100
        );
      }
    },
    //跳进度
    scheduleFn() {
      if (this.$refs.audioMin.currentTime !== undefined) {
        this.$refs.audioMin.currentTime = (this.schedule / 100) * this.duration;
      }
    },
    lyricScrollFn(data) {
      if (this.$refs.audioMin.currentTime !== undefined) {
        this.$refs.audioMin.currentTime = data;
      }
    },
    //随机播放控件
    playRendomFn() {
      this.playRendom = !this.playRendom;
    },
    //随机播放
    randomFn(i) {
      this.random = i;
    },
    //缓存失败
    error() {
      this.$router.go(0);
    },
    //打开播放器
    openPlayerFn() {
      this.openPlayer = !this.openPlayer;
      if (this.openPlayer & this.flag) {
        this.huabu();
        this.flag = false;
      }
    },
    //歌词滚动
    lyricTextScroll(data) {
      if (this.lyricTime.indexOf(data) !== -1) {
        this.$refs.lyricText.scrollTop = this.$refs.lyricText.scrollTop + 40;
        this.lyricTextColor = this.lyricTime.indexOf(data);
      }
    },
    //播放列表
    openPlaylistFn() {
      this.openPlaylist = !this.openPlaylist;
    },
    //播放列表按钮
    PlaylistBtn(data, index) {
      this.audiolistInfo.forEach((e) => {
        if (e.id == data) {
          this.audio = e.url;
        }
      });
      console.log(index);
      this.index = index;
      this.player = true;
    },

    //数据相关
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
      let nodup = [];
      for (let i = 0; i < info.length; i++) {
        let flag = true;
        for (let j = i + 1; j < info.length; j++) {
          if (info[i].id == info[j].id) {
            flag = false;
            break;
          }
        }
        if (flag) {
          nodup.unshift(info[i]);
        }
      }
      return nodup;
    },
    //选择音乐图片
    musicImg() {
      let img = null;
      let id = null;
      if (this.audiolistInfo && this.info) {
        this.audiolistInfo.forEach((e) => {
          if (e.url == this.audio) {
            id = e.id;
          }
        });
        this.info.forEach((e) => {
          if (e.id == id) {
            img = e.al.picUrl;
          }
        });
      }
      return img;
    },
    //ui控件设置
    setUi() {
      document.querySelectorAll(".el-slider__bar").forEach((e) => {
        e.style.backgroundColor = "red";
      });
      document.querySelectorAll(".el-tooltip").forEach((e) => {
        e.style.backgroundColor = "red";
      });
      document.querySelectorAll(".el-slider__runway").forEach((e) => {
        e.style.margin = 0;
      });
      console.log("ui控件设置完毕");
    },
    //画布
    huabu() {
      this.$nextTick(() => {
        this.$audio.audio = this.$refs.audioMin;
        this.$audio.canvas = this.$refs.canvas;
        this.$audio.openPlayer();
      });
    },
    //歌词处理
    lyricData(lyricDatas) {
      this.lyric = [];
      this.lyricTime = [];
      lyricDatas.split("\n").forEach((e, i) => {
        if (e.length >= 1) {
          let lyricData = e.split("[")[1].split("]");
          let rg = /^[0-9]{2}:[0-9]{2}.[0-9]{2,10}$/;

          if (!rg.test(lyricData[0])) {
            this.lyric.push([lyricData[1], i]);
          } else {
            let time = lyricData[0].split(".")[0].split(":");
            let times = time[0] * 60 + parseInt(time[1]);
            this.lyric.push([lyricData[1], times]);
          }
        }
      });
      //将处理好的歌词事件保存
      if (this.lyric.length >= 1) {
        this.lyric.forEach((e) => {
          this.lyricTime.push(e[1]);
        });
      }
    },

    //请求相关
    //获取音乐
    musicPlay(musicId) {
      music(musicId)
        .then((res) => {
          console.log(res);
          this.audiolist.push(...res.data.map((e) => e.url));
          this.music = this.audiolist[0];
          this.audiolistInfo = res.data;
        })
        .catch(() => {});
    },
    musicLyric(id) {
      musicLyric(id)
        .then((res) => {
          console.log(res);
          this.lyricData(res.lrc.lyric);
        })
        .catch();
    },
  },
  mounted() {
    this.getMusic() ? this.musicPlay(this.getMusic().map((e) => e.id)) : null;
    this.info = this.getMusic();
    this.childrenData.push(this.$refs.audioMin);
    //ui控件设置
    this.setUi();
  },
};
</script>

<style lang="less" scoped>
.music-play {
  width: 100vw;
  min-width: 800px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  .play-item {
    width: 100%;
    height: calc(100vh - 244px);
    display: flex;
    > div {
      width: 50%;
      height: 100%;
      &:nth-child(1) {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 300px;
          height: 300px;
        }
      }
    }
    .lyric {
      display: flex;
      flex-flow: column;
      color: white;
      padding: 50px 0 20px;
      .lyric-title {
        height: 20%;
        width: 100%;
        text-align: center;
        line-height: 20px;
        p {
          margin: 5px 0;
          font-size: 14px;
        }
      }
      .lyric-content {
        text-align: center;
        height: 80%;
        width: 100%;
        position: relative;
        div {
          text-align: center;
          overflow: scroll;
          height: 100%;
          width: 100%;
          padding: 32px 0;
          &::-webkit-scrollbar {
            width: 0px; //左侧滚动条宽度
            height: 0px; //下侧滚动高度
          }
          p {
            line-height: 20px;
            margin: 20px 0;
            position: relative;
            i {
              position: absolute;
              left: 0;
              opacity: 0;
              font-size: 14px;
              font-style: normal;
            }
            &:hover {
              i {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
  .effect {
    height: 200px;
    color: rgb(250, 14, 199);
  }
  .player {
    width: 100%;
    height: 44px;
    display: flex;
    background: #0000005d;
    background: -webkit-linear-gradient(to right, #f0acf7, #acf7f0, #f7f0ac);
    background: linear-gradient(to right, #6a5c6d, #72918e, #747158);
    .music-img {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        position: relative;
        overflow: hidden;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        &:hover {
          img {
            transform: scale(1.5);
            transition: all 0.5s;
          }
          i {
            opacity: 1;
            transition: all 0.5s;
          }
        }
        img {
          width: 30px;
          height: 30px;
          border-radius: 100%;
          transition: all 0.5s;
        }
        i {
          color: white;
          display: flex;
          opacity: 0;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 100%;
          width: 30px;
          height: 30px;
          background-color: rgba(0, 0, 0, 0.315);
          transition: all 0.5s;
        }
      }
    }
    .control {
      width: 80%;
      height: 44px;
      display: flex;
      flex-flow: column;
      align-items: center;
      margin-top: 5px;
      .control-btn {
        font-size: 16px;
        color: rgb(255, 255, 255);
        line-height: 20px;
        i {
          margin: 0 10px;
          position: relative;
          &:hover {
            color: red;
          }
          .volume {
            position: absolute;
            top: -130px;
            left: 0;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12),
              0 0 6px rgba(0, 0, 0, 0.04);
            background-color: #8b8b8b;
            width: 26px;
            padding: 10px;
          }
        }
      }
      .control-time {
        width: 80%;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: white;
        .el-slider {
          width: 100%;
          padding: 0 20px;
        }
      }
      .el-icon-refresh {
        position: relative;
        span {
          font-size: 12px;
        }
        .play-rendom {
          position: absolute;
          top: -120px;
          left: 0;
          width: 100px;
          border: 1px solid white;
          padding: 10px 0;
          &:hover {
            color: black;
          }
          p {
            line-height: 30px;
            text-align: center;
            &:hover {
              color: rgb(255, 0, 0);
            }
          }
        }
      }
    }
    .music-playlist {
      width: 10%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      line-height: 30px;
      span {
        padding: 0 10px;
        border: 1px solid white;
        border-radius: 30px 30px;
        &:active {
          color: black;
          background-color: white;
        }
      }
      ul {
        position: absolute;
        width: 150px;
        height: 200px;
        top: -200px;
        left: -100px;
        padding: 15px 0;
        overflow: scroll;
        border: 1px solid white;
        background: #0000005d;
        background: -webkit-linear-gradient(
          to right,
          #f0acf7,
          #acf7f0,
          #f7f0ac
        );
        background: linear-gradient(to right, #6a5c6d, #72918e, #747158);
        &::-webkit-scrollbar {
          width: 0px; //左侧滚动条宽度
          height: 0px; //下侧滚动高度
        }
        li {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 10px;
          &:hover {
            color: red;
            background-color: white;
          }
        }
      }
    }
  }
}
.openplayer {
  background-color: black;
  &::before {
    content: "";
    position: absolute;
    background-image: var(--playerBJ);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    filter: blur(10px);
    display: block;
    width: 100%;
    height: 100%;
    z-index: -2;
  }
  &::after {
    background-color: rgba(0, 0, 0, 0.4);
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .player {
    background: transparent;
    background: -webkit-linear-gradient(transparent);
    background: linear-gradient(transparent);
    .music-playlist {
      ul {
        background: transparent;
        background: -webkit-linear-gradient(transparent);
        background: linear-gradient(transparent);
      }
    }
  }
}
.lyricTextColor {
  color: red;
}
</style>