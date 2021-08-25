<template>
  <div class="comment">
    <div class="comment-user">
      <img :src="comments.user.avatarUrl" alt="img" />
      <div>
        <p>
          <router-link
            :to="{ path: '/user/home', query: { id: comments.user.userId } }"
          >
            {{ comments.user.nickname }}
          </router-link>
          <span class="type">{{ type }}</span>
        </p>
        <p>{{ this.$time(comments.time) }}</p>
      </div>
    </div>
    <div class="content-comment-user">
      <div>{{ comments.content }}</div>
    </div>
    <div class="resourceInfo">
      <img
        :src="resourceInfo.coverImgUrl"
        @click="linkPLay"
        alt="coverImgUrl"
      />
      <p>
        <span>
          <span>歌单</span>
          <span @click="linkPLay">{{ resourceInfo.name }}</span>
        </span>
        <span @click="linkUser">by{{ comments.user.nickname }}</span>
      </p>
    </div>
    <div class="praise-comment-user">
      <div>评论</div>
      <div @click="zhuanfa">
        <img src="@/assets/img/zhuanfa.svg" alt="zhuanfa" />
      </div>
      <div @click="dianzanFn">
        <img :src="dianzan[dianzanIndex]" alt="dianzan" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: {
    comments: [Array, Object],
    type: {
      type: String,
      defauit() {
        return null;
      },
    },
  },
  data() {
    return {
      dianzan: [
        require("@/assets/img/dianzan.svg"),
        require("@/assets/img/activeDianzan.svg"),
      ],
      dianzanIndex: 0,
    };
  },
  computed: {
    resourceInfo() {
      if (this.comments) {
        let resourceInfo = JSON.parse(this.comments.resourceInfo);
        return resourceInfo;
      } else {
        return null;
      }
    },
  },
  methods: {
    //事件相关
    dianzanFn() {
      this.dianzanIndex == 0
        ? (this.dianzanIndex = 1)
        : (this.dianzanIndex = 0);
    },
    zhuanfa() {
      this.$bus.$emit("zhuanfa", this.comments.id, this.comments.user.userId);
    },
    //跳转相关
    linkPLay() {
      this.$router.push({ path: "/play", query: { id: this.resourceInfo.id } });
    },
    linkUser() {
      this.$router.push({
        path: "/user/home",
        query: { id: this.resourceInfo.userId },
      });
    },
  },
  mounted() {
    console.log(this.comments);
  },
};
</script>

<style lang="less" scoped>
.comment {
  width: 700px;
  min-height: 100px;
  margin-left: 5%;
  .comment-user {
    color: grey;
    display: flex;
    font-size: 14px;
    img {
      width: 38px;
      height: 38px;
      border-radius: 100%;
      margin-right: 56- 38px;
    }
    > div {
      p {
        a {
          color: rgba(0, 0, 255, 0.603);
          display: inline;
        }
        .type {
          font-size: 16px;
          color: black;
        }
      }
    }
    margin: 10px 0;
  }
  .content-comment-user {
    min-height: 26px;
    padding-left: 56px;
  }
  .resourceInfo {
    margin: 5px 0 5px 56px;
    padding: 10px 10px;
    background-color: white;
    display: flex;
    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
    p {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      span {
        &:nth-child(1) {
          span {
            &:nth-child(1) {
              color: red;
              border: 1px solid red;
              font-size: 12px;
            }
            &:nth-child(1) {
              &:hover {
                color: red;
              }
            }
          }
        }
        &:nth-child(2) {
          font-size: 12px;
          color: grey;
          &:hover {
            color: red;
          }
        }
      }
    }
  }
  .praise-comment-user {
    color: grey;
    padding-left: 56px;
    margin: 10px 0;
    display: flex;
    flex-flow: row-reverse;
    div {
      width: 50px;
      text-align: center;
      font-size: 14px;
      color: black;
      &:nth-child(2) {
        border-right: 1px solid grey;
        border-left: 1px solid grey;
      }
    }
  }
}
</style>