<template>
  <div class="artistItem">
    <div class="artist-item-filtrate">
      <p>
        <span @click="aActiveFn(-1)" :class="{ active: aActive == -1 }"
          >热门</span
        >
        <span
          v-for="(item, index) in alphabet"
          :key="index"
          @click="aActiveFn(item)"
          :class="{ active: aActive == item }"
          >{{ item }}</span
        >

        <span @click="aActiveFn(0)" :class="{ active: aActive == 0 }">#</span>
      </p>
      <p>
        <span @click="bActiveFn(-1)" :class="{ active: bActive == -1 }">
          全部
        </span>
        <span @click="bActiveFn(1)" :class="{ active: bActive == 1 }">男</span>
        <span @click="bActiveFn(2)" :class="{ active: bActive == 2 }">女</span>
        <span @click="bActiveFn(3)" :class="{ active: bActive == 3 }"
          >组合</span
        >
      </p>
      <p>
        <span @click="cActiveFn(-1)" :class="{ active: cActive == -1 }">
          全部
        </span>
        <span @click="cActiveFn(7)" :class="{ active: cActive == 7 }"
          >华语</span
        >
        <span @click="cActiveFn(96)" :class="{ active: cActive == 96 }">
          欧美
        </span>
        <span @click="cActiveFn(8)" :class="{ active: cActive == 8 }"
          >日本</span
        >
        <span @click="cActiveFn(16)" :class="{ active: cActive == 16 }">
          韩国
        </span>
        <span @click="cActiveFn(0)" :class="{ active: cActive == 0 }"
          >其他</span
        >
      </p>
    </div>
    <div class="artist-item">
      <div
        class="artist-item-content"
        v-for="(item, index) in artistLists"
        :key="index"
        @click="artistDetail(item.id)"
      >
        <img v-lazy="item.img1v1Url" alt="img1v1Url" />
        <p>{{ item.name }}</p>
      </div>
      <page :more="more" @page="pageFn" />
    </div>
  </div>
</template>

<script>
import { artistList } from "@/request/artist";
import page from "common/page/page.vue";
export default {
  name: "artistItem",
  components: {
    page,
  },
  data() {
    return {
      aActive: -1,
      bActive: -1,
      cActive: -1,
      alphabet: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "N",
        "M",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      artistLists: [],
      more: false,
      page: 0,
    };
  },
  methods: {
    //事件相关
    aActiveFn(i) {
      this.aActive = i;
      this.artistList();
    },
    bActiveFn(i) {
      this.bActive = i;
      this.artistList();
    },
    cActiveFn(i) {
      this.cActive = i;
      this.artistList();
    },
    //分页
    pageFn(i) {
      this.page = i;
      this.artistList();
    },
    //跳转
    artistDetail(id) {
      this.$router.push({ path: "/artistDetail", query: { id } });
    },
    //请求相关
    artistList() {
      artistList(30, this.page * 30, this.aActive, this.bActive, this.cActive)
        .then((res) => {
          console.log(res);
          this.artistLists = [];
          this.artistLists = res.artists;
          this.more = res.more;
        })
        .catch();
    },
  },
  mounted() {
    this.artistList();
  },
};
</script>

<style lang="less" scoped>
.artistItem {
  .artist-item-filtrate {
    width: 1200px;
    height: 150px;
    margin: 25px auto;
    p {
      height: 50px;
      display: flex;
      align-items: center;
      span {
        border-radius: 17px 17px;
        box-sizing: content-box;
        line-height: 22px;
        padding: 5px 10px;
      }
    }
  }
  .artist-item {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 900px;
    margin: 0 auto;
    .artist-item-content {
      margin: 20px;
      img {
        width: 140px;
        height: 140px;
        border-radius: 100%;
      }
      p {
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
.active {
  background-color: rgb(253, 237, 237) !important;
  color: red !important;
}
</style>