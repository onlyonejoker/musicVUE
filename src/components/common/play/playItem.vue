<template>
  <div class="play">
    <div @click="PlayItem(play)">
      <section class="shade">
        <i class="el-icon-video-play"> </i>
      </section>
      <img :src="play.coverImgUrl" alt="play" />
    </div>
    <p>{{ play.name }}</p>
    <p class="nickname">{{ play.creator.nickname }}</p>
  </div>
</template>

<script>
export default {
  name: "playItem",
  props: { play: Object },
  methods: {
    PlayItem(play) {
      console.log(play);
      this.$router.push({ path: "/play", query: { id: play.id } });
    },
  },
};
</script>

<style lang="less" scoped>
.play {
  width: 188px;
  height: 218px;
  div {
    width: 168px;
    height: 168px;
    position: relative;
    overflow: hidden;
    section {
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
  }
}
</style>