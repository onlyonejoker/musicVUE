<template>
  <div class="songEvent">
    <div>
      <div @click="playMusic(song.id)">
        <img :src="song.album.blurPicUrl" alt="song" />
        <i class="el-icon-video-play"></i>
      </div>
      <p>
        <router-link :to="{ path: '/song', query: { id: song.id } }">{{
          song.name
        }}</router-link>
        <span>{{ song.album.artists[0].name }}</span>
      </p>
    </div>
    <div @click="playMusic(song.id)">
      <img :src="song.album.blurPicUrl" alt="song" />
      <i class="el-icon-video-play"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "songEvent",
  props: { song: Object },
  methods: {
    playMusic(id) {
      this.$store.commit("musicInfo", id);
    },
  },
};
</script>

<style lang="less" scoped>
.songEvent {
  padding-left: 56px;
  > div {
    &:nth-child(1) {
      padding: 5px;
      background-color: white;
      margin: 10px 0;
      display: flex;
      > p {
        margin-left: 10px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
      }
      > div {
        width: 40px;
        height: 40px;
        overflow: hidden;
        position: relative;
        img {
          width: 40px;
          height: 40px;
        }
        i {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          transition: all 0.3s;
          z-index: 1;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.582);
          &:hover {
            color: white;
          }
        }
      }
    }

    &:nth-child(2) {
      width: 224px;
      height: 224px;
      overflow: hidden;
      position: relative;
      img {
        width: 224px;
        height: 224px;
        transition: all 0.3s;
      }
      i {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.39);
        transition: all 0.3s;
        z-index: 1;
        font-size: 50px;
        color: rgba(255, 255, 255, 0.582);
      }
      &:hover {
        img {
          transform: scale(1.2);
          transition: all 0.3s;
        }
        i {
          opacity: 1;
          transition: all 0.3s;
        }
      }
    }
  }
}
</style>