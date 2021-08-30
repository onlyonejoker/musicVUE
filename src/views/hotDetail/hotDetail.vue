<template>
  <div class="topicDetail">
    <topbar />
    <!-- 热门详情 -->
    <div class="topic-detail" v-if="act">
      <div class="topic-detail-img">
        <img :src="act.coverMobileUrl" alt="coverMobileUrl" />
        <div class="fenxiang el-icon-link" @click="fenxiang"></div>
      </div>
      <p class="title" v-for="(item, index) in act.text" :key="index">
        {{ item }}
      </p>
    </div>
    <!-- 热门评论 -->
    <div class="hot-commont">
      <p class="title">热门评论</p>
      <eventList
        v-for="(item, index) in events"
        :key="index"
        :eventLists="item"
      />
    </div>
  </div>
</template>

<script>
import { topicDetail, eventHot } from "@/request/hot";

import topbar from "../../components/common/topbar.vue";
import eventList from "@/components/user/userhome/event/eventList.vue";
export default {
  name: "topicDetail",
  components: {
    topbar,
    eventList,
  },
  data() {
    return {
      act: null,
      events: null,
      allEvents: null,
    };
  },
  computed: {
    actid() {
      return this.$route.query.id;
    },
  },

  methods: {
    topicDetail() {
      Promise.all([topicDetail(this.actid), eventHot(this.actid)]).then(
        (res) => {
          console.log(res);
          this.act = res[0].act;
          this.events = res[1].events;
        }
      );
    },
    //事件相关
    fenxiang() {
      this.$bus.$emit("fenxiang", this.actid);
    },
  },
  mounted() {
    this.topicDetail();
  },
};
</script>

<style lang="less" scoped>
.topicDetail {
  .topic-detail {
    width: 80%;
    min-width: 800px;
    margin: 20px auto 0;
    padding-bottom: 40px;
    border-bottom: 1px solid gray;
    .topic-detail-img {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      img {
        width: 80%;
        border-radius: 10px;
      }
      > div {
        position: absolute;
        color: rgba(255, 255, 255, 0.623);
        font-size: 30px;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        border: 1px solid rgba(255, 255, 255, 0.61);
        text-align: center;
        line-height: 40px;
        right: 100px;
        top: 10px;
        &:hover {
          border: 1px solid white;
          color: white;
        }
      }
    }
    .title {
      margin: 10px 0;
      display: flex;
      justify-content: center;
      color: gray;
      &::before {
        content: "*";
        display: block;
        width: 10px;
        color: red;
      }
    }
  }
  .hot-commont {
    margin: 20px auto 0;
    width: 80%;
    min-width: 800px;
    padding-bottom: 40px;
    border-bottom: 1px solid gray;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>