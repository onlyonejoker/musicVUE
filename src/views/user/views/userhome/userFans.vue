<template>
  <div class="fansUser">
    <focusUserList
      v-for="(item, index) in fansUserInfo"
      :key="index"
      :focusUserInfo="item"
    />
    <page :more="more" @page="pages" />
  </div>
</template>

<script>
import { followedsList } from "@/request/user";
import focusUserList from "@/components/user/focusUser/focusUser.vue";
import page from "@/components/common/page/page.vue";
export default {
  name: "fansUser",
  data() {
    return {
      fansUserInfo: [],
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
      this.fansLists();
    },
  },
  methods: {
    //接受分液器事件
    pages(data) {
      this.page = data;
    },
    //请求关注列表
    fansLists() {
      followedsList(this.uid, 10, this.page * 10)
        .then((res) => {
          console.log(res);
          this.fansUserInfo.splice(0, this.fansUserInfo.length);
          this.fansUserInfo = res.followeds;
          this.more = res.more;
        })
        .catch();
    },
  },
  mounted() {
    this.fansLists();
  },
};
</script>

<style lang="less" scoped>
.fansUser {
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