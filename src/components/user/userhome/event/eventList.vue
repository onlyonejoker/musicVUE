<template>
  <div class="eventList" v-if="json">
    <div class="eventList-user">
      <img :src="eventLists.user.avatarUrl" alt="img" />
      <div>
        <p>
          <router-link
            :to="{ path: '/user/home', query: { id: eventLists.user.userId } }"
          >
            {{ eventLists.user.nickname }}
          </router-link>
          <span class="type">{{ type(eventLists) }}</span>
        </p>
        <p>{{ this.$time(eventLists.eventTime) }}</p>
      </div>
    </div>
    <div class="content-eventList-user">
      <div v-if="events">{{ events.msg }}</div>
      <div v-else>{{ json.msg }}</div>
    </div>

    <playListEvent
      :json="json"
      v-if="eventLists.type == 35 || eventLists.type == 13"
    />
    <zhuanfaEvent
      :events="events"
      :id="eventLists.user.userId"
      :json="json"
      v-if="eventLists.type == 22"
    />
    <songEvent :song="json.song" v-if="eventLists.type == 18" />

    <div class="praise-eventList-user">
      <div
        v-if="this.$store.state.others == this.$store.state.login.account.id"
        @click="delEvent(eventLists.id)"
      >
        删除
      </div>
      <div>评论</div>
      <div @click="zhuanfa">
        <img src="@/assets/img/zhuanfa.svg" alt="zhuanfa" />
      </div>
      <div @click="dianzanFn">
        <img :src="dianzan[dianzanIndex]" alt="dianzan" />
      </div>
    </div>
    <div class="comment-eventList-user" v-if="commentEvents">
      <p v-if="commentEvents.length != 0" @click="displayCommentFn">
        查看{{ commentEvents.length }}条回复
      </p>
      <div v-if="displayComment">
        <div
          v-for="(item, index) in commentEvents"
          :key="index"
          class="fscomment"
        >
          <div class="fscomment-img">
            <img :src="item.user.avatarUrl" alt="img" />
          </div>
          <div class="fscomment-info">
            <router-link
              :to="{ path: '/user/home', query: { id: item.user.userId } }"
              >{{ item.user.nickname }}</router-link
            >
            <span class="time">{{ commentsTime(item.time) }}</span>
            <p>{{ item.content }}</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
    <page />
  </div>
  <div v-else>ceshi</div>
</template>

<script>
import { userEventDel, commentEvent } from "@/request/user";
import page from "../../../common/page/page.vue";
import playListEvent from "./playListEvent.vue";
import songEvent from "./songEvent.vue";
import zhuanfaEvent from "./zhuanfa.vue";
export default {
  name: "eventList",
  props: {
    eventLists: [Object],
  },
  components: {
    page,
    playListEvent,
    songEvent,
    zhuanfaEvent,
  },
  data() {
    return {
      dianzan: [
        require("@/assets/img/dianzan.svg"),
        require("@/assets/img/activeDianzan.svg"),
      ],
      dianzanIndex: 0,
      json: null,
      events: null,
      commentEvents: null,
      displayComment: false,
    };
  },

  methods: {
    //事件相关
    dianzanFn() {
      this.dianzanIndex == 0
        ? (this.dianzanIndex = 1)
        : (this.dianzanIndex = 0);
    },
    zhuanfa() {
      this.$bus.$emit(
        "zhuanfa",
        this.eventLists.id,
        this.eventLists.user.userId
      );
    },
    displayCommentFn() {
      this.displayComment = !this.displayComment;
    },
    //跳转相关
    linkPLay(id) {
      this.$router.push({ path: "/play", query: { id } });
    },
    linkUser(id) {
      this.$router.push({
        path: "/user/home",
        query: { id },
      });
    },
    //数据相关
    type(item) {
      if (item.type === 13 || item.type === 35) {
        return "分享歌单";
      } else if (item.type === 18) {
        return "分享单曲";
      } else if (item.type === 19) {
        return "分享专辑";
      } else if (item.type === 17 || item.type === 28) {
        return "分享电台节目";
      } else if (item.type === 22) {
        return "转发";
      } else if (item.type === 39) {
        return "发布视频";
      } else if (item.type === 24) {
        return "分享专栏文章";
      } else if (item.type === 41 || item.type === 21) {
        return "分享视频";
      }
    },
    typeList(type) {
      for (const key in type) {
        if (key == "playlist") {
          return "歌单";
        }
      }
    },
    recursion() {
      let item = JSON.parse(this.eventLists.json);

      if (item.event) {
        this.events = item;
        this.json = JSON.parse(item.event.json);
      } else {
        this.json = item;
      }
    },
    //评论时间
    commentsTime(time) {
      return this.$time(time);
    },
    //请求相关
    //删除动态
    delEvent(id) {
      userEventDel(id)
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
    //获取动态评论
    commentEvent() {
      commentEvent(this.eventLists.info.threadId)
        .then((res) => {
          this.commentEvents = res.comments;
        })
        .catch();
    },
  },
  mounted() {
    this.recursion();
    this.commentEvent();
  },
};
</script>

<style lang="less" scoped>
.eventList {
  width: 700px;
  min-height: 100px;
  margin-left: 5%;
  .eventList-user {
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
  .content-eventList-user {
    min-height: 26px;
    padding-left: 56px;
  }

  .praise-eventList-user {
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
  .comment-eventList-user {
    padding-left: 56px;
    > p {
      font-size: 14px;
      color: grey;
    }
    > div {
      padding: 10px;
      background-color: white;
      .fscomment {
        display: flex;
        > div {
          &:nth-child(1) {
            img {
              width: 38px;
              height: 38px;
              border-radius: 100%;
            }
            margin-right: 10px;
          }
          &:nth-child(2) {
            margin: 5px 0;
            position: relative;
            padding-right: 200px;
            display: flex;
            flex-flow: column;
            a {
              display: inline;
              color: gray;
              font-size: 14px;
              &:hover {
                color: red;
              }
            }
            p {
              margin: 10px 0;
            }
            .time {
              right: 0;
              font-size: 12px;
              color: grey;
            }
          }
        }
      }
    }
  }
}
</style>