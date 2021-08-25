<template>
  <div class="userMyPlay">
    <div class="user-play-nav">
      <router-link active-class="active" to="myCreat">我创建的歌单</router-link>
      <router-link active-class="active" to="mySub">我收藏的歌单</router-link>
      <router-link active-class="active" to="myDj">我的电台</router-link>
    </div>
    <div class="btn-item">
      <btn icon="el-icon-plus" @click.native="creatPlay" text="创建歌单" />
      <btn
        icon="el-icon-delete"
        v-if="display"
        @click.native="delPlay"
        text="删除歌单"
      />
    </div>
    <router-view />
  </div>
</template>

<script>
import btn from "btn/btn.vue";
export default {
  name: "userMyPlay",
  data() {
    return {
      del: false,
    };
  },
  computed: {
    display() {
      return (
        this.$store.state.others == null ||
        this.$store.state.others == this.$store.state.login.account.id
      );
    },
  },
  components: {
    btn,
  },
  methods: {
    creatPlay() {
      this.$bus.$emit("create");
    },
    delPlay() {
      this.del = !this.del;
      this.$bus.$emit("delPlayList", this.del);
    },
  },
};
</script>

<style lang="less" scoped>
.userMyPlay {
  width: 100%;
  min-height: 50vh;
  .user-play-nav {
    height: 64px;
    font-size: 14px;
    padding-left: 10%;
    a {
      display: inline;
      line-height: 64px;
      margin-right: 10px;
    }
  }
  .btn-item {
    padding: 0 10% 10px;
    .btn {
      margin-right: 10px;
    }
  }
}
.active {
  color: red !important;
}
</style>