<template>
  <div class="signin" v-if="display">
    <div class="signinBox">
      <button class="close" @click="closeLogin">×</button>
      <div>
        <label for="userid">账号</label>
        <el-input v-model="input1" @blur="verifyID" name="userid" placeholder="请输入账号"></el-input>
        <p v-if="valify&&a"><i class="el-icon-check"></i>账号格式正确</p>
        <p v-if="!valify&&a" style="color:red"><i class="el-icon-close"></i>账号格式错误</p>
      </div>
      <div>
        <label for="password">密码</label>
        <el-input placeholder="请输入密码" @blur="verifyPW" v-model="input2" name="password" show-password></el-input>
        <p v-if="valifyP&&p"><i class="el-icon-check"></i>密码格式正确</p>
        <p v-if="!valifyP&&p" style="color:red"><i class="el-icon-close"></i>密码格式错误</p>
      </div>
      <el-button round @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { loginPhone } from "@/request/logoin";
export default {
  name: "login",
  data() {
    return {
      input1: 111,
      input2: "",
      display: false,
      valify: true,
      valifyP: true,
      a: false,
      p: false,
    };
  },
  computed: {
    userImg() {
      return this.$bus.login;
    },
  },
  methods: {
    loginBox() {
      this.$bus.$on("signin", () => {
        this.display = true;
      });
    },
    verifyID() {
      this.a = true;
      let ipone =
        /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (ipone.test(this.input1)) {
        this.valify = true;
      } else {
        this.valify = false;
      }
    },
    verifyPW() {
      this.p = true;
      let passwoer = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (passwoer.test(this.input2)) {
        this.valifyP = true;
      } else {
        this.valifyP = false;
      }
    },
    closeLogin() {
      this.display = false;
    },
    login() {
      loginPhone(this.input1, this.input2)
        .then((res) => {
          console.log(res);
          this.$store.commit("token", res.token);
          this.$bus.loginRes = res;
          for (const k in res) {
            if (k == "msg") {
              this.$bus.$emit("error", "密码");
            } else {
              document.cookie = this.input1 + "=" + this.input2;
              this.closeLogin();
            }
          }
        })
        .catch((err) => {
          this.$bus.$emit("error", "登录");
          console.log(err);
        });
    },
  },
  mounted() {
    this.loginBox();
  },
};
</script>

<style lang="less" scoped>
  .signin {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .signinBox {
      position: relative;
      display: flex;
      flex-flow: column;
      padding: 20px 20px 0 20px;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 300px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: rgba(226, 226, 226, 0.5);
      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        line-height: 20px;
        border: 1px solid white;
        border-radius: 20px 20px;
        margin: 0;
        background-color: rgb(255, 253, 253);
        &:hover {
          border-color: #f7f8fa;
          background-color: #fcfdfd;
        }
      }
      .el-button {
        &:hover {
          color: gray;
        }
      }
      div {
        position: relative;
        width: 100%;
        display: flex;
        flex-flow: row;
        padding-bottom: 20px;
        justify-content: space-between;
        align-items: center;
        label {
          width: 20%;
          display: flex;
          align-items: center;
        }
        .el-input {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
        }
        p {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%);
          font-size: 12px;
          line-height: 20px;
          color: green;
        }
      }
    }
  }
</style>