<template>
  <div class="songDetail">
    <topbar />
    <div class="info" v-if="info">
      <div class="info-img">
        <img v-lazy="info.al.picUrl" alt="picUrl" />
      </div>
      <div class="info-info">
        <h2>{{ info.name }}</h2>
        <p>
          <i class="el-icon-user"></i>
          <span @click="linkArtist(info.ar[0].id)">{{ info.ar[0].name }}</span>
        </p>
        <div class="info-from">
          <p @click="linkAlbum">
            专辑：<span>{{ info.al.name }}</span>
          </p>
          <p>
            发布时间：{{
              info.publishTime == 0 ? "" : this.$time(info.publishTime)
            }}
          </p>
        </div>
        <div class="info-btn">
          <btn @click.native="player" icon="el-icon-video-play" text="播放" />
          <btn @click.native="albumSub" icon="el-icon-folder-add" text="收藏" />
          <btn @click.native="fenxiang" icon="el-icon-paperclip" text="分享" />
          <btn
            @click.native="linkComment"
            icon="el-icon-document"
            text="评论"
          />
          <add-play :isDispaly="index" :index="1" :ids="uid" />
        </div>
      </div>
    </div>
    <div class="lyric" v-if="lyric">
      <h2>歌词</h2>
      <p v-for="(item, index) in lyric" :key="index">
        {{ item }}
      </p>
    </div>
    <div class="comment" v-if="comment">
      <zycomment
        :resourceId="uid"
        :type="0"
        :hotComments="comment.hotComments"
        :comments="comment.comments"
      />
    </div>
  </div>
</template>

<script>
import Btn from "../../components/common/button/btn.vue";
import Zycomment from "../../components/common/comment/zycomment.vue";
import topbar from "../../components/common/title/topbar.vue";
import { musicComment, songDetail, musicLyric } from "@/request/music";
import AddPlay from "../../components/common/add/addPlay.vue";
export default {
  components: { topbar, Btn, Zycomment, AddPlay },
  name: "songDetail",
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  data() {
    return {
      info: null,
      comment: null,
      lyric: null,
      index: 0,
    };
  },
  methods: {
    //事件相关
    fenxiang() {
      this.$bus.$emit("fenxiang", this.uid, "song");
    },
    player() {
      this.$store.commit("musicInfo", this.info);
    },
    linkArtist(id) {
      this.$router.push({ path: "/artistDetail", query: { id } });
    },
    linkComment() {
      document.querySelector(".comment").scrollIntoView({ behavior: "smooth" });
    },
    albumSub() {
      this.index == 0 ? (this.index = 1) : (this.index = 0);
    },
    linkAlbum() {
      this.$router.push({
        path: "/albumDetail",
        query: { id: this.info.al.id },
      });
    },
    //数据相关
    lyricData(lyric) {
      let lyricData = [];
      lyric.split("\n").forEach((e) => {
        let data = e.split("[")[1];
        if (data) {
          data = data.split("]")[1];
          data = data.replace(/\s*/g, "");
        }
        lyricData.push(data);
      });
      this.lyric = lyricData;
    },
    //请求相关
    init() {
      Promise.all([
        musicComment(this.uid),
        songDetail(this.uid),
        musicLyric(this.uid),
      ])
        .then((res) => {
          console.log(res);
          if (Object.hasOwnProperty.call(res[2], "nolyric")) {
            this.lyric = ["纯音乐，没有歌词"];
          } else {
            this.lyricData(res[2].lrc.lyric);
          }

          this.info = res[1].songs[0];
          this.comment = res[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.songDetail {
  .info {
    padding: 0 10%;
    display: flex;
    margin-top: 20px;

    .info-img {
      margin-right: 20px;
      img {
        width: 188px;
        height: 188px;
      }
    }
    .info-info {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      > p {
        span {
          margin-left: 10px;
          &:hover {
            color: red;
          }
        }
      }
      .info-from {
        p {
          margin: 10px 0;
          &:nth-child(1) {
            span {
              &:hover {
                color: red;
              }
            }
          }
        }
      }
      .info-btn {
        position: relative;
        .btn {
          margin-right: 5px;
        }
      }
    }
  }
  .lyric {
    padding: 0 10%;
    line-height: 30px;
    min-height: 500px;
    h2 {
      border-top: 1px solid white;
      margin: 20px 0 0;
      padding: 10px 0;
    }
  }
}
</style>