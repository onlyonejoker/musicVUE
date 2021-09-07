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
      <div
        class="tag"
        v-show="show"
        ref="videoTag"
        @transitionend="transitionend"
      >
        <span
          @click="active(index, item.id, 1)"
          v-for="(item, index) in videoTag"
          :key="index"
          :class="{ active: tagIndex == index }"
        >
          {{ item.name }}
        </span>
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
    videoListFn() {
      Promise.all([videoCategory(), videoList(), videoAll(), videoRecommend()])
        .then((res) => {
          console.log(res);
          this.classfly = res[0].data;
          this.videoTag = res[1].data;
          this.videoAll = res[2].datas.map((e) => {
            return e.data;
          });
          this.videoRecommend = res[3].datas.map((e) => {
            return e.data;
          });
          this.videoAllMore = res[2].hasmore;
        })
        .catch();
    },
    //全部
    videoAllFn() {
      videoAll(this.offset)
        .then((res) => {
          this.videoAll = res.datas.map((e) => {
            return e.data;
          });
          this.videoAllMore = res.hasmore;
        })
        .catch();
    },
    //id选择全部
    videoGroup(id) {
      videoGroup(id, this.offset)
        .then((res) => {
          this.videoAll = res.datas.map((e) => {
            return e.data;
          });
          this.videoAllMore = res.hasmore;
        })
        .catch();
    },
    //事件相关
    openTag() {
      this.open = !this.open;
      this.show = true;
      if (this.open) {
        this.$nextTick(() => {
          this.$refs.videoTag.style.height = 600 + "px";
          this.$refs.videoTag.style.opacity = 1;
        });
      } else {
        this.$refs.videoTag.style.height = 0;
        this.$refs.videoTag.style.opacity = 0;
      }
    },
    active(i, id, type) {
      if (type == 0) {
        this.classFlyIndex = i;
        this.videoGroup(id);
      } else if (type == 1) {
        this.tagIndex = i;
        this.videoGroup(id);
      }
    },
    page(page) {
      this.offset = page;
      this.videoAllFn();
    },
    transitionend() {
      if (!this.open) {
        this.show = false;
      }
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
    .tag {
      display: flex;
      flex-wrap: wrap;
      height: 0;
      transition: all 0.3s;
      opacity: 0;
      span {
        width: 9%;
        height: 4.3%;
        margin: 1% 0;
        margin-right: 2%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 28px 28px;
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
</style>