<template>
  <div class="level">
    <p class="title">当前等级:<i>LV{{level.level}}</i></p>
    <div class="progress">
      <el-progress type="dashboard" :percentage="percentage" color="red"></el-progress>
    </div>
    <div class="privilege">
      <p>当前等级特权</p>
      <p><i></i>{{privilege}}</p>
    </div>
    <div class="upgrade">
      <p>距离下一等级:<i>LV{{level.level+1}}</i></p>
      <div class="xxx">
        <span>听歌</span>
        <div class="aaa">
          <el-progress color="red" :percentage="sign"></el-progress>
        </div>
        <span>
          距离升级还需要听
          {{this.level.nextPlayCount-this.level.nowPlayCount}}
          首歌
        </span>
      </div>
      <div class="xxx">
        <span>登录</span>
        <div class="aaa">
          <el-progress color="red" :percentage="loginDay"></el-progress>
        </div>
        <span>距离升级还需要登录{{level.nextLoginCount-level.nowLoginCount}}天</span>
      </div>
    </div>
  </div>
</template>

<script>
import { level } from "@/request/user.js";
export default {
  name: "level",
  data() {
    return {
      level: {},
      percentage: 0,
      privilege: "没有特权",
      sign: 0,
      loginDay: 0,
    };
  },
  computed: {},
  methods: {
    userLevel() {
      level().then((res) => {
        this.level = res.data;
        this.percentage = res.data.progress * 100;
        this.loginDay =
          (this.level.nowLoginCount / this.level.nextLoginCount) * 100;
        this.sign = (this.level.nowPlayCount / this.level.nextPlayCount) * 100;
        console.log(this.level);
      });
    },
  },
  mounted() {
    this.userLevel();
  },
};
</script>





<style lang="less" scoped>
  .level {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    width: 70%;
    margin: 0 auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .title {
      font-size: 30px;
      line-height: 50px;
      padding: 20px 40px;
      i {
        color: red;
        margin-left: 20px;
      }
    }
    .progress {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-progress {
        margin: 0 auto;
      }
    }
    .privilege {
      padding: 0 40px;
      height: 100px;
      border-bottom: 2px solid rgba(226, 226, 226, 0.5);
      p {
        &:nth-child(1) {
          font-size: 30px;
        }
        &:nth-child(2) {
          display: flex;
          align-items: center;
          i {
            display: block;
            width: 5px;
            height: 5px;
            border: 1px solid transparent;
            border-radius: 5px 5px;
            background-color: red;
            margin-right: 5px;
          }
        }
      }
    }
    .upgrade {
      padding: 20px 40px;
      i {
        color: red;
        margin-left: 20px;
      }
      .xxx {
        padding: 20px 0;
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        align-items: center;
        .aaa {
          width: 70%;
        }
        span {
          &:nth-child(1) {
            width: 5%;
          }
          &:nth-child(2) {
            width: 25%;
          }
        }
      }
    }
  }
</style>