<template>
  <div class="friendEvent">
    <div>
      <eventList
        v-for="(item, index) in eventList"
        :key="index"
        :eventLists="item"
      />
    </div>
    <div>
      <hot />
    </div>
    <page :more="more" @page="pageFn" />
  </div>
</template>

<script>
import page from "@/components/common/page/page.vue";
import eventList from "@/components/content/user/userhome/event/eventList.vue";
import hot from "../hot/hot.vue";
import { event } from "@/request/hot";
export default {
  name: "friendEvent",
  components: {
    page,
    eventList,
    hot,
  },
  data() {
    return {
      more: false,
      lastTime: -1,
      eventList: [],
    };
  },
  methods: {
    //事件相关
    pageFn() {
      this.event();
    },
    event() {
      event(20, this.lastTime)
        .then((res) => {
          console.log(res);
          this.more = res.more;
          this.eventList = [];
          this.eventList.push(...res.event);
          this.lastTime = res.lasttime;
        })
        .catch();
    },
  },
  mounted() {
    this.event();
  },
};
</script>

<style lang="less" scoped>
.friendEvent {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 20px 10%;
  min-width: 1440px;
}
</style>