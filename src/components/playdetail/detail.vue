<template>
  <div class="detail">
    <section>
      <img :src="play.coverImgUrl" alt="img" />
    </section>
    <section>
      <p class="title">{{ play.name }}</p>
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
      <div>
        <el-button type="success" @click="allPlay" round>全部播放</el-button>
        <el-button type="info" :class="{ sub: isSub }" round>
          <span v-if="!isSub">收藏</span>
          <span v-else>已收藏</span>
        </el-button>
        <el-button type="info" round>评论{{ play.commentCount }}</el-button>
        <el-button
          type="info"
          @click="updataPlay"
          v-if="play.userId == myId"
          round
          >修改</el-button
        >
      </div>
    </section>
  </div>
</template>

<script>
import { playDetail } from "../../request/playList";
import { songDetail } from "../../request/song";
export default {
  name: "detail",
  data() {
    return {
      myId: this.$store.state.login.profile.userId,
      //歌单id
      playId: this.$route.query.id,
      //歌单详情
      play: {
        coverImgUrl: null,
        name: null,
        creator: { nickname: null },
      },
      //歌曲详情
      song: null,
      //读取我收藏的歌单id
      mySubPlayId: JSON.parse(sessionStorage.getItem("mySubPlay")),
    };
  },
  computed: {
    //检测是否已收藏
    isSub() {
      return this.mySubPlayId.indexOf((e) => e == this.playId) !== -1;
    },
  },
  watch: {
    //监听歌单是否请求成功，成功后获取歌单详情
    play() {
      let songIds = this.play.trackIds.map((e) => e.id).join(",");
      this.playSong(songIds);
    },
  },
  methods: {
    //获取歌曲全部id，并发送到播放页面
    allPlay() {
      if (this.song !== null) {
        this.$store.commit("musicInfo", this.song.songs);
      } else {
        alert("加载中");
      }
    },
    //获取歌单详情
    playlists() {
      playDetail(this.playId)
        .then((res) => {
          this.play = res.playlist;
        })
        .catch();
    },
    //获取单个歌曲详情并发送到歌曲列表
    playSong(ids) {
      songDetail(ids)
        .then((res) => {
          this.song = res;
          this.$bus.$emit("playItem", res, this.play);
        })
        .catch();
    },
    updataPlay() {},
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
      div {
        &:last-child {
          .el-button--success {
            color: #fff;
            background-color: red;
            border-color: red;
          }
        }
      }
    }
  }
}
.sub {
  color: #fff;
  background-color: red !important;
  border-color: red !important;
}
</style>