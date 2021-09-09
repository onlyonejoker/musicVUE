<template>
  <div class="albumComment" id="commentComponent">
    <div>
      <h2>发表评论</h2>
      <div class="commentbox">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="textarea"
          resize="none"
        >
        </el-input>
        <div>
          <span @click="commentSend">发送</span>
          <span @click="commentCancel">取消</span>
        </div>
      </div>
    </div>
    <div>
      <h2>热评</h2>
      <comments
        :comment="item"
        v-for="(item, index) in hotComments"
        :key="index"
        :zyId="resourceId"
        :type="type"
      />
    </div>
    <div>
      <h2>全部评论</h2>
      <comments
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
import comments from "@/components/common/list/comment.vue";
import { comment } from "@/request/comment";
export default {
  name: "commentComponent",
  components: {
    comments,
  },
  props: {
    comments: Array,
    hotComments: Array,
    type: Number,
    resourceId: [Number, String],
  },
  data() {
    return { textarea: "" };
  },
  methods: {
    commentSend() {
      comment(1, this.type, this.resourceId, this.textarea)
        .then((res) => {
          console.log(res);
        })
        .catch();
      this.textarea = "";
    },
    commentCancel() {
      this.textarea = "";
    },
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
    .commentbox {
      padding: 20px;
      > div {
        margin-top: 10px;
        display: flex;
        flex-flow: row-reverse;
        span {
          font-size: 14px;
          color: black;
          display: block;
          width: 50px;
          line-height: 20px;
          text-align: center;
          border: 1px solid white;
          border-radius: 20px 20px;
          margin-left: 20px;
          &:active {
            color: white;
            background-color: red;
          }
        }
      }
    }
  }
}
</style>