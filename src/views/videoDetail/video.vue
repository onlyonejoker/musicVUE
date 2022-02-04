<template>
  <div class="video">
    <nav>
      <div class="title">
        <h2 @click="openTag">全部视频</h2>
        <p>
          <span
            @click="active(index, item.id, 0)"
            v-for="(item, index) in classfly"
            :key="index"
            :class="{ active: classFlyIndex == index }"
          >
            {{ item.name }}
          </span>
        </p>
      </div>
      <div class="tagBox">
        <div class="tag" ref="videoTag" :class="{ tagShow: show }">
          <span
            @click="active(index, item.id, 1)"
            v-for="(item, index) in videoTag"
            :key="index"
            :class="{ active: tagIndex == index }"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </nav>
    <div class="videoAll">
      <video-c :video="item" v-for="(item, index) in videoAll" :key="index" />
      <page @page="page" :more="videoAllMore" />
    </div>
    <h2>推荐</h2>
    <div class="videoRecommend">
      <video-c
        :video="item"
        v-for="(item, index) in videoRecommend"
        :key="index"
      />
      <page @page="page" :more="videoAllMore" />
    </div>
  </div>
</template>

<script>
import {
  videoList,
  videoCategory,
  videoAll,
  videoRecommend,
  videoGroup,
} from "@/request/video";
import videoC from "../../components/common/list/video.vue";
import Page from "../../components/common/page/page.vue";
export default {
  name: "videoList",
  data() {
    return {
      videoTag: null,
      classfly: null,
      open: false,
      show: false,
      videoAll: null,
      videoAllMore: false,
      offset: 0,
      classFlyIndex: 0,
      tagIndex: 0,
      videoRecommend: null,
    };
  },
  components: {
    videoC,
    Page,
  },
  methods: {
    //请求相关
    async videoListFn() {
      console.log(1);
      let res = await Promise.all([
        videoCategory(),
        videoList(),
        videoAll(),
        videoRecommend(),
      ]);
      this.classfly = res[0].data;
      this.videoTag = res[1].data;
      this.videoAll = res[2].datas.map((e) => e.data);
      this.videoRecommend = res[3].datas.map((e) => e.data);
      this.videoAllMore = res[2].hasmore;
    },
    //全部
    async videoAllFn() {
      let res = await videoAll(this.offset);
      this.videoAll = res.datas.map((e) => e.data);
      this.videoAllMore = res.hasmore;
    },
    //id选择全部
    async videoGroup(id) {
      let res = await videoGroup(id, this.offset);
      this.videoAll = res.datas.map((e) => e.data);
      this.videoAllMore = res.hasmore;
    },
    //事件相关
    openTag() {
      this.open = !this.open;
      this.show = !this.open;
    },
    active(i, id, type) {
      if (type == 0) {
        this.classFlyIndex = i;
        this.videoGroup(id);
        return;
      }
      if (type == 1) {
        this.tagIndex = i;
        this.videoGroup(id);
      }
    },
    page(page) {
      this.offset = page;
      this.videoAllFn();
    },
  },
  mounted() {
    this.videoListFn();
  },
};
</script>

<style lang="less" scoped>
.video {
  padding: 0 5%;
  .title {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      border: 1px solid white;
      padding: 10px;
      border-radius: 50px 50px;
    }
    p {
      span {
        margin: 0 10px;
        border-radius: 28px 28px;
        padding: 6px;
        line-height: 28px;
      }
    }
  }
  nav {
    .tagBox {
      overflow: hidden;
      .tag {
        display: flex;
        flex-wrap: wrap;
        height: 0;
        transition: all 0.3s;
        span {
          width: 92px;
          height: 26px;
          margin: 10px 0;
          margin-right: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 28px 28px;
        }
      }
    }
  }
  .videoAll {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
  > h2 {
    margin: 50px 0 20px;
  }
  .videoRecommend {
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }
}
.active {
  background-color: rgb(255, 225, 225);
  color: red;
}
.tagShow {
  height: 368px !important;
  transition: all 0.3s;
}
</style>