<template>
  <div class="event">
    <eventList
      v-for="(item, index) in eventLists"
      :key="index"
      :eventLists="item"
    />
    <page :more="more" @page="pageFn" />
  </div>
</template>

<script>
import { userEvent } from "@/request/user";
import eventList from "@/components/user/userhome/event/eventList.vue";
import page from "@/components/common/page/page.vue";
export default {
  name: "event",
  components: {
    page,
    eventList,
  },
  data() {
    return {
      eventLists: null,
      page: 0,
      more: false,
      lastTiem: -1,
    };
  },
  computed: {
    //优先路由id，获取用户信息参数
    uid() {
      return (
        this.$store.state.others || this.$store.state.login.account.id || null
      );
    },
  },
  watch: {},
  methods: {
    //分页器
    pageFn() {
      this.userEvent();
    },
    //请求参数
    userEvent() {
      userEvent(this.uid, 30, this.lastTiem)
        .then((res) => {
          this.more = res.more;
          this.lastTiem = res.lasttime;
          this.eventLists = res.events;
          console.log(this.eventLists);
        })
        .catch();
    },
  },
  mounted() {
    this.userEvent();
  },
};
</script>

<style lang="less" scoped>
.event {
  min-height: 50vh;
  position: relative;
}
</style>