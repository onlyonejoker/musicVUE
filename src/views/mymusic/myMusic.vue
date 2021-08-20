<template>
  <div class="myMusic">
    <topbar />
    <home-nav />
    <section class="main">
      <div>
        <router-link to="myPlay">创建的歌单</router-link>
        <router-link to="myArtist">歌手/关注</router-link>
        <router-link to="mySubPlay">收藏的歌单</router-link>
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
  name: "myMusic",
  components: {
    topbar,
    homeNav,
  },
  data() {
    return {};
  },
  methods: {
    setCookie(cname, id) {
      if (id) {
        document.cookie = cname + "=" + id;
      } else {
        document.cookie = cname + "=" + "";
      }
    },
    getCookie() {
      let cookie = document.cookie.split(";");
      let id = 0;
      cookie.forEach((e) => {
        if (e.indexOf("id") !== -1) {
          id = e.split("=")[1];
        }
      });
      return id;
    },
    setSessionStorage(data) {
      sessionStorage.setItem("play", JSON.stringify(data));
    },
    playlists() {
      //写入跳转的id、防止刷新时删除
      this.setCookie("id", this.$route.query.id);
      //选择是是谁的歌单
      let uid = this.getCookie() || this.$store.state.login.account.id;

      let playId = [];
      let play = new Object();
      play.myPlay = [];
      play.collectPlay = [];
      playlist(uid, 30, 0)
        .then((res) => {
          console.log(res);
          res.playlist.forEach((e) => {
            if (e.userId == uid) {
              play.myPlay.push(e);
            } else {
              play.collectPlay.push(e);
              playId.push(e.id);
            }
          });
          if (uid == this.$store.state.login.account.id) {
            this.setSessionStorage(playId);
          }
          this.$store.commit("play", play);
        })
        .catch();
    },
  },
  created() {
    this.playlists();
  },
  //离开页面时清空id
  beforeRouteLeave(to, from, next) {
    this.setCookie("id", "");
    next();
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
        min-width: 200px;
        height: 300px;
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