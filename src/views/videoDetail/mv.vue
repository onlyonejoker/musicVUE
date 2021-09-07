<template>
  <div class="MV">
    <topbar />
    <nav>
      <router-link active-class="active" to="mv">MV</router-link>
      <router-link active-class="active" to="/mv/video">视频</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import topbar from "../../components/common/topbar.vue";
export default {
  name: "mv",
  components: { topbar },
};
</script>

<style lang="less" scoped>
.MV {
  nav {
    margin: 20px 10%;
    display: flex;
    a {
      margin: 0 10px;
    }
  }
}
.active {
  color: red;
}
</style>