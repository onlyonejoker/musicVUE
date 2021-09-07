<template>
  <div class="play-detail">
    <detail />
    <song-item />
    <div class="comment">
      <comment
        :hotComments="hotComments"
        :comments="comments"
        :type="2"
        :resourceId="parseInt(uid)"
      />
    </div>
  </div>
</template>

<script>
import detail from "@/components/content/playdetail/detail.vue";
import songItem from "@/components/content/playdetail/songItem.vue";
import comment from "@/components/common/comment/zycomment.vue";
import { commentLlaylist } from "@/request/playList";
export default {
  name: "playDetail",
  components: {
    detail,
    songItem,
    comment,
  },
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  data() {
    return {
      hotComments: [],
      comments: [],
      more: false,
      offset: 0,
    };
  },
  methods: {
    commentLlaylist() {
      commentLlaylist(this.uid, 20, this.offset * 20)
        .then((res) => {
          console.log(res);
          this.hotComments = res.hotComments;
          this.comments = res.comments;
          this.more = res.more;
        })
        .catch();
    },
  },
  mounted() {
    this.commentLlaylist();
  },
};
</script>

<style lang="less" scoped>
</style>