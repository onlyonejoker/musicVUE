<template>
  <div class="hotList">
    <div class="title">热门话题</div>
    <router-link
      :to="{ path: '/hotDetail', query: { id: item.actId } }"
      v-for="(item, index) in hotEvent"
      :key="index"
    >
      <img :src="item.sharePicUrl" alt="" />
      <p>
        <span>{{ item.title }}</span>
        <span>{{ item.participateCount }}人参与</span>
      </p>
    </router-link>
    <page class="page" :more="more" @page="pageFn" />
  </div>
</template>

<script>
import page from "@/components/common/page/page.vue";
import { hotTopic } from "@/request/hot";
export default {
  name: "hotC",
  data() {
    return {
      more: true,
      page: 0,
      hotEvent: [],
    };
  },
  components: {
    page,
  },
  methods: {
    hotTopic() {
      hotTopic(20, this.page * 20)
        .then((res) => {
          console.log(res);
          this.hotEvent.splice(0, this.hotEvent.length);
          this.hotEvent.push(...res.hot);
        })
        .catch();
    },
    pageFn() {
      this.page++;
      console.log(this.page);
      this.hotTopic();
    },
  },
  mounted() {
    this.hotTopic();
  },
};
</script>

<style lang="less" scoped>
.hotList {
  position: relative;
  .title {
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
    margin-bottom: 10px;
  }
  a {
    display: flex;
    margin: 10px 0;
    img {
      width: 35px;
      height: 35px;
      border-radius: 5px;
    }
    p {
      display: flex;
      flex-flow: column;
      margin-left: 10px;
      span {
        &:nth-child(1) {
          font-size: 14px;
        }
        &:nth-child(2) {
          font-size: 12px;
          color: gray;
        }
      }
    }
  }
}
</style>