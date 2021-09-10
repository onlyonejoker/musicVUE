<template>
  <div class="mvDetail">
    <div class="video">
      <video :src="videoUrl" controls id="video"></video>
    </div>
    <div class="content" v-if="info">
      <div class="body">
        <p>
          <btn
            @click.native="commetFn"
            :text="'评论(' + info.commentCount + ')'"
          />
          <btn
            @click.native="mvSub"
            :class="{ sub: sub == 1 }"
            :text="sub == 1 ? '已收藏' : '收藏'"
          />
          <btn
            @click.native="shareFn"
            :text="'转发(' + info.shareCount + ')'"
          />
          <btn
            @click.native="likedFn"
            :class="{ sub: liked }"
            :text="'点赞(' + info.likedCount + ')'"
          />
          <btn @click.native="subPlay" text="收藏到歌单" />
          <add-play :index="1" :isDispaly="addplay" :ids="uid" />
        </p>
      </div>
      <div class="simi">
        <h2>相关推荐</h2>
        <div>
          <videos v-for="(item, index) in simi" :key="index" :video="item" />
        </div>
      </div>
    </div>
    <div class="mvComment" v-if="comment">
      <zycomment
        :comments="comment.comments"
        :hotComments="comment.hotComments"
        :type="4"
        :resourceId="parseInt(uid)"
      />
      <page @page="page" :more="more" />
    </div>
  </div>
</template>

<script>
import {
  relatedAllvideo,
  videoSub,
  videoDetail,
  videoDetailInfo,
  videoUrl,
  commentVideo,
  resourceLike,
} from "@/request/video";
import videos from "../../common/list/video.vue";
import Btn from "btn/btn.vue";
import Page from "../../common/page/page.vue";
import Zycomment from "../../common/comment/zycomment.vue";
import AddPlay from "../../common/add/addPlay.vue";

export default {
  components: { videos, Btn, Zycomment, Page, AddPlay },
  name: "videoDetail",
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  data() {
    return {
      rate: 1080,
      sub: 0,
      videoUrl: null,
      simi: null,
      info: null,
      comment: null,
      more: false,
      offset: 0,
      addplay: 0,
      liked: false,
    };
  },
  watch: {
    info(n) {
      n.liked
        ? ((this.subText = "已收藏"), (this.sub = true))
        : ((this.subText = "收藏"), (this.sub = false));
    },
    $route() {
      this.mvDetail();
    },
  },
  methods: {
    mvDetail() {
      Promise.all([
        relatedAllvideo(this.uid),
        videoDetail(this.uid),
        videoDetailInfo(this.uid),
        videoUrl(this.uid, this.rate),
        commentVideo(this.uid),
      ])
        .then((res) => {
          console.log(res);
          this.simi = res[0].data;
          this.info = res[2];
          this.videoUrl = res[3].urls[0].url;
          this.comment = res[4];
          this.more = res[4].more;
          res[1].subed ? (this.sub = 1) : (this.sub = 0);
        })
        .catch();
    },
    mvSub() {
      this.sub == 1 ? (this.sub = 0) : (this.sub = 1);
      videoSub(this.uid, this.sub)
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
    //事件相关
    commetFn() {
      document
        .querySelector(".mvComment")
        .scrollIntoView({ behavior: "smooth" });
    },
    likedFn() {
      if (this.liked) {
        this.liked = false;
        resourceLike(5, 10, this.uid);
      } else {
        this.liked = true;
        resourceLike(5, 1, this.uid);
      }
    },
    shareFn() {
      this.$bus.$emit("fenxiang", this.uid, "mv");
    },
    page(page) {
      commentVideo(this.uid, 20, page * 20)
        .then((res) => {
          this.comment = res;
          this.more = res.more;
        })
        .catch();
    },
    subPlay() {
      this.addplay == 0 ? (this.addplay = 1) : (this.addplay = 0);
    },
  },
  mounted() {
    this.mvDetail(this.uid);
  },
};
</script>

<style lang="less" scoped>
.mvDetail {
  .video {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .content {
    padding: 0 10%;
    display: flex;
    flex-flow: column;
    margin-top: 20px;
    .simi {
      margin-top: 20px;
      > div {
        display: flex;
        flex-wrap: wrap;
      }
    }
    .body {
      p {
        position: relative;
        .btn {
          margin-right: 20px;
        }
        .addList {
          top: 44px;
          left: 49%;
        }
      }
    }
  }
  .mvComment {
    position: relative;
  }
}
video {
  width: 80%;
}
.sub {
  background-color: red;
  color: white;
}
</style>