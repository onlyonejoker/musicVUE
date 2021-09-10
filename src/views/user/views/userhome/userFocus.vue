<template>
  <div class="userFocus">
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