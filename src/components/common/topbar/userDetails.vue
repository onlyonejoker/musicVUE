<template>
  <el-collapse-transition>
    <div class="userDetails" v-if="block" @mouseenter="mouseenter" @mouseleave="mouseout">
      <router-link to="/user/home">
        <div>我的主页</div>
      </router-link>
      <router-link to="/user/set">
        <div>个人设置</div>
      </router-link>
      <router-link to="/user/leave">
        <div>我的等级</div>
      </router-link>
      <div>保留</div>
      <div @click="loginOut">退出登录</div>
    </div>
  </el-collapse-transition>
</template>

<script>
import { loginOut } from "@/request/logoin";
import { detail, subcount } from "@/request/user";
export default {
  name: "userDetails",
  data() {
    return {
      block: false,
      enter: false,
    };
  },
  watch: {},
  methods: {
    mouseout() {
      this.block = false;
      this.enter = false;
    },
    mouseenter() {
      this.enter = true;
    },
    details() {
      this.$bus.$on("details", () => {
        this.block = true;
      });
    },
    out() {
      this.$bus.$on("out", () => {
        setTimeout(() => {
          this.enter ? (this.block = true) : (this.block = false);
        }, 47);
      });
    },
    loginOut() {
      loginOut()
        .then(() => {
          this.$store.commit("token", true);
          sessionStorage.setItem("token", true);
          sessionStorage.setItem("user", null);
        })
        .catch();
    },
    userDetails() {
      let id = this.$store.state.login.account.id;
      detail(id)
        .then((res) => {
          console.log(res);
        })
        .catch(() => {});
    },
    userSubcount() {
      subcount()
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
  },
  mounted() {
    this.details();
    this.out();
  },
};
</script>

<style lang="less" scoped>
  .userDetails {
    position: absolute;
    top: 44px;
    width: 100px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 999;
    div {
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      font-family: "宋体";
      &:hover {
        background-color: rgba(226, 226, 226, 0.5);
      }
    }
  }
</style>