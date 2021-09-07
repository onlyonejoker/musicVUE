<template>
  <div class="mvhome">
    <nav>
      <router-link active-class="active" to="mvAll">全部</router-link>
      <div>
        <span
          :class="{ active: index == mvFirstAreaActive }"
          v-for="(item, index) in mvFirstArea"
          :key="index"
          @click="active(0, index)"
        >
          {{ item }}
        </span>
      </div>
    </nav>
    <h2>最新</h2>
    <div class="mvFirst">
      <video-c :video="item" v-for="(item, index) in mvFirst" :key="index" />
      <page @page="mvFirstPageFn" :more="mvFirstMore" />
    </div>
    <h2>推荐</h2>
    <div class="mvFirst">
      <video-c
        :video="item"
        v-for="(item, index) in personalized"
        :key="index"
      />
    </div>
    <h2>网易出品</h2>
    <div class="mvFirst">
      <video-c :video="item" v-for="(item, index) in mvWYmake" :key="index" />
      <page @page="mvWYmakePageFn" :more="mvWYmakeMore" />
    </div>
    <nav>
      <h2>MV排行</h2>
      <div>
        <span
          :class="{ active: index == mvTopMvAreaActive }"
          v-for="(item, index) in mvFirstArea"
          :key="index"
          @click="active(1, index)"
        >
          {{ item }}
        </span>
      </div>
    </nav>
    <div class="mvFirst">
      <div v-for="(item, index) in topMV" :key="index">
        <h4>NO:{{ item.lastRank }}</h4>
        <video-c :video="item" />
      </div>
      <page @page="topMvPageFn" :more="topMVMore" />
    </div>
  </div>
</template>

<script>
import {
  mvFirst,
  mvExclusiveRcmd,
  personalizedMv,
  topMv,
} from "@/request/video";
import videoC from "../../components/common/list/video.vue";
import Page from "../../components/common/page/page.vue";
export default {
  name: "mvhome",
  data() {
    return {
      mvFirstArea: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      mvFirstAreaActive: 0,
      mvTopMvAreaActive: 1,
      mvFirst: null,
      mvFirstPage: 0,
      mvFirstMore: false,
      personalized: null,
      mvWYmake: null,
      mvWYmakeOffset: 0,
      mvWYmakeMore: false,
      topMV: null,
      topMVoffset: 0,
      topMVMore: false,
    };
  },
  components: {
    videoC,
    Page,
  },
  methods: {
    //事件相关
    active(type, index) {
      if (type == 0) {
        this.mvFirstAreaActive = index;
        this.mvFirstFn();
      } else if (type == 1) {
        this.mvTopMvAreaActive = index;
        this.topMVfn();
      }
    },
    mvFirstPageFn(page) {
      this.mvFirstPage = page;
      this.mvFirstFn();
    },
    mvWYmakePageFn(page) {
      this.mvWYmakeOffset = page;
      this.personalizedFn();
    },
    topMvPageFn(page) {
      this.topMVoffset = page;
      this.topMVfn();
    },
    //请求相关
    mvlist() {
      Promise.all([
        mvFirst(this.mvFirstArea[this.mvFirstAreaActive], 6),
        mvExclusiveRcmd(6, this.mvWYmakeOffset * 6),
        personalizedMv(),
        topMv(10),
      ])
        .then((res) => {
          this.mvFirstMore = res[0].hasMore;
          this.mvFirst = res[0].data;
          this.mvWYmake = res[1].data;
          this.mvWYmakeMore = res[1].more;
          this.personalized = res[2].result;
          this.topMVMore = res[3].hasMore;
          this.topMV = res[3].data;
        })
        .catch();
    },
    mvFirstFn() {
      mvFirst(this.mvFirstArea[this.mvFirstAreaActive], 6, this.mvFirstPage * 6)
        .then((res) => {
          this.mvFirstMore = res.hasMore;
          this.mvFirst = res.data;
        })
        .catch();
    },
    personalizedFn() {
      mvExclusiveRcmd(6, this.mvWYmakeOffset * 6)
        .then((res) => {
          this.mvWYmake = res.data;
          this.mvWYmakeMore = res.more;
        })
        .catch();
    },
    topMVfn() {
      if (this.mvTopMvAreaActive == 0) {
        topMv(10, null, this.topMVoffset * 10)
          .then((res) => {
            this.topMVMore = res.hasMore;
            this.topMV = res.data;
          })
          .catch();
      } else {
        topMv(
          10,
          this.mvFirstArea[this.mvTopMvAreaActive],
          this.topMVoffset * 10
        )
          .then((res) => {
            console.log(res);
            this.topMVMore = res.hasMore;
            this.topMV = res.data;
          })
          .catch();
      }
    },
  },
  mounted() {
    this.mvlist();
  },
};
</script>

<style lang="less" scoped>
.mvhome {
  padding: 0 10%;
  nav {
    display: flex;
    justify-content: space-between;
    a {
      width: 88px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border: 1px solid white;
      border-radius: 28px 28px;
      font-weight: 700;
      &:active {
        background-color: red;
        color: white;
      }
    }
    > div {
      span {
        padding: 5px 10px;
        border-radius: 28px 28px;
        line-height: 27px;
      }
    }
  }
  .mvFirst {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    position: relative;
    margin-bottom: 70px;
  }
  h2 {
    margin: 20px 0;
  }
}
.active {
  background-color: rgb(255, 225, 225);
  color: red;
}
h4 {
  padding: 20px 0 0;
  color: red;
}
</style>