<template>
  <div class="nav">
    <div>
      <router-link to="/" active-class="active">首页</router-link>
    </div>
    <div>
      <router-link
        :to="{
          path: '/user/home',
          query: { id: this.$store.state.login.account.id },
        }"
        :class="{ active: isActive == 1 }"
        >我的音乐</router-link
      >
    </div>
    <div>
      <router-link to="/hot" active-class="active">热门</router-link>
    </div>
    <div>
      <router-link to="/artistItem" active-class="active">歌手列表</router-link>
    </div>
    <div>
      <router-link to="/ranking" active-class="active">排行</router-link>
    </div>
    <div>
      <router-link to="/MV" active-class="active"> MV</router-link>
    </div>
    <div>
      <router-link to="" active-class="active">电台</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeNav",
  data() {
    return {
      isActive: 0,
    };
  },

  methods: {
    active(i) {
      this.isActive = i;
    },
    router() {
      this.$route.path.indexOf("playDetails") !== -1
        ? (this.isActive = 1)
        : null;
      this.$route.path.indexOf("artistItem") !== -1
        ? (this.isActive = 2)
        : null;

      this.$route.path.indexOf("ranking") !== -1 ? (this.isActive = 3) : null;
      this.$route.path.indexOf("home") !== -1 ? (this.isActive = 0) : null;
      this.$route.path.indexOf("MV") !== -1 ? (this.isActive = 4) : null;
    },
  },
  mounted() {
    this.router();
  },
};
</script>

<style lang="less" scoped>
.nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 0 15%;
  div {
    width: 10%;
    height: 44px;
    a {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
  }
  .active {
    color: red;
  }
}
</style>