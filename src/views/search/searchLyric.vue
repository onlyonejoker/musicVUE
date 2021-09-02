<template>
  <div class="searchLyric">
    <p>
      <span>音乐标题</span>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </p>
    <div
      :class="{ active: isActive == index }"
      v-for="(Item, index) in songs"
      :key="index"
      class="songs"
      @click="active(index, Item)"
    >
      <p class="title">
        <span>{{ Item.name }}</span>
        <span class="author">
          <span v-for="(item, index) in Item.ar" :key="index">
            {{ item.name }}/
          </span>
        </span>
        <span @click="linkAl(Item.al.id)">{{ Item.al.name }}</span>
        <span>
          {{ Math.floor(Item.dt / 1000 / 60) }} :
          {{
            Math.floor((Item.dt / 1000) % 60) >= 10
              ? Math.floor((Item.dt / 1000) % 60)
              : "0" + Math.floor((Item.dt / 1000) % 60)
          }}
        </span>
      </p>
      <div class="lyrics" :ref="'searchLyrics' + index">
        <btn text="展开歌词" @click.native="unfold(index)" />
        <p v-html="Item.lyrics[0]"></p>
        <p v-for="(item, index) in Item.lyrics" :key="index">
          <span v-if="index !== 0">{{ item }}</span>
        </p>
      </div>
    </div>
    <page :more="more" @page="pageFn" />
  </div>
</template>

<script>
import page from "page/page.vue";
import btn from "btn/btn.vue";
import { _search } from "@/request/search";
export default {
  name: "searchLyric",
  data() {
    return {
      page: 0,
      songs: [],
      more: true,
      isActive: 0,
    };
  },
  components: {
    page,
    btn,
  },
  methods: {
    //请求相关
    searchLyric() {
      _search(this.$route.query.keywords, 30, this.page * 30, 1006)
        .then((res) => {
          console.log(res);
          this.songs = res.result.songs;
          this.$bus.$emit("search", res.result.songCount, "首歌词");
        })
        .catch();
    },
    //事件相关
    pageFn(page) {
      this.page = page;
      this.searchLyric();
    },
    active(i, songs) {
      this.isActive = i;
      this.$store.commit("musicInfo", songs);
    },
    unfold(index) {
      if (this.$refs["searchLyrics" + index][0].style.height == "200px") {
        this.$refs["searchLyrics" + index][0].style.height = "auto";
      } else {
        this.$refs["searchLyrics" + index][0].style.height = 200 + "px";
      }
    },
    linkAl(id) {
      this.$router.push({ path: "/albumDetail", query: { id } });
    },
  },
  mounted() {
    this.searchLyric();
  },
};
</script>

<style lang="less" scoped>
.searchLyric {
  position: relative;
  padding: 0 15%;
  > p {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-bottom: 5px;
    background-color: gray;
    span {
      text-align: center;
      width: 25%;
    }
  }
  .songs {
    width: 100%;
    display: flex;
    flex-flow: column;
    margin-bottom: 20px;
    border: 1px solid white;
    .title {
      display: flex;
      width: 100%;
      margin-bottom: 20px;

      > span {
        width: 25%;
        padding-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
      }
    }
    .lyrics {
      position: relative;
      overflow: scroll;
      &::-webkit-scrollbar {
        width: 6px; //左侧滚动条宽度
        height: 0px; //下侧滚动高度
        background-color: #f0f0f0; //滚动条颜色
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px; //滑块样式
        background-color: #ff0000; //滑块颜色
      }
      &::-webkit-scrollbar-track {
        border-radius: 10px; //滚动条样式
        background-color: #ffffff; //滚动条颜色
      }
      color: rgb(49, 49, 49);
      line-height: 20px;
      font-size: 14px;
      padding-bottom: 20px;
      height: 200px;
      text-align: center;
      .btn {
        position: absolute;
        border-radius: 38px;
        top: 0;
        right: 0;
      }
    }
  }
}
.active {
  background-color: rgba(128, 128, 128, 0.233);
}
</style>