<template>
  <div class="videoDetail">
    <topbar />
    <div v-if="/^[0-9]*$/.test(uid)">
      <mv-detail />
    </div>
    <div v-else-if="/^[0-9A-Z]*$/.test(uid)">
      <video-detail-video />
    </div>
  </div>
</template>

<script>
import topbar from "../../components/common/topbar.vue";
import MvDetail from "../../components/content/videoDetail/mvDetail.vue";
import VideoDetailVideo from "../../components/content/videoDetail/videoDetailVideo.vue";
export default {
  components: { topbar, MvDetail, VideoDetailVideo },
  name: "videoDetail",
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
</style>