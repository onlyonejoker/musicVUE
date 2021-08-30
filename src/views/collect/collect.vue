<template>
  <div>
    <topbar />
    <div class="collectRouter">
      <router-link active-class="active" to="album">专辑</router-link>
      <router-link active-class="active" to="song">歌手</router-link>
      <router-link active-class="active" to="special">专栏</router-link>
      <router-link active-class="active" to="video">视频</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import topbar from "../../components/common/topbar.vue";
export default {
  name: "",
  components: {
    topbar,
  },
};
</script>

<style lang="less" scoped>
.collectRouter {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  a {
    display: inline;
  }
}
.active {
  color: red;
}
</style>