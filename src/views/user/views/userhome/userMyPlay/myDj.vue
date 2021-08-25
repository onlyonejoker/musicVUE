<template>
  <div class="userDj">
    <playItem :play="item" v-for="(item, index) in mydj" :key="index" />
  </div>
</template>

<script>
import { userDj } from "@/request/user";
import playItem from "@/components/common/play/playItem.vue";
export default {
  name: "userDj",
  data() {
    return {
      mydj: null,
    };
  },
  components: {
    playItem,
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
    userDj() {
      console.log(this.uid);
      userDj(this.uid)
        .then((res) => {
          console.log(res);
          this.mydj = res.programs;
        })
        .catch();
    },
  },
  created() {
    this.userDj();
  },
};
</script>

<style lang="less" scoped>
.userDj {
  padding: 0 10%;
  min-height: 50vh;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
</style>