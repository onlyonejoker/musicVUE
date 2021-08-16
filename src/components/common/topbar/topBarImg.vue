<template>
  <router-link to="/">
    <div class="topbarImg">
      <p></p>
      <span>某抑云音乐</span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "topbarImg",
};
</script>

<style lang="less" scoped>
  a {
    display: block;
    height: 44px;
    width: 30%;
  }
  .topbarImg {
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    p {
      width: 35px;
      height: 35px;
      background: url("../../../assets/img/topbar.png");
      background-position: 0 -18px;
      margin-right: 20px;
    }
    span {
      font-size: 20px;
      font-weight: 700;
    }
  }
</style>