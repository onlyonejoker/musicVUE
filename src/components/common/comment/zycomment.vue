<template>
  <div class="albumComment" id="commentComponent">
    <div>
      <h2>热评</h2>
      <comment
        :comment="item"
        v-for="(item, index) in hotComments"
        :key="index"
        :zyId="resourceId"
        :type="type"
      />
    </div>
    <div>
      <h2>全部评论</h2>
      <comment
        :comment="item"
        v-for="(item, index) in comments"
        :key="index"
        :zyId="resourceId"
        :type="type"
      />
    </div>
  </div>
</template>

<script>
import comment from "@/components/common/list/comment.vue";
export default {
  name: "commentComponent",
  components: {
    comment,
  },
  props: {
    comments: Array,
    hotComments: Array,
    type: Number,
    resourceId: Number,
  },
};
</script>

<style lang="less" scoped>
.albumComment {
  padding: 0 10%;
  position: relative;
  > div {
    h2 {
      margin: 20px 0;
      background-color: gray;
      padding: 10px 0 10px;
    }
  }
}
</style>