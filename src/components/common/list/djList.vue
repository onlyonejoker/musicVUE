<template>
  <div class="play">
    <div @click="djDetail(dj.id)">
      <section class="shade">
        <i class="el-icon-video-play"></i>
      </section>
      <img v-lazy="dj.coverUrl || dj.picUrl" alt="play" />
    </div>
    <p>{{ dj.name }}</p>
    <p class="nickname" @click="linkUser" v-if="dj.dj">
      {{ dj.dj.nickname }}
    </p>
  </div>
</template>

<script>
import { music } from "@/request/music";
export default {
  name: "djList",
  props: { dj: Object },
  data() {
    return {};
  },
  methods: {
    djDetail(id) {
      music(id)
        .then((res) => {
          console.log(res);
          if (res.data.url == null) {
            alert("节目不可用");
          } else {
            this.$store.commit("musicInfo", res.data);
          }
        })
        .catch();
    },
    linkUser() {
      this.$router.push({
        path: "/user/home",
        query: { id: this.dj.dj.userId },
      });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.play {
  width: 188px;
  height: 218px;
  margin-bottom: 20px;
  > div {
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
    &:hover {
      color: red;
    }
  }
}
</style>