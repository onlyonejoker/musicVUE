<template>
  <div class="createPlay">

    <div class="create">
      <div class="title">歌手({{subcount.artistCount}})</div>
      <div class="content">
        <playItem v-for="(item,index) in myPlay" :key="index" :playUrl="item.coverImgUrl" :playName="item.name" :id="{id:item.id,e:1}" />
      </div>
    </div>

    <div class="create">
      <div class="title">我创建的歌单({{subcount.createdPlaylistCount}})</div>
      <div class="content">
        <playItem v-for="(item,index) in myPlay" :key="index" :playUrl="item.coverImgUrl" :playName="item.name" :id="{id:item.id,e:2}" />
      </div>
    </div>

    <div class="create">
      <div class="title">我收藏的歌单({{subcount.subPlaylistCount}})</div>
      <div class="content">
        <playItem v-for="(item,index) in collectPlay" :key="index" :playUrl="item.coverImgUrl" :playName="item.name" :id="{id:item.id,e:3}" />
      </div>
    </div>

  </div>
</template>

<script>
import { playlist } from "@/request/user";
import playItem from "../../common/play/playItem.vue";
export default {
  name: "createPlay",
  props: { subcount: Object },
  data() {
    return {
      myPlay: [],
      collectPlay: [],
      data() {
        return {};
      },
    };
  },
  components: {
    playItem,
  },
  methods: {
    playlists() {
      let uid = this.$store.state.login.account.id;
      playlist(uid, 30, 0)
        .then((res) => {
          res.playlist.forEach((e) => {
            if (e.userId == uid) {
              this.myPlay.push(e);
            } else {
              this.collectPlay.push(e);
            }
          });
        })
        .catch();
    },
  },
  created() {
    this.playlists();
  },
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
        display: flex;
      }
    }
  }
</style>