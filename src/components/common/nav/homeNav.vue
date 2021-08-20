<template>
  <div class="nav">
    <div @click="active(0)">
      <router-link to="/" :class="{active:isActive==0}">首页</router-link>
    </div>
    <div @click="active(1)">
      <router-link to="/user/home" :class="{active:isActive==1}">我的音乐</router-link>
    </div>
    <div @click="active(2)">
      <router-link to="/artistItem" :class="{active:isActive==2}">歌手列表</router-link>
    </div>
    <div @click="active(3)">
      <router-link to="/ranking" :class="{active:isActive==3}">排行</router-link>
    </div>
    <div @click="active(4)">
      <router-link to="/MV" :class="{active:isActive==4}"> MV</router-link>
    </div>
    <div @click="active(5)">
      <router-link to="" :class="{active:isActive==5}">电台</router-link>
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