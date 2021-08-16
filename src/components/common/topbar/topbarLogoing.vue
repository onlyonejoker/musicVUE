<template>
  <div class="logoing" v-if="token">
    <span @click="login">登录</span>
    <span @click="signIn">注册</span>
  </div>
  <div v-else class="user">
    <span><img :src="userimg" alt=""></span>
    <span @mouseover="mouseover" @mouseout="mouseout">{{userId}}</span>
    <userDetails />
  </div>
</template>

<script>
import userDetails from "./userDetails.vue";
export default {
  name: "logoing",
  data() {
    return {};
  },
  components: {
    userDetails,
  },
  computed: {
    token() {
      return this.$store.state.token.length < 10;
    },
    userimg() {
      return this.$store.state.login.profile.avatarUrl;
    },
    userId() {
      return this.$store.state.login.profile.nickname;
    },
  },
  methods: {
    login() {
      this.$bus.$emit("login");
    },
    signIn() {
      this.$bus.$emit("signIn");
    },
    mouseover() {
      this.$bus.$emit("details");
    },
    mouseout() {
      this.$bus.$emit("out");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
  .logoing {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span:nth-child(2) {
      margin-left: 20px;
    }
  }
  .user {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    span {
      &:nth-child(1) {
        width: 40px;
        height: 40px;
        border: 1px solid transparent;
        border-radius: 40px 40px;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 40px;
          height: 40px;
        }
      }
      &:nth-child(2) {
        font-size: 14px;
      }
    }
  }
</style>