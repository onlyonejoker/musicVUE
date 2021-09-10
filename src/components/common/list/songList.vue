<template>
  <div class="newSongList" v-if="index < 9" @click="play">
    <div class="newSongList-img">
      <i class="el-icon-video-play"></i>
      <img v-lazy="newSong.picUrl" alt="" />
    </div>
    <div class="newSongList-info">
      <h4>{{ newSong.name }}</h4>
      <p>
        <span
          v-for="(item, index) in newSong.song.artists"
          :key="index"
          @click="linkArtist(item.id)"
        >
          {{ item.name }}
        </span>
      </p>
    </div>
    <div class="newSongList-time">
      {{
        Math.floor(newSong.song.duration / 60000) > 10
          ? Math.floor(newSong.song.duration / 60000)
          : "0" + Math.floor(newSong.song.duration / 60000)
      }}:
      {{
        Math.floor(Math.floor(newSong.song.duration % 60000) / 1000) > 10
          ? Math.floor(Math.floor(newSong.song.duration % 60000) / 1000)
          : "0" + Math.floor(Math.floor(newSong.song.duration % 60000) / 1000)
      }}
    </div>
  </div>
</template>

<script>
export default {
  name: "songList",
  props: { newSong: Object, index: Number },
  methods: {
    play() {
      let songs = {
        al: this.newSong.song.album,
        alia: this.newSong.song.alias,
        ar: this.newSong.song.artists,
        id: this.newSong.song.id,
        dt: this.newSong.song.duration,
        name: this.newSong.song.name,
      };
      this.$store.commit("musicInfo", songs);
    },
    linkArtist(id) {
      this.$router.push({ path: "/artistDetail", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.newSongList {
  width: 380px;
  height: 100px;
  display: flex;
  align-items: center;
  .newSongList-img {
    overflow: hidden;
    border-radius: 5px 5px;
    width: 70px;
    height: 70px;
    position: relative;
    i {
      display: flex;
      opacity: 0;
      position: absolute;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: white;
      top: 0;
      left: 0;
      width: 70px;
      height: 70px;
      transition: all 0.3s;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.493);
    }
    img {
      width: 70px;
      height: 70px;
      transition: all 0.3s;
    }
    &:hover {
      i {
        opacity: 1;
        transition: all 0.3s;
      }
      img {
        transform: scale(1.5, 1.5);
        transition: all 0.3s;
      }
    }
  }
  .newSongList-info {
    width: 180px;
    margin-left: 12px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    p {
      margin-top: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      span {
        margin-right: 5px;
        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>