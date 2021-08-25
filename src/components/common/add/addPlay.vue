<template>
  <div class="addList" :class="{ display: isDispaly == index }">
    <p>播放列队</p>
    <ul>
      <li
        @click="playAdd(item.id, ids)"
        v-for="(item, index) in myCreatPlays"
        :key="index"
      >
        {{ item.name }}
      </li>
    </ul>
    <p @click="playCreate">添加到新歌单</p>
  </div>
</template>

<script>
import { playlist } from "@/request/user";
import { Notification } from "element-ui";
import { playTracks } from "@/request/playList";
export default {
  name: "addPlay",
  props: { isDispaly: Number, index: Number, ids: String },
  data() {
    return {
      myCreatPlays: [{ name: null, id: null }],
    };
  },
  computed: {},
  watch: {
    isDispaly() {
      if (this.index == this.isDispaly) {
        this.myCreatPlay(this.$store.state.login.account.id);
      }
    },
  },
  methods: {
    playCreate() {
      this.$bus.$emit("create");
    },
    //获取我收藏的歌单的id和name
    myCreatPlay(uid) {
      playlist(uid, 1000, 0)
        .then((res) => {
          let myCreatPlay = [];
          res.playlist.forEach((e) => {
            !e.subscribed ? myCreatPlay.push(e) : null;
          });
          this.myCreatPlays = myCreatPlay;
        })
        .catch(() => {
          if (this.num >= 3) {
            Notification({
              title: "错误",
              message: "歌单加载失败",
              type: "error",
              duration: 2000,
              showClose: false,
            });
          } else {
            this.myCreatPlay(this.$store.state.login.account.id);
            this.num++;
          }
        });
    },
    playAdd(pid, tracks) {
      console.log(pid, tracks);
      playTracks("add", pid, tracks)
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.addList {
  position: absolute;
  display: none;
  width: 170px;
  height: 357px;
  top: 44px;
  left: 30%;
  z-index: 1000;
  padding: 5px 0;
  border: 1px solid white;
  background-color: #c4c4c4;
  ul {
    width: 100%;
    height: 287px;
    padding: 10px 0;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    li {
      width: 100%;
      height: 36px;
      line-height: 36px;
      text-align: center;
      &:hover {
        background-color: red;
        color: #fff;
      }
    }
  }
  p {
    width: 100%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    &:hover {
      background-color: red;
      color: #fff;
    }
  }
}
.display {
  display: flex !important;
  flex-flow: column;
  justify-content: space-between;
}
</style>