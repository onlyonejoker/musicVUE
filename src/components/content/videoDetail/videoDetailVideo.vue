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
            @click.native="likedFn"
            :class="{ sub: sub }"
            :text="subText + '(' + info.likedCount + ')'"
          />
          <btn
            @click.native="shareFn"
            :text="'转发(' + info.shareCount + ')'"
          />
        </p>
        <div class="mvComment">
          <zycomment
            :comments="comment.comments"
            :hotComments="comment.hotComments"
            :type="5"
            :resourceId="uid"
          />
          <page @page="page" :more="more" />
        </div>
      </div>
      <div class="simi">
        <h2>相关推荐</h2>
        <videos v-for="(item, index) in simi" :key="index" :video="item" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  relatedAllvideo,
  mvSub,
  videoDetail,
  videoDetailInfo,
  videoUrl,
  commentVideo,
} from "@/request/video";
import videos from "../../common/list/video.vue";
import Btn from "btn/btn.vue";
import Page from "../../common/page/page.vue";
import Zycomment from "../../common/comment/zycomment.vue";

export default {
  components: { videos, Btn, Zycomment, Page },
  name: "videoDetail",
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  data() {
    return {
      rate: 1080,
      sub: false,
      videoUrl: null,
      simi: null,
      info: null,
      subText: "收藏",
      comment: null,
      more: false,
      offset: 0,
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
        })
        .catch();
    },
    mvSub() {
      mvSub(this.uid, this.sub)
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
      if (this.sub) {
        this.subText = "收藏";
        this.sub = false;
        mvSub(this.uid, 0);
      } else {
        this.subText = "已收藏";
        this.sub = true;
        mvSub(this.uid, 1);
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
  },
  mounted() {
    this.mvDetail(this.uid);
  },
};
</script>

<style lang="less" scoped>
.mvDetail {
  padding: 0 5%;
  .video {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .content {
    display: flex;
    margin-top: 20px;
    .simi {
      width: 30%;
    }
    .body {
      width: 70%;
    }
    .mvComment {
      position: relative;
    }
  }
}
video {
  width: 800px;
}
.sub {
  background-color: red;
  color: white;
}
</style>