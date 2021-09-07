<template>
  <div class="mvAll">
    <nav>
      <router-link active-class="active" to="/mv/mv/mvhome">最新</router-link>
    </nav>
    <div class="nav">
      <div>
        <p>地区：</p>
        <div>
          <span
            @click="active(0, index)"
            :class="{ active: index == areaIndex }"
            v-for="(item, index) in area"
            :key="index"
            >{{ item }}</span
          >
        </div>
      </div>
      <div>
        <p>类型：</p>
        <div>
          <span
            @click="active(1, index)"
            :class="{ active: index == typeIndex }"
            v-for="(item, index) in type"
            :key="index"
            >{{ item }}</span
          >
        </div>
      </div>
      <div>
        <p>排序：</p>
        <div>
          <span
            @click="active(2, index)"
            :class="{ active: index == orderIndex }"
            v-for="(item, index) in order"
            :key="index"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
    <div class="video">
      <video-c v-for="(item, index) in video" :key="index" :video="item" />
    </div>
    <page @page="pageFn" :more="more" />
  </div>
</template>

<script>
import { mvAll } from "@/request/video";
import page from "@/components/common/page/page.vue";
import videoC from "../../components/common/list/video.vue";
export default {
  name: "mvAll",
  components: { page, videoC },
  data() {
    return {
      more: false,
      area: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      areaIndex: 0,
      type: ["全部", "官方版", "原生", "现场版", "网易出品"],
      typeIndex: 0,
      order: ["上升最快", "最热", "最新"],
      orderIndex: 0,
      offset: 0,
      video: null,
    };
  },
  methods: {
    pageFn(page) {
      this.offset = page;
      this.mvAllFn();
    },
    mvAllFn() {
      mvAll(
        this.area[this.areaIndex],
        this.type[this.typeIndex],
        this.order[this.orderIndex],
        30,
        this.offset
      )
        .then((res) => {
          console.log(res);
          this.video = res.data;
          this.more = res.hasMore;
        })
        .catch();
    },
    active(type, index) {
      if (type == 0) {
        this.areaIndex = index;
        this.mvAllFn();
      } else if (type == 1) {
        this.typeIndex = index;
        this.mvAllFn();
      } else if (type == 2) {
        this.orderIndex = index;
        this.mvAllFn();
      }
    },
  },
  mounted() {
    this.mvAllFn();
  },
};
</script>

<style lang="less" scoped>
.mvAll {
  padding: 0 10%;
  position: relative;
  nav {
    a {
      width: 88px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-weight: 700;
      border: 1px solid white;
      border-radius: 28px 28px;
      &:active {
        background-color: red;
        color: white;
      }
    }
  }
  .nav {
    > div {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      p {
        width: 10%;
        line-height: 27px;
      }
      div {
        width: 90%;
        span {
          padding: 5px 10px;
          border-radius: 28px 28px;
          line-height: 27px;
        }
      }
    }
  }
  .video {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
.active {
  background-color: rgb(255, 225, 225);
  color: red;
}
</style>