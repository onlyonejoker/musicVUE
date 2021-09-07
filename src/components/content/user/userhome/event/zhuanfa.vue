<template>
  <div class="event">
    <div class="resourceInfo-event">
      <div class="eventUser">
        <router-link :to="{ path: '/user/home', query: { id } }">
          @{{ userName }}
        </router-link>
        ：{{ typeText }}
        {{ json.msg }}
        <playListEvent
          :json="json"
          v-if="json.playlist"
          class="event-playListEvent"
        />
        <songEvent :song="json.song" v-if="json.song" />
      </div>
    </div>
  </div>
</template>

<script>
import playListEvent from "./playListEvent.vue";
import songEvent from "./songEvent.vue";

export default {
  name: "zhuanfazujian",
  props: { json: Object, events: Object, id: [String, Number] },
  data() {
    return {
      typeText: null,
      userName: null,
    };
  },
  components: {
    playListEvent,
    songEvent,
  },
  methods: {
    type() {
      if (this.json.song) {
        this.typeText = "分享单曲";
      } else if (this.json.playlist) {
        this.typeText = "分享歌单";
        this.userName = this.json.playlist.creator.nickname;
      }
    },
  },
  mounted() {
    this.type();
    console.log(this.json);
  },
};
</script>

<style lang="less" scoped>
.event {
  .resourceInfo-event {
    display: flex;
    flex-flow: column;
    background-color: white;
    margin: 5px 0 5px 56px;
    padding: 5px;
    .resourceInfo {
      margin: 0;
    }
    .eventUser {
      font-size: 14px;
      a {
        color: blue;
        display: inline;
      }
      .event-playListEvent {
        margin-left: 0;
      }
    }
  }
}
</style>