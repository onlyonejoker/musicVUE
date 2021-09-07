<template>
  <div class="songUser">
    <focusSongList
      v-for="(item, index) in artistList"
      :key="index"
      :focusUserInfo="item"
    />
    <page :more="more" @page="pages" />
  </div>
</template>

<script>
import { artistList } from "@/request/user";
import focusSongList from "@/components/content/user/focusUser/focusSong.vue";
import page from "@/components/common/page/page.vue";
export default {
  name: "fansUser",
  data() {
    return {
      artistList: [],
      page: 0,
      more: false,
    };
  },
  computed: {
    //优先路由id，获取用户信息参数
    uid() {
      return this.$store.state.login.account.id || null;
    },
  },
  components: {
    focusSongList,
    page,
  },
  watch: {
    //分页
    page() {
      this.songLists();
    },
  },
  methods: {
    //接受分液器事件
    pages(data) {
      this.page = data;
    },
    //请求关注列表
    songLists() {
      artistList()
        .then((res) => {
          console.log(res);
          this.artistList.splice(0, this.artistList.length);
          this.artistList = res.data;
          this.more = res.hasMore;
        })
        .catch();
    },
  },
  mounted() {
    this.songLists();
  },
};
</script>

<style lang="less" scoped>
.songUser {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10%;
  position: relative;
  min-height: 50vh;
  .block {
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    span {
      display: inline-block;
      width: 100px;
      height: 20px;
    }
  }
}
</style>