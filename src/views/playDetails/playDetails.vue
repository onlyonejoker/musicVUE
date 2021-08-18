<template>
  <div class="playDetails">
    <topbar />
    <home-nav />
    <section class="main">
      <div>
        <router-link to="play">创建的歌单</router-link>
        <router-link to="artist">歌手/关注</router-link>
        <router-link to="subPlay">收藏的歌单</router-link>
        <router-link to="">保留</router-link>
        <router-link to="">保留</router-link>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import topbar from "@/components/common/topbar.vue";
import homeNav from "@/components/common/nav/homeNav.vue";
import { playlist } from "@/request/user";
export default {
  name: "playDetails",
  components: {
    topbar,
    homeNav,
  },
  data() {
    return {
      myPlay: [],
      collectPlay: [],
    };
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
            this.$bus.play = {
              myPlay: this.myPlay,
              collectPlay: this.collectPlay,
            };
            console.log(this.$bus.play);
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
  .main {
    padding: 20px;
    display: flex;
    > div {
      &:nth-child(1) {
        width: 10%;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-around;
        a {
          height: 50px;
          line-height: 50px;
          font-size: 16px;
        }
      }
    }
  }
</style>