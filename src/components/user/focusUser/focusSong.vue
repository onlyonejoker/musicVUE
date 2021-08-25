<template>
  <div class="focusUserList">
    <img
      :src="focusUserInfo.avatarUrl || focusUserInfo.img1v1Url"
      alt="focusUserListImg"
      @click="link(uid)"
    />
    <p @click="link(focusUserInfo.userId)">{{ focusUserInfo.nickname }}</p>
    <p class="followeds">{{ focusUserInfo.followeds || "?" }}人关注</p>
    <btn
      icon="el-icon-plus"
      @click.native="followUser(focusUserInfo.userId)"
      :class="{ isFollow: followInfo == '已关注' }"
      :text="followInfo"
    ></btn>
  </div>
</template>

<script>
import { follow } from "@/request/user";
import { artistDetail } from "@/request/artist";
import btn from "btn/btn.vue";
export default {
  name: "focusUserList",
  props: { focusUserInfo: [Object, Array] },
  data() {
    return {
      followInfo: "关注",
      uid: null,
    };
  },
  components: {
    btn,
  },
  methods: {
    //关注用户
    followUser(id) {
      let t = 0;
      this.followInfo == "关注" ? (t = 1) : (t = 2);
      follow(id, t)
        .then((res) => {
          console.log(res);
          this.followInfo == "关注"
            ? (this.followInfo = "已关注")
            : (this.followInfo = "关注");
        })
        .catch();
    },
    //跳转用户详情
    link(id) {
      console.log(id);
      this.$router.push({ path: "/user/home", query: { id } });
    },
    //获取歌手详情
    artistDetail() {
      artistDetail(this.focusUserInfo.id)
        .then((res) => {
          console.log(res);
          this.uid = res.data.user.userId;
          res.data.user.followed
            ? (this.followInfo = "已关注")
            : (this.followInfo = "关注");
        })
        .catch();
    },
  },
  mounted() {
    console.log(this.focusUserInfo);
    this.artistDetail();
  },
};
</script>

<style lang="less" scoped>
.focusUserList {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  height: 255px;
  img {
    width: 140px;
    height: 140px;
    border-radius: 100%;
    margin-bottom: 20px;
  }
  p {
    line-height: 26px;
  }
  .followeds {
    font-size: 16px;
    color: grey;
    margin-bottom: 10px;
  }
}
.isFollow {
  background-color: red !important;
}
</style>