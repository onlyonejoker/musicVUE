<template>
  <div class="userMyPlay">
    <div class="user-play-nav">
      <router-link active-class="active" to="myCreat">我创建的歌单</router-link>
      <router-link active-class="active" to="mySub">我收藏的歌单</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "userMyPlay",
};
</script>

<style lang="less" scoped>
.userMyPlay {
  width: 100%;
  min-height: 50vh;
  .user-play-nav {
    height: 64px;
    font-size: 18px;
    display: flex;
    width: 50%;
    padding-left: 15%;
    a {
      display: inline-block;
      text-align: center;
      line-height: 64px;
    }
  }
}
.active {
  color: red !important;
}
</style>