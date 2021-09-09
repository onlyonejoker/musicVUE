<template>
  <div class="comment" v-if="comment">
    <div class="comment-user">
      <img v-lazy="comment.user.avatarUrl" alt="img" />
      <div>
        <p class="user" @click="linkUser(comment.user.userId)">
          {{ comment.user.nickname }}
        </p>
        <p>{{ this.$time(comment.time) }}</p>
      </div>
    </div>
    <div class="content-comment-user">
      <div>{{ comment.content }}</div>
    </div>
    <div class="praise-comment-user">
      <div class="btn">
        <div @click="conmmentDisplayFn(comment.commentId)">评论</div>
        <div @click="zhuanfa(comment.commentId, comment.user.userId)">
          <img src="@/assets/img/zhuanfa.svg" alt="zhuanfa" />
        </div>
        <div @click="dianzanFn(comment.commentId)">
          <img :src="dianzan[dianzanIndex]" alt="dianzan" />
          <span>{{ comment.likedCount }}</span>
        </div>
      </div>
      <div class="commentbox" v-if="commentDisplay == comment.commentId">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="textarea"
          resize="none"
        >
        </el-input>
        <div>
          <span @click="commentSend(comment.commentId)">发送</span>
          <span @click="commentCancel">取消</span>
        </div>
      </div>
    </div>
    <p @click="lookFn" v-if="comment.beReplied" class="look">查看回复</p>
    <div class="reply" v-if="look">
      <div v-if="beReplied === null">
        <i class="el-icon-loading"></i>
      </div>

      <div v-else-if="beReplied.length > 0">
        <div v-for="(item, index) in beReplied" :key="index">
          <div class="comment-user">
            <img v-lazy="item.user.avatarUrl" alt="img" />
            <div>
              <p class="user" @click="linkUser">
                {{ item.user.nickname }}
              </p>
              <p>{{ item.time }}</p>
            </div>
          </div>

          <div class="content-comment-user">
            <p>{{ item.content }}</p>
          </div>

          <div class="praise-comment-user">
            <div class="btn">
              <div @click="conmmentDisplayFn(item.commentId)">评论</div>
              <div @click="zhuanfa(item.beRepliedCommentId)">
                <img src="@/assets/img/zhuanfa.svg" alt="zhuanfa" />
              </div>
              <div @click="replydianzanFn(index, item.commentId)">
                <img
                  :src="reply == index ? dianzan[replyI] : dianzan[0]"
                  alt="dianzan"
                />
                <span>{{ item.likedCount }}</span>
              </div>
            </div>

            <div class="commentbox" v-if="commentDisplay == item.commentId">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="textarea"
                resize="none"
              >
              </el-input>
              <div>
                <span @click="commentSend(item.commentId)">发送</span>
                <span @click="commentCancel">取消</span>
              </div>
            </div>
          </div>
        </div>
        <div class="beRepliedPage">
          <div>
            <page @page="page" :mare="more" />
          </div>
        </div>
      </div>
      <div v-else>暂无评论</div>
    </div>
  </div>
</template>

<script>
import { commentLike, commentFloor, comment } from "@/request/comment";
import Page from "page/page.vue";

export default {
  name: "commentAlbum",
  props: { comment: Object, zyId: [Number, String], type: Number },
  components: { Page },
  data() {
    return {
      dianzan: [
        require("@/assets/img/dianzan.svg"),
        require("@/assets/img/activeDianzan.svg"),
      ],
      dianzanIndex: this.zan(),
      reply: null,
      beReplied: null,
      replyI: 0,
      look: false,
      onlyOne: true,
      time: -1,
      more: false,
      textarea: "",
      commentDisplay: null,
    };
  },

  methods: {
    //请求相关
    commentLike(id) {
      commentLike(this.zyId, id, this.dianzanIndex, this.type);
    },
    //楼层评论
    commentFloor() {
      commentFloor(this.comment.commentId, this.zyId, this.type, 20, this.time)
        .then((res) => {
          console.log(res);
          this.beReplied = res.data.comments;
          this.beReplied.forEach((e) => {
            e.time = this.$time(e.time);
          });
          this.time = res.data.comments.time;
          this.more = res.data.comments.hasMore;
        })
        .catch();
    },
    //事件相关
    lookFn() {
      this.look = !this.look;
      if (this.look && this.onlyOne) {
        this.commentFloor();
        this.onlyOne = false;
      }
    },
    zan() {
      if (this.comment) {
        if (this.comment.liked) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    dianzanFn(id) {
      this.dianzanIndex == 0
        ? (this.dianzanIndex = 1)
        : (this.dianzanIndex = 0);
      this.commentLike(this.zyId, id, this.dianzanIndex, this.type);
    },
    replydianzanFn(index, id) {
      this.reply = index;
      this.replyI == 0 ? (this.replyI = 1) : (this.replyI = 0);
      this.commentLike(this.zyId, id, this.replyI, this.type);
    },
    zhuanfa(id, userId) {
      this.$bus.$emit("zhuanfa", id, userId);
    },
    page() {
      this.commentFloor();
    },
    //回复
    conmmentDisplayFn(id) {
      this.commentDisplay = id;
    },
    commentSend(id) {
      comment(2, this.type, this.zyId, this.textarea, id).then().catch();
      this.textarea = "";
    },
    commentCancel() {
      this.commentDisplay = null;
    },
    //跳转相关
    linkUser(id) {
      this.$router.push({
        path: "/user/home",
        query: { id },
      });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.comment {
  width: 700px;
  min-height: 100px;
  padding: 10px 0;
  .comment-user {
    display: flex;
    font-size: 14px;
    img {
      width: 38px;
      height: 38px;
      border-radius: 100%;
      margin-right: 56- 38px;
    }
    > div {
      display: flex;
      flex-flow: column;
      line-height: 20px;
      .user {
        color: blue;
      }
      p {
        color: gray;
      }
    }
    margin: 10px 0;
  }
  .content-comment-user {
    min-height: 26px;
    padding-left: 56px;
  }
  .praise-comment-user {
    color: grey;
    margin: 10px 0 0;
    display: flex;
    flex-flow: column;
    .btn {
      display: flex;
      flex-flow: row-reverse;
      div {
        width: 50px;
        text-align: center;
        font-size: 14px;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        &:nth-child(2) {
          border-right: 1px solid grey;
          border-left: 1px solid grey;
        }
      }
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
  .look {
    font-size: 14px;
    color: gray;
  }
  .reply {
    background-color: white;
    margin-top: 10px;
    padding: 5px;
  }
  .beRepliedPage {
    height: 70px;
    div {
      position: relative;
    }
  }
}
</style>