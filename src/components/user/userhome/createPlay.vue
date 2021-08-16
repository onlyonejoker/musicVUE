<template>
  <div class="createPlay">
    <div class="create">
      <div class="title">歌手({{subcount.artistCount}})</div>
      <div class="content">
        <div v-for="(item,index) in null" :key="index"></div>
      </div>
    </div>
    <div class="create">
      <div class="title">我创建的歌单({{subcount.createdPlaylistCount}})</div>
      <div class="content">
        <div v-for="(item,index) in null" :key="index"></div>
      </div>
    </div>
    <div class="create">
      <div class="title">我收藏的歌单({{subcount.subPlaylistCount}})</div>
      <div class="content">
        <div v-for="(item,index) in null" :key="index"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "createPlay",
  props: { subcount: Object },
};
</script>

<style lang="less" scoped>
  .createPlay {
    padding: 20px;
    width: 100%;
    .create {
      width: 100%;
      height: 300px;
      .title {
        font-size: 20px;
        line-height: 30px;
        border-bottom: 5px solid rgba(226, 226, 226, 0.5);
      }
      .content {
        padding: 20px 0;
        height: calc(100% - 30px);
      }
    }
  }
</style>