<template>
  <div class="detail">
    <section class="img">
      <img :src="play.coverImgUrl" alt="img" />
    </section>
    <section>
      <p class="title">
        {{ play.name }}
      </p>
      <p class="author">
        <i class="el-icon-user"></i>
        <!-- 查看用户详情 -->
        <router-link
          :to="{ path: '/user/home/myPlay', query: { id: play.userId } }"
        >
          {{ play.creator.nickname }}
        </router-link>
      </p>
      <div class="info">
        <p class="tag">
          <span>标签：</span>
          <span v-for="(item, index) in play.tags" :key="index">{{
            item
          }}</span>
        </p>
        <p class="play-count">
          <span>播放量：</span>
          <span class="num">
            {{
              play.playCount > 10000
                ? Math.floor(play.playCount / 100) / 100
                : play.playCount
            }}
          </span>
          <span v-if="play.playCount > 10000">万</span>
        </p>
        <p class="sub-count">
          <span>关注量：</span>
          <span class="num">
            {{
              play.subscribedCount > 10000
                ? Math.floor(play.subscribedCount / 100) / 100
                : play.subscribedCount
            }}
          </span>
          <span v-if="play.subscribedCount > 10000">万</span>
        </p>
      </div>
      <div class="btn-list">
        <btn
          icon="el-icon-video-play"
          text="全部播放"
          @click.native="allPlay"
          class="btn1"
        />
        <btn
          :class="{ btn2: play.subscribed }"
          icon="el-icon-folder-add"
          :text="sub"
          v-if="myId !== play.userId"
          @click.native="subPlay"
        />
        <btn
          class="btn3"
          icon="el-icon-edit-outline"
          text="编辑歌单"
          v-if="myId == play.userId"
          @click.native="edit"
        />
        <btn
          class="btn4"
          icon="el-icon-chat-dot-square"
          :text="'留言(' + play.commentCount + ')'"
          @click.native="linkComment"
        />
        <btn
          class="btn5"
          icon="el-icon-s-operation"
          text="更多"
          @click.native="fall"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { playDetail, subscribe } from "../../request/playList";
import { songDetail } from "../../request/song";
import { Notification } from "element-ui";
import btn from "btn/btn.vue";
export default {
  name: "detail",
  data() {
    return {
      myId: this.$store.state.login.profile.userId,
      playId: this.$route.query.id,
      play: {
        coverImgUrl: null,
        name: null,
        subscribed: null,
        creator: { nickname: null, userId: null },
        id: null,
      },
      song: null,
      switch: true,
      t: 0,
    };
  },
  computed: {
    sub() {
      if (this.play.subscribed) {
        return "已收藏";
      } else {
        return "收藏";
      }
    },
  },
  components: {
    btn,
  },
  methods: {
    //updata歌单
    edit() {
      if (this.play.id !== null) {
        this.$router.push({ path: "/play/updata", query: { paly: this.play } });
      } else {
        Notification.success({ type: "warning", message: "加载中" });
      }
    },
    //跟多
    fall() {},
    //跳转品论
    linkComment() {
      document.querySelector("footer").scrollIntoView({
        behavior: "smooth",
      });
    },
    //取消/关注
    subPlay() {
      //必须歌单加载完毕
      if (this.play.id !== null) {
        //做一个开关在用户不刷新的情况下也可以正确的使用
        if (this.switch) {
          //第一次修改状态必须使用请求的关注作为参照
          //如果关注了 ，那么这次点击就是取消关注
          //如果关注了 ，那么这次点击就是取消关注
          this.play.subscribed ? (this.t = 2) : (this.t = 1);
          //关闭开关，第一次之后的状态就是自己操作的状态
          this.switch = false;
        } else {
          //根据之前修改的状态来决定
          this.t == 1 ? (this.t = 2) : (this.t = 1);
        }
        //发送请求
        subscribe(this.t, this.play.id)
          .then(() => {
            this.play.subscribed = !this.play.subscribed;
          })
          .catch(() => {
            //失败重新打开开关
            this.switch = true;
          });
      } else {
        Notification.success({ type: "warning", message: "加载中" });
      }
    },
    //获取歌曲全部id，并发送到播放页面
    allPlay() {
      if (this.song !== null) {
        this.$store.commit("musicInfo", this.song.songs);
      } else {
        alert("加载中");
      }
    },
    //获取歌单详情,里面什么都有
    playlists() {
      playDetail(this.playId)
        .then((res) => {
          console.log(res);
          this.play = res.playlist;
          this.playSong(this.play.trackIds.map((e) => e.id).join(","));
        })
        .catch();
    },
    //获取歌曲详情
    playSong(ids) {
      songDetail(ids)
        .then((res) => {
          this.song = res;
          this.$bus.$emit("playItem", res, this.play);
        })
        .catch();
    },
  },
  created() {
    this.playlists();
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.detail {
  padding: 50px 15%;
  display: flex;
  align-items: center;
  section {
    &:nth-child(1) {
      min-width: 188px;
      min-height: 188px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 50px;
      img {
        min-width: 188px;
        min-height: 188px;
        width: 188px;
        height: 188px;
      }
    }
    &:nth-child(2) {
      min-width: 500px;
      width: 80%;
      .title {
        font-size: 26px;
        line-height: 30px;
      }
      .author {
        display: flex;
        font-size: 14px;
        line-height: 30px;
        height: 30px;
        i {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
        }
        a {
          &:hover {
            color: red;
          }
        }
      }
      .info {
        p {
          line-height: 26px;
          font-size: 14px;
          margin-bottom: 10px;
          .num {
            font-family: "宋体";
          }
        }
        .tag {
          span:not(span:nth-child(1)) {
            margin: 5px;
          }
        }
      }
      .btn-list {
        .btn {
          margin-right: 5px;
        }
        .btn1 {
          color: #fff;
          background-color: rgba(255, 0, 0, 0.678) !important;
          border-color: rgba(255, 0, 0, 0.678) !important;
          &:hover {
            background-color: red !important;
            border-color: red !important;
          }
        }
      }
    }
  }
}
.btn2 {
  color: #fff;
  background-color: rgba(255, 0, 0, 0.678) !important;
  border-color: rgba(255, 0, 0, 0.678) !important;
  &:hover {
    background-color: red !important;
    border-color: red !important;
  }
}
</style>