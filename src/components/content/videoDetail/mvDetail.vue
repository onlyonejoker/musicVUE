<template>
  <div class="mvDetail">
    <div class="video">
      <video :src="videoUrl" controls id="video"></video>
    </div>
  </div>
</template>

<script>
import { simiMv, mvSub, mvDetail, mvDetailInfo, mvUrl } from "@/request/video";
export default {
  name: "mvDetail",
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  data() {
    return {
      rate: 1080,
      sub: 0,
      videoUrl: null,
    };
  },
  methods: {
    mvDetail() {
      Promise.all([
        simiMv(this.uid),
        mvDetail(this.uid),
        mvDetailInfo(this.uid),
        mvUrl(this.uid, this.rate),
      ])
        .then((res) => {
          console.log(res);
          this.videoUrl = res[3].data.url;
        })
        .catch();
    },
    mvSub() {
      mvSub(this.uid, this.sub)
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
  },
  mounted() {
    this.mvDetail(this.uid);
  },
};
</script>

<style lang="less" scoped>
.mvDetail {
  padding: 0 5%;
  .video {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
video {
  width: 800px;
}
</style>