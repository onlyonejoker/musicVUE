
<template>
  <div
    class="userInfo"
    :style="{ backgroundImage: 'url(' + info.profile.backgroundUrl + ')' }"
  >
    <div class="profile">
      <p class="user-img">
        <img v-lazy="info.profile.avatarUrl" alt="userimg" />
      </p>
      <p class="user-name">
        <span>
          {{ info.profile.nickname }}
        </span>
        <i>LV{{ info.level }} </i>
      </p>
      <div class="user-sub">
        <p>
          <span>
            <router-link to="/user/home/fans">
              {{
                info.profile.followeds > 10000
                  ? Math.floor(info.profile.followeds / 100) / 100 + "万"
                  : info.profile.followeds
              }}
            </router-link>
          </span>
          <span>粉丝</span>
        </p>
        <p>
          <span>
            <router-link to="/user/home/focus">
              {{
                info.profile.follows > 10000
                  ? Math.floor(info.profile.follows / 100) / 100 + "万"
                  : info.profile.follows
              }}
            </router-link>
          </span>
          <span>关注</span>
        </p>
        <p>
          <span>
            <router-link to="/user/home/event">
              {{
                info.profile.eventCount > 10000
                  ? Math.floor(info.profile.eventCount / 100) / 100 + "万"
                  : info.profile.eventCount
              }}
            </router-link>
          </span>
          <span>动态</span>
        </p>
      </div>
    </div>
    <nav>
      <router-link active-class="active" to="/user/home/like">
        我喜欢
      </router-link>
      <router-link active-class="active" to="/user/home/myPlay">
        我的歌单
      </router-link>
      <router-link active-class="active" to="/user/home/focus">
        关注
      </router-link>
      <router-link active-class="active" to="/user/home/fans">
        粉丝
      </router-link>
      <router-link active-class="active" to="/user/home/event">
        动态
      </router-link>

      <btn
        v-if="uid != this.$store.state.login.account.id"
        icon="el-icon-plus"
        @click.native="followUser(uid)"
        :class="{ isFollow: followInfo == '已关注' }"
        :text="followInfo"
      ></btn>
      <span>{{ city }}</span>
    </nav>
  </div>
</template>

<script>
import { detail, follow } from "@/request/user";
import btn from "btn/btn.vue";
export default {
  name: "info",
  data() {
    return {
      city: "",
      info: {
        profile: {
          backgroundUrl: null,
          avatarUrl: null,
          eventCount: null,
          followeds: null,
        },
      },
      followInfo: "关注",
    };
  },
  components: {
    btn,
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
    //获取用户信息
    details() {
      detail(this.uid).then((res) => {
        console.log(res);
        this.info = res;
        res.profile.followed
          ? (this.followInfo = "已关注")
          : (this.followInfo = "关注");
      });
    },
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
  },
  created() {
    this.details();
  },
};
</script>

<style lang="less" scoped>
.userInfo {
  width: 100%;
  height: 388px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  position: relative;
  .profile {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: column;
    .user-img {
      width: 110px;
      height: 110px;
      border: 5px solid white;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-name {
      width: 100%;
      color: #fff;
      font-size: 30px;
      line-height: 64px;
      display: flex;
      justify-content: center;
      i {
        font-size: 16px;
        color: red;
        margin-left: 5px;
      }
    }
    .user-sub {
      display: flex;
      justify-content: center;
      p {
        width: 120px;
        height: 40px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        span {
          a {
            color: #fff;
            font-size: 20px;
            &:hover {
              color: red;
            }
          }
        }
        &:nth-child(1) {
          border-right: 1px solid white;
        }
        &:nth-child(2) {
          border-right: 1px solid white;
        }
      }
    }
  }
  nav {
    position: absolute;
    bottom: 0;
    line-height: 44px;
    height: 44px;
    width: 100%;
    padding: 0 15%;
    a {
      display: inline;
      color: white;
      margin-right: 20px;
    }
    .btn {
      float: right;
      color: white;
    }
  }
  .active {
    color: red !important;
  }
}
.isFollow {
  background-color: red !important;
}
</style>