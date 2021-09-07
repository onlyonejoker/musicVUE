<template>
  <div class="mvSublist">
    <div class="video">
      <h2>MV</h2>
      <videoComponent
        :video="item"
        v-for="(item, index) in mvList"
        :key="index"
      />
    </div>
    <div class="video">
      <h2>视频</h2>
      <videoComponent
        :video="item"
        v-for="(item, index) in videoList"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { mvSublist } from "@/request/collect";
import videoComponent from "@/components/common/video/videoComponent.vue";

export default {
  name: "mvSublist",
  components: {
    videoComponent,
  },
  data() {
    return {
      mvList: [],
      videoList: [],
      more: false,
    };
  },
  methods: {
    mvSublist() {
      mvSublist()
        .then((res) => {
          res.data.forEach((e) => {
            if (e.type == 1) {
              this.videoList.push(e);
            } else if (e.type == 0) {
              this.mvList.push(e);
            }
          });
          this.more = res.more;
        })
        .catch();
    },
  },
  mounted() {
    this.mvSublist();
  },
};
</script>

<style lang="less" scoped>
.mvSublist {
  position: relative;
  min-width: 1000px;
  padding: 0 5%;
  .video {
    h2 {
      width: 100%;
    }
    margin: 20px 0;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>