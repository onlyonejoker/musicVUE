<template>
  <div class="videoComponent" v-if="video">
    <div @click="videoItem(video)">
      <section class="shade">
        <i class="el-icon-video-play"></i>
      </section>
      <img v-lazy="video.coverUrl || video.imgurl" alt="video" />
    </div>
    <p>{{ video.title || video.name }}</p>
    <p class="nickname" v-if="video.creator" @click="linkUser">
      {{ video.creator[0].userName }}
    </p>
  </div>
</template>

<script>
export default {
  name: "videoComponent",
  props: { video: Object },
  data() {
    return {};
  },
  methods: {
    //跳转相关
    videoItem(video) {
      this.$router.push({
        path: "/videoDetail",
        query: { id: video.vid || video.id },
      });
    },
    linkUser() {
      this.$router.push({
        path: "/user/home",
        query: { id: this.video.creator[0].userId },
      });
    },
  },
  mounted() {
    console.log(this.video);
  },
};
</script>

<style lang="less" scoped>
.videoComponent {
  width: 300px;
  height: 218px;
  margin: 20px 20px 0 0;
  > div {
    width: 300px;
    height: 168px;
    position: relative;
    overflow: hidden;
    section {
      width: 300px;
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
      width: 300px;
      height: 168px;
      transition: all 0.8s;
    }
    &:hover {
      section {
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
    &:hover {
      color: red;
    }
  }
}
</style>