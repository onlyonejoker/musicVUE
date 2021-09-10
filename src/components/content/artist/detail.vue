<template>
  <div class="artistDetail">
    <div class="artistInfo" v-if="artistInfo">
      <img v-lazy="artistInfo.artist.cover" alt="" />
      <div>
        <h1>{{ artistInfo.artist.name }}</h1>
        <p>
          <span>单曲数：{{ artistInfo.artist.musicSize }}</span>
          <span>专辑数：{{ artistInfo.artist.albumSize }}</span>
          <span>MV数：{{ artistInfo.artist.mvSize }}</span>
        </p>
        <btn
          icon="el-icon-plus"
          :class="{ active: isActive }"
          :text="sub()"
          @click.native="followed"
        />
        <btn icon="el-icon-user" text="个人主页" @click.native="linkUser" />
      </div>
    </div>
    <nav v-if="artistInfo">
      <router-link active-class="activeNav" :to="'album?id=' + uid">
        专辑
      </router-link>
      <router-link active-class="activeNav" :to="'mv?id=' + uid">
        MV
      </router-link>
      <router-link
        active-class="activeNav"
        :to="'info?id=' + uid + '&name=' + artistInfo.artist.name"
      >
        歌手信息
      </router-link>
      <router-link active-class="activeNav" :to="'similarity?id=' + uid">
        相似歌手
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import btn from "btn/btn.vue";
import { artistDetail, artistSub } from "@/request/artist";
export default {
  name: "artistDetail",
  data() {
    return {
      artistInfo: null,
      artistDesc: null,
      isActive: false,
      userid: null,
    };
  },
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  watch: {
    uid() {
      this.artistDetail();
    },
  },
  components: {
    btn,
  },
  methods: {
    artistDetail() {
      artistDetail(this.uid)
        .then((res) => {
          this.artistInfo = res.data;
          if (res.data.user) {
            this.userid = res.data.user.userId;
            this.isActive = res.data.user.followed;
            this.$store.commit("artistUid", this.userid);
          }
        })
        .catch();
    },

    //数据相关
    sub() {
      if (this.artistInfo) {
        if (this.isActive) {
          return "已关注";
        } else {
          return "关注";
        }
      }
    },

    //事件相关
    followed() {
      let t = 0;
      this.isActive ? (t = 0) : (t = 1);
      artistSub(this.uid, t)
        .then(() => {
          this.isActive = !this.isActive;
        })
        .catch();
    },
    linkUser() {
      this.$router.push({
        path: "/user/home",
        query: { id: this.userid },
      });
    },
  },
  mounted() {
    this.artistDetail();
  },
};
</script>

<style lang="less" scoped>
.artistDetail {
  padding: 50px 10%;
  display: flex;

  flex-flow: column;
  .artistInfo {
    display: flex;
    align-items: center;
    img {
      width: 250px;
      height: 250px;
      border-radius: 100%;
    }
    > div {
      margin-left: 50px;
      > p {
        margin: 20px 0;
        span {
          margin-right: 20px;
        }
      }
      .btn {
        margin-right: 20px;
      }
    }
  }
  nav {
    display: flex;
    margin: 30px 0;
    border-bottom: 1px solid white;
    a {
      margin-right: 20px;
      line-height: 50px;
    }
  }
}
.active {
  color: white;
  background-color: rgba(255, 0, 0);
  &:hover {
    background-color: rgba(255, 0, 0);
  }
  &:active {
    background-color: rgba(255, 0, 0, 0.6);
  }
}
.activeNav {
  border-bottom: 2px solid red;
}
</style>