<template>
  <div class="play">
    <div @click="PlayItem(id)">
      <section class="shade">
        <i class="el-icon-video-play">
        </i>
      </section>
      <img :src="playUrl" alt="play">
    </div>
    <p>{{playName}}</p>
  </div>
</template>

<script>
export default {
  name: "playItem",
  props: { playUrl: String, playName: String, id: Object },
  methods: {
    PlayItem(id) {
      this.$router.push({ path: "/playDetails/playDetail", query: id });
    },
  },
};
</script>

<style lang="less" scoped>
  .play {
    width: 188px;
    height: 218px;
    margin: 10px;
    div {
      width: 188px;
      height: 188px;
      position: relative;
      overflow: hidden;
      section {
        width: 188px;
        height: 188px;
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
        width: 188px;
        height: 188px;
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
  }
</style>