<template>
  <div class="userEvent">
    <div class="user-event-nav">
      <router-link active-class="active" to="comment">历史评论</router-link>
      <router-link active-class="active" to="events">动态</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.userEvent {
  width: 100%;
  min-height: 50vh;
  .user-event-nav {
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

