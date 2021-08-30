<template>
  <div class="mv">
    <videocp v-for="(item, index) in video" :key="index" :video="item" />
  </div>
</template>

<script>
import { artistMv } from "@/request/artist";
import videocp from "@/components/common/video/videoComponent.vue";
export default {
  name: "artistDetailmv",
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  data() {
    return { video: null };
  },
  components: {
    videocp,
  },
  methods: {
    artistMvfn() {
      artistMv(this.uid)
        .then((res) => {
          this.video = res.mvs;
        })
        .catch();
    },
  },
  mounted() {
    this.artistMvfn();
  },
};
</script>

<style lang="less" scoped>
.mv {
  display: flex;
  flex-wrap: wrap;
}
</style>