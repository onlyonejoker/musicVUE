<template>
  <div v-if="userState" class="user">
    <div class="user-info">
      <span><img v-lazy="userimg" alt=""/></span>
      <span @mouseover="mouseover" @mouseout="mouseout">{{ userId }}</span>
    </div>
    <userDetails />
  </div>
  <div class="logoing" v-else>
    <span @click="login">登录</span>
    <span @click="signIn">注册</span>
  </div>
</template>

<script>
import userDetails from "./userDetails.vue";
import { mapState } from "vuex";
export default {
  name: "logoing",
  data() {
    return {};
  },
  components: {
    userDetails
  },
  computed: {
    ...mapState({
      userimg: state => state.login?.profile?.avatarUrl,
      userId: state => state.login?.profile?.nickname,
      userState: state => state.login?.profile
    })
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
    }
  },
  mounted() {
    window.$wujie.$on("setIsLoginModalOpen", async value => {
      if (!value) {
        let { data: loginStatusData } = await loginStatus();
        console.log(loginStatusData);
        this.$store.commit("login", loginStatusData); //更新数据
      }
    });
  }
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
  position: relative;
  .user-info {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

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
        line-height: 44px;
      }
    }
  }
}
</style>
