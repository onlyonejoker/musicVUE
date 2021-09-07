<template>
  <div class="focusUser">
    <focusUserList
      v-for="(item, index) in focusUserInfo"
      :key="index"
      :focusUserInfo="item"
    />
    <page :more="more" @page="pages" />
  </div>
</template>

<script>
import { followList } from "@/request/user";
import focusUserList from "@/components/content/user/focusUser/focusUser.vue";
import page from "@/components/common/page/page.vue";
export default {
  name: "focusUser",
  data() {
    return {
      focusUserInfo: [],
      page: 0,
      more: false,
    };
  },
  computed: {
    //优先路由id，获取用户信息参数
    uid() {
      return (
        this.$store.state.others || this.$store.state.login.account.id || null
      );
    },
  },
  components: {
    focusUserList,
    page,
  },
  watch: {
    //分页
    page() {
      this.followLists();
    },
  },
  methods: {
    //接受分液器事件
    pages(data) {
      this.page = data;
    },
    //请求关注列表
    followLists() {
      followList(this.uid, 10, this.page * 10)
        .then((res) => {
          console.log(res);
          this.focusUserInfo.splice(0, this.focusUserInfo.length);
          this.focusUserInfo = res.follow;
          this.more = res.more;
        })
        .catch();
    },
  },
  mounted() {
    this.followLists();
  },
};
</script>

<style lang="less" scoped>
.focusUser {
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