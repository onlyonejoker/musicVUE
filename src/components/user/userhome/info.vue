<template>
  <div class="userInfo">
    <div class="userImg">
      <img :src="info.profile.avatarUrl" alt="userimg">
    </div>
    <div class="userId">
      <section>
        <span>{{info.profile.nickname}}</span>
        <span><i>LV{{level.level}}</i> </span>
        <el-button type="info" round>修改用户信息</el-button>
      </section>
      <section>
        <div>
          <p>{{info.profile.eventCount}}</p>
          <p>动态</p>
        </div>
        <div>
          <p>{{info.profile.follows}}</p>
          <p>关注</p>
        </div>
        <div>
          <p>{{info.profile.followeds}}</p>
          <p>粉丝</p>
        </div>
      </section>

      <section>
        <p>所在地区： {{city}}</p>
      </section>
    </div>
  </div>
</template>

<script>
import { city } from "@/request/city";

export default {
  name: "info",
  data() {
    return {
      city: "",
    };
  },
  props: { level: Object },
  computed: {
    info() {
      let defineinfo = {
        profile: {
          avatarUrl: "",
          nickname: "",
          eventCount: "",
          follows: "",
          followeds: "",
          city: "",
        },
      };
      if (this.$store.state.login !== null) {
        return this.$store.state.login;
      } else {
        return defineinfo;
      }
    },
  },
  methods: {
    citys() {
      city(this.info.profile.city)
        .then((res) => {
          this.city = res.data.results[0].province + res.data.results[0].city;
        })
        .catch();
    },
  },
  mounted() {
    this.citys();
  },
  updata() {
    console.log(1);
  },
};
</script>

<style lang="less" scoped>
  .userInfo {
    width: 100%;
    height: 288px;
    display: flex;
    padding: 20px;
    .userImg {
      width: 198px;
      height: 198px;
      padding: 5px;
      border: 1px solid rgba(88, 88, 88, 0.5);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      overflow: hidden;
      img {
        width: 188px;
      }
    }
    .userId {
      margin-left: 30px;
      width: calc(100% - 198px);
      section {
        height: 33%;
        display: flex;
        align-items: center;
        position: relative;
        border-bottom: 2px solid rgba(226, 226, 226, 0.5);
        span {
          &:nth-child(2) {
            margin-left: 10px;
            color: red;
            display: block;
            width: 50px;
            line-height: 18px;
            text-align: center;
            height: 20px;
            border: 1px solid red;
            border-radius: 20px 20px;
          }
        }
        .el-button {
          position: absolute;
          right: 0;
          background-color: rgba(226, 226, 226, 0.5);
          color: black;
        }
        &:nth-child(2) {
          div {
            display: flex;
            flex-flow: column;
            width: 70px;
            justify-content: space-around;
            align-items: center;
            line-height: 30px;
          }
        }
      }
    }
  }
</style>