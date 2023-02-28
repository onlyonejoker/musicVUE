<template>
  <div class="home">
    <topbar></topbar>
    <div class="banner" v-if="banner">
      <h1>精彩推荐</h1>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item
          v-for="(item, index) in banner"
          :key="'banner' + index"
          @click.native="link(item.encodeId, item.targetType, item.url)"
        >
          <div class="home-banner">
            <img :src="item.imageUrl" alt="imageUrl" />
            <div
              :style="{ backgroundColor: item.titleColor }"
              class="home-banner-title"
            >
              {{ item.typeTitle }}
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tjPlay" v-if="tjPlay">
      <h1>推荐歌单</h1>
      <div>
        <playItem
          :play="item"
          v-for="(item, index) in tjPlay"
          :key="'tjplay' + index"
        />
      </div>
    </div>
    <div class="newSong" v-if="newSong">
      <h1>新歌首发</h1>
      <div>
        <song-list
          :newSong="item"
          v-for="(item, index) in newSong"
          :key="'newSong' + index"
          :index="index"
        />
      </div>
    </div>
    <div class="programs" v-if="programs">
      <h1>推荐节目</h1>
      <div>
        <dj-list
          :dj="item"
          v-for="(item, index) in programs"
          :key="'programs' + index"
        />
      </div>
    </div>
    <div class="onlyOne" v-if="onlyOne">
      <h1>独家放送</h1>
      <div>
        <videos :video="item" v-for="(item, index) in onlyOne" :key="index" />
      </div>
    </div>
    <div class="top" v-if="programs">
      <h1>排行榜</h1>
      <div>
        <home-top
          :index="index"
          :top="item"
          v-for="(item, index) in top"
          :key="'top' + index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import topbar from "@/components/common/title/topbar.vue";
import {
  banner,
  personalized,
  personalizedMv,
  personalizedNewsong,
  personalizedDjprogram,
  programRecommend,
  personalizedPrivatecontent,
  toplist,
} from "@/request/home";
import playItem from "@/components/common/play/playItem.vue";
import songList from "../../components/common/list/songList.vue";
import DjList from "../../components/common/list/djList.vue";
import Videos from "../../components/common/list/video.vue";
import HomeTop from "../../components/content/home/home-top.vue";
export default {
  name: "Home",
  components: {
    topbar,
    playItem,
    songList,
    DjList,
    Videos,
    HomeTop,
  },
  data() {
    return {
      banner: null,
      tjPlay: null,
      newSong: null,
      programs: null,
      onlyOne: null,
      top: null,
    };
  },
  methods: {
    requset() {
      Promise.all([
        banner(),
        personalized(),
        personalizedMv(),
        personalizedNewsong(),
        personalizedDjprogram(),
        programRecommend(),
        personalizedPrivatecontent(),
        toplist(),
      ])
        .then((res) => {
          console.log(res);
          this.banner = res[0].banners;
          this.tjPlay = res[1].result;
          this.newSong = res[3].result;
          this.programs = res[5].programs;
          this.onlyOne = res[6].result;
          res[7].list.splice(5);
          this.top = res[7].list;
        })
        .catch();
    },
    link(id, type, url) {
      console.log(id, type, url);
      if (type == 3000) {
        console.log(1);
        window.open(url);
      } else if (type == 10) {
        this.$router.push({ path: "/albumDetail", query: { id } });
      } else if (type == 1) {
        this.$router.push({ path: "/songDetail", query: { id } });
      }
    },
  },
  created() {
    this.requset();
  },
};
</script>

<style lang="less" scoped>
.home {
  .banner {
    padding: 0 10%;
    .el-carousel__item {
      border-radius: 10px;
      .home-banner {
        width: 100%;
        height: 100%;
        position: relative;
        .home-banner-title {
          position: absolute;
          bottom: 0;
          right: 0;
          border-radius: 10px 0 0 0;
          padding: 5px 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .tjPlay {
    padding: 0 10%;
    > div {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .newSong {
    padding: 0 10%;
    > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
  .programs {
    padding: 0 10%;
    > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      > div {
        margin-right: 20px;
      }
    }
  }
  .onlyOne {
    padding: 0 10%;
    > div {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .top {
    padding: 0 10%;
    > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}
h1 {
  margin-top: 20px;
  text-align: center;
}
</style>
