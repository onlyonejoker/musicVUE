<template>
  <div class="highquality" v-if="playlistHighquality">
    <div class="title">
      <h2>精品歌单</h2>
      <btn text="全部歌单" @click.native="allClickFn" />
    </div>
    <div
      class="tag"
      :style="{ height: tagHeight + 'px' }"
      ref="highqualityTag"
      @transitionend="transitionend"
    >
      <span
        @click="tagItem(item.name)"
        v-for="(item, index) in playlistHighquality.tags"
        :key="index"
        :class="{ active: isTag == item.name }"
      >
        {{ item.name }}
      </span>
    </div>
    <div class="playItem">
      <playItem
        :play="item"
        v-for="(item, index) in topPlaylistHighqua.playlists"
        :key="index"
      />
      <page :more="more" @page="page" />
    </div>
  </div>
</template>

<script>
import { playlistHighqualityTags, highquality } from "@/request/playList";
import btn from "btn/btn.vue";
import playItem from "@/components/common/play/playItem.vue";
import page from "page/page.vue";
export default {
  name: "highquality",
  data() {
    return {
      playlistHighquality: null,
      topPlaylistHighqua: null,
      tagHeight: 0,
      isTag: "全部",
      more: false,
      before: -1,
    };
  },
  components: {
    btn,
    page,
    playItem,
  },
  methods: {
    playlistCatlistReq() {
      Promise.all([playlistHighqualityTags(), highquality()])
        .then((res) => {
          console.log(res);
          this.playlistHighquality = res[0];
          this.topPlaylistHighqua = res[1];
          this.more = res[1].more;
        })
        .catch();
    },
    updata() {
      highquality(this.isTag, 50, this.before)
        .then((res) => {
          console.log(res);
          this.topPlaylistHighqua = res;
          this.more = res.more;
        })
        .catch();
    },
    //事件相关
    allClickFn() {
      this.$refs.highqualityTag.style.display = "flex";
      this.tagHeight == 0 ? (this.tagHeight = 212) : (this.tagHeight = 0);
    },
    transitionend() {
      this.tagHeight == 0
        ? (this.$refs.highqualityTag.style.display = "none")
        : null;
    },
    tagItem(name) {
      this.isTag = name;
      this.updata();
    },
    //分页器
    page() {
      this.before = this.topPlaylistHighqua.lasttime;
      this.updata();
    },
  },
  mounted() {
    this.playlistCatlistReq();
  },
};
</script>

<style lang="less" scoped>
.highquality {
  margin: 20px 5%;
  .title {
    display: flex;
    justify-content: space-between;
    .btn {
      border-radius: 38px;
    }
  }
  .tag {
    width: 502px;
    display: none;
    flex-wrap: wrap;
    margin: 0 auto;
    border: 1px solid white;
    transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
    span {
      display: flex;
      width: 100px;
      height: 14.15%;
      justify-content: center;
      align-items: center;
    }
  }
  .playItem {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-top: 20px;
    justify-content: center;
  }
}
.active {
  color: red !important;
}
</style>