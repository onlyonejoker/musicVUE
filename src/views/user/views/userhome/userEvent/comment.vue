<template>
  <div class="userHistory">
    <comment :comments="item" v-for="(item, index) in comment" :key="index" />
  </div>
</template>

<script>
import { userHistory } from "@/request/user";
import comment from "@/components/common/comment/comment.vue";
export default {
  name: "userHistoryComment",
  data() {
    return {
      comment: [],
    };
  },
  components: {
    comment,
  },
  computed: {
    //优先路由id，获取用户信息参数
    uid() {
      return (
        this.$store.state.others || this.$store.state.login.account.id || null
      );
    },
  },
  methods: {
    userHistory() {
      userHistory(this.uid, 1000)
        .then((res) => {
          this.comment = res.data.comments;
        })
        .catch();
    },
  },
  created() {
    this.userHistory();
  },
};
</script>

<style lang="less" scoped>
</style>