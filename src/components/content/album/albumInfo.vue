<template>
  <div class="albumInfo" v-if="dynamic && info">
    <div class="album-img">
      <img v-lazy="info.picUrl" alt="picUrl" />
    </div>
    <div class="album-info">
      <h2>{{ info.name }}</h2>
      <p>
        歌手：
        <span
          @click="linkArtist(item.id)"
          v-for="(item, index) in info.artists"
          :key="index"
        >
          {{ item.name }}
        </span>
      </p>
      <p>发布时间：{{ this.$time(info.publishTime) }}</p>
      <div>
        <btn @click.native="player" icon="el-icon-video-play" text="全部播放" />
        <btn
          @click.native="albumSub"
          icon="el-icon-folder-add"
          :text="isSub + '(' + dynamic.subCount + ')'"
          :class="{ sub: isSubState }"
        />
        <btn
          @click.native="fenxiang"
          icon="el-icon-paperclip"
          :text="'分享(' + dynamic.shareCount + ')'"
        />
        <btn
          @click.native="linkComment"
          icon="el-icon-document"
          :text="'评论(' + dynamic.commentCount + ')'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import btn from "btn/btn.vue";
import { albumSub } from "@/request/album";

export default {
  name: "albumInfo",
  props: { info: Object, dynamic: Object, songs: Array, scroll: Array },
  components: {
    btn,
  },
  data() {
    return {
      isSubState: false,
      isSub: "收藏",
    };
  },
  watch: {
    dynamic(n) {
      this.isSubState = n.isSub;
      n.isSub ? (this.isSub = "已收藏") : (this.isSub = "收藏");
    },
  },
  computed: {},
  methods: {
    //事件相关
    fenxiang() {
      this.$bus.$emit("fenxiang", this.info.id, this.info.type);
    },
    player() {
      this.$store.commit("musicInfo", this.songs);
    },
    linkArtist(id) {
      this.$router.push({ path: "/artistDetail", query: { id } });
    },
    linkComment() {
      this.scroll[0].scrollIntoView({ behavior: "smooth" });
    },
    //请求相关
    albumSub() {
      if (this.isSubState) {
        albumSub(this.info.id, 0)
          .then((res) => {
            console.log(res);
          })
          .catch();
        this.isSub = "收藏";
        this.isSubState = false;
      } else {
        albumSub(this.info.id, 1)
          .then((res) => {
            console.log(res);
          })
          .catch();
        this.isSub = "已收藏";
        this.isSubState = true;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.albumInfo {
  margin: 20px 0 0;
  padding: 0 10%;
  display: flex;
  .album-img {
    margin-right: 50px;
    img {
      width: 188px;
      height: 188px;
    }
  }
  .album-info {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    p {
      font-size: 14px;
      &:nth-child(2) {
        span {
          margin-right: 5px;
          &:hover {
            color: red;
          }
        }
      }
    }
    > div {
      .btn {
        margin-right: 20px;
      }
    }
  }
}
.sub {
  background-color: red;
  color: white;
  &:active {
    color: black;
  }
}
</style>