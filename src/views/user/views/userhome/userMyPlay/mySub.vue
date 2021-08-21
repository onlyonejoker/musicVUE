<template>
  <div class="mySub">
    <div class="play-content">
      <playItem :play="item" v-for="(item, index) in playlist" :key="index" />
    </div>
    <div class="block">
      <span @click="reducePage" class="el-icon-arrow-left"></span>
      <span>{{ page }}</span>
      <span @click="addPage" class="el-icon-arrow-right"></span>
    </div>
  </div>
</template>

<script>
import playItem from "@/components/common/play/playItem.vue";
import { playlist } from "@/request/user";
export default {
  name: "mySub",
  components: {
    playItem,
  },
  data() {
    return {
      page: 0,
      playlist: [],
    };
  },
  watch: {
    page() {
      this.getPlayList();
    },
  },
  computed: {
    //优先路由id，获取用户信息参数
    uid() {
      return (
        this.$store.state.others || this.$store.state.login.account.id || null
      );
    },
  },
  methods: {
    forbidClick(more) {
      !more ? (this.$refs.addPage.style.pointerEvents = "none") : null;
    },
    addPage() {
      this.page++;
    },
    reducePage() {
      this.page--;
      this.page <= 0 ? (this.page = 0) : this.page;
    },
    getPlayList() {
      playlist(this.uid, 10, this.page * 10)
        .then((res) => {
          this.playlist.splice(0, this.playlist.length);
          console.log(res);
          res.playlist.forEach((e) => {
            e.subscribed ? this.playlist.push(e) : null;
          });
          this.forbidClick(res.more);
        })
        .catch();
    },
  },
  created() {
    this.getPlayList();
  },
};
</script>

<style lang="less" scoped>
.mySub {
  padding: 0 10%;
  min-height: 50vh;
  position: relative;
  .play-content {
    display: flex;
  }
  .block {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    span {
      display: inline-block;
      width: 100px;
      height: 20px;
    }
  }
}
</style>