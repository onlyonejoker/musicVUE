<template>
  <div class="albumList" v-if="album">
    <div @click="albumList(album)">
      <section class="shade">
        <i class="el-icon-video-play"></i>
      </section>
      <img v-lazy="album.picUrl" alt="play" />
    </div>
    <p>{{ album.name }}</p>
    <p v-if="album.company">{{ album.company }}</p>
    <p class="nickname">
      <span
        v-for="(item, index) in album.artists"
        :key="index"
        @click="linkArtists(item.id)"
      >
        {{ item.name }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: "albumList",
  props: { album: Object },
  methods: {
    albumList(album) {
      this.$router.push({
        path: "/albumDetail",
        query: { id: album.id },
      });
    },
    linkArtists(id) {
      this.$router.push({
        path: "/artistDetail",
        query: { id },
      });
      this.$router.go(0);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.albumList {
  width: 188px;
  height: 238px;
  margin-bottom: 20px;

  > div {
    width: 168px;
    height: 168px;
    position: relative;
    overflow: hidden;
    .shade {
      width: 168px;
      height: 168px;
      position: absolute;
      z-index: 996;
      background-color: rgba(0, 0, 0, 0.3);
      opacity: 0;
      transition: all 0.8s;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        transition: all 0.8s;
        font-size: 40px;
        color: rgba(0, 0, 0, 0.514);
        color: rgba(255, 255, 255, 0.5);
      }
    }
    img {
      width: 168px;
      height: 168px;
      transition: all 0.8s;
    }
    &:hover {
      .shade {
        opacity: 1;
        transition: all 0.8s;
        i {
          transition: all 0.8s;
          transform: scale(1.5, 1.5);
        }
      }
      img {
        transform: scale(1.2, 1.2);
        transition: all 0.8s;
      }
    }
  }
  p {
    width: 188px;
    height: 30px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 30px;
  }
  .nickname {
    height: 20px;
    line-height: 20px;
    color: grey;
    font-family: "宋体";
    span {
      &:hover {
        color: red;
      }
    }
  }
}
</style>