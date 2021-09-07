<template>
  <section class="song-conter" v-if="song">
    <div class="song-title">
      <span>歌曲</span>
      <span></span>
      <span>专辑</span>
      <span>歌手</span>
      <span>时长</span>
    </div>
    <div class="song-body" v-for="(item, index) in song" :key="index">
      <span>
        <i
          :class="{
            'el-icon-star-off': myLike.indexOf(item.id) == -1,
            'el-icon-star-on': myLike.indexOf(item.id) !== -1,
          }"
          @click="like(item.id)"
        ></i>
        <span @click="songDetail(item.id)" class="song-name">
          {{ index + 1 }}.{{ item.name }}
        </span>
      </span>
      <span class="play-btn">
        <span class="el-icon-video-play" @click="playMusic(item)"></span>
        <span class="el-icon-circle-plus-outline" @click.stop="addList(index)">
        </span>
        <span class="el-icon-share" @click.stop="share(item.id)"></span>
        <span
          v-if="uid == myid"
          class="el-icon-delete"
          @click.stop="delList(item.id)"
        ></span>
        <span class="el-icon-download" @click="downLoadSong(item.id)"></span>
      </span>
      <span class="artist-name" @click="albumDetail(item.al.id)">
        {{ item.al.name }}
      </span>
      <span class="album-name" @click="artistDetail(item.ar[0].id)">
        {{ item.ar[0].name }}
      </span>
      <span>
        {{ Math.floor(item.dt / 1000 / 60) }}:
        {{
          Math.floor((item.dt / 1000) % 60) > 10
            ? Math.floor((item.dt / 1000) % 60)
            : "0" + Math.floor((item.dt / 1000) % 60)
        }}
      </span>
      <add-play :isDispaly="isDispaly" :index="index" :ids="item.id + ''" />
    </div>
  </section>
</template>

<script>
import addPlay from "common/add/addPlay.vue";
import { likelist, like } from "@/request/user";
import { music } from "@/request/music";
export default {
  name: "songItem",
  data() {
    return {
      isDispaly: null,
      myid: this.$store.state.login.account.id,
      myLike: [],
    };
  },
  components: {
    addPlay,
  },
  props: { song: Array, uid: [Number, String] },
  methods: {
    //请求相关
    //我喜欢的音乐列表
    isLike() {
      likelist(this.myid)
        .then((res) => {
          this.myLike.splice(0, this.myLike.length);
          this.myLike.push(...res.ids);
        })
        .catch();
    },
    //喜欢,取消喜欢
    like(id) {
      if (this.myLike.indexOf(id) == -1) {
        like(id, true)
          .then(() => {
            this.myLike.push(id);
          })
          .catch();
      } else {
        like(id, false)
          .then(() => {
            this.myLike.splice(this.myLike.indexOf(id), 1);
          })
          .catch();
      }
    },
    //分享歌曲

    //事件相关
    //歌曲详情
    songDetail(id) {
      this.$router.push({ path: "/song", query: { id } });
    },
    //歌手详情
    artistDetail(id) {
      this.$router.push({ path: "/artistDetail", query: { id } });
    },
    //专辑详情
    albumDetail(id) {
      this.$router.push({ path: "/albumDetail", query: { id } });
    },
    //歌手详情
    addList(i) {
      this.isDispaly = i;
    },
    //下载
    downLoadSong(id) {
      music(id)
        .then((res) => {
          this.downLoad(res.data[0].url);
        })
        .catch();
    },
    downLoad(url) {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.blob();
          }
        })
        .then((blob) => {
          let blobUrl = window.URL.createObjectURL(blob);
          let name = Math.floor(Math.random() * 10000000000).toString(32);
          downloadBlob(blobUrl, name);
        })
        .catch((e) => console.error(e));
      function downloadBlob(blob, filename) {
        var a = document.createElement("a");
        a.download = filename;
        a.href = blob;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    },
    //发射音乐到播放列表
    playMusic(songs) {
      this.$store.commit("musicInfo", songs);
    },
    //发射创建歌单事件
    playCreate() {
      this.$bus.$emit("create");
    },
    //向父级元素发送删除事件
    delList(id) {
      this.$bus.$emit("del", id);
    },
    //分享歌曲
    share(id) {
      this.$bus.$emit("fenxiang", id, "song");
    },
  },
  mounted() {
    //清除添加表单
    this.isLike();
    console.log(this.song);
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
      > span {
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
    .play-btn {
      width: 30%;
      height: 100%;
      display: none;
      span {
        display: block;
        font-size: 26px;
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
  .el-icon-star-on {
    color: red !important;
  }
}
.song-name {
  &:hover {
    color: red;
  }
}
.artist-name {
  &:hover {
    color: red;
  }
}
.album-name {
  &:hover {
    color: red;
  }
}
</style>