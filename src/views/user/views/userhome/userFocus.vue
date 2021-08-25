<template>
  <div class="userFocus">
    <div class="user-focus-nav">
      <router-link active-class="active" to="user">用户</router-link>
      <router-link active-class="active" to="song">歌手</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "userFocus",
};
</script>

<style lang="less" scoped>
.userFocus {
  width: 100%;
  min-height: 50vh;
  .user-focus-nav {
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