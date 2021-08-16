<template>
  <div class="userHome">
    <info :level="level" />
    <createPlay :subcount="subcount" />
  </div>
</template>

<script>
import { subcount, level } from "@/request/user.js";
import info from "@/components/user/userhome/info.vue";
import createPlay from "@/components/user/userhome/createPlay.vue";
export default {
  name: "userhome",
  data() {
    return {
      level: {},
      subcount: {},
    };
  },
  components: {
    info,
    createPlay,
  },
  methods: {
    userSubcount() {
      subcount().then((res) => {
        this.subcount = res;
      });
    },
    userLevel() {
      level().then((res) => {
        this.level = res.data;
      });
    },
  },
  mounted() {
    this.userSubcount(); //歌单
    this.userLevel();
  },
};
</script>

<style lang="less" scoped>
  .userHome {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    width: 70%;
    margin: 0 auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
</style>