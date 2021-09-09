<template>
  <div class="playItemAll" v-if="topPlaylistHighqua">
    <div class="content">
      <div class="boutique" @click="linkHighqua">
        <div>
          <img v-lazy="topPlaylistHighqua.playlists[0].coverImgUrl" alt="" />
        </div>
        <div>
          <p>精品歌单</p>
          <p>{{ topPlaylistHighqua.playlists[0].name }}</p>
          <p>{{ topPlaylistHighqua.playlists[0].copywriter }}</p>
        </div>
      </div>
    </div>
    <div class="btnItem">
      <btn text="全部歌单" @click.native="allClickFn" />
      <p>
        <span
          :class="{ active: order == 'hot' }"
          class="order"
          @click="orderFn('hot')"
          >热门</span
        >
        <span
          :class="{ active: order == 'new' }"
          class="order"
          @click="orderFn('new')"
          >最新</span
        >
        <span
          :class="{ active: isActive == item.name }"
          v-for="(item, index) in playlistHot.tags"
          :key="index"
          @click="active(item.name)"
        >
          {{ item.name }}
        </span>
      </p>
    </div>
    <div
      class="tagList"
      :style="{ height: tagListHeight + 'px' }"
      ref="tagList"
      @transitionend="transitionend"
    >
      <div class="categories">
        <div v-for="(Item, index) in tag" :key="index" class="tag">
          <div class="title">{{ Item[0].name }}</div>
          <div class="tag-content">
            <div
              class="tag-item"
              v-for="(item, index) in Item"
              :key="index"
              @click="tagItem(item.name)"
              :class="{ active: isTag == item.name }"
            >
              {{ item.name }}
              <i v-if="item.hot"></i>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    <div class="playList">
      <playItem
        :play="item"
        v-for="(item, index) in topPlaylist.playlists"
        :key="index"
      />
      <page :more="more" @page="page" />
    </div>
  </div>
</template>

<script>
import {
  playlistCatlist,
  playlistHot,
  topPlaylist,
  highquality,
} from "@/request/playList";

import btn from "btn/btn.vue";
import playItem from "@/components/common/play/playItem.vue";
import page from "page/page.vue";
export default {
  name: "playItemAll",
  data() {
    return {
      playlistCat: null,
      playlistHot: null,
      topPlaylist: null,
      topPlaylistHighqua: null,
      isActive: null,
      tagListHeight: 0,
      tag: [],
      order: "hot",
      cat: "全部",
      offset: 0,
      isTag: null,
      more: false,
    };
  },
  components: {
    btn,
    page,
    playItem,
  },
  methods: {
    //初始化请求
    playlistCatlistReq() {
      Promise.all([
        playlistCatlist(),
        playlistHot(),
        topPlaylist(),
        highquality("全部", 10, -1),
      ])
        .then((res) => {
          console.log(res);
          this.playlistCat = res[0];
          this.playlistHot = res[1];
          this.topPlaylist = res[2];
          this.topPlaylistHighqua = res[3];
          this.more = res[2].more;
          for (const key in res[0].categories) {
            this.tag.push([{ type: key, name: res[0].categories[key] }]);
          }
          res[0].sub.forEach((e) => {
            switch (e.category) {
              case 0:
                this.tag[0].push(e);
                break;
              case 1:
                this.tag[1].push(e);
                break;
              case 2:
                this.tag[2].push(e);
                break;
              case 3:
                this.tag[3].push(e);
                break;
              case 4:
                this.tag[4].push(e);
                break;
            }
          });
        })
        .catch();
    },
    updata() {
      topPlaylist(this.order, this.cat, 50, this.offset * 50)
        .then((res) => {
          console.log(res);
          this.topPlaylist = res;
        })
        .catch();
    },
    tagItem(name) {
      this.isTag = name;
      this.cat = name;
      this.updata();
    },
    active(i) {
      this.isActive = i;
      this.cat = i;
      this.updata();
    },
    orderFn(order) {
      this.order = order;
      this.updata();
    },
    //事件相关
    linkHighqua() {
      this.$router.push({ path: "/playItem/highquality" });
    },
    allClickFn() {
      this.$refs.tagList.style.display = "block";
      this.tagListHeight == 0
        ? (this.tagListHeight = 500)
        : (this.tagListHeight = 0);
    },
    transitionend() {
      this.tagListHeight == 0
        ? (this.$refs.tagList.style.display = "none")
        : null;
    },
    //分页器
    page(page) {
      this.offset = page;
      this.updata();
    },
  },
  mounted() {
    this.playlistCatlistReq();
  },
};
</script>

<style lang="less" scoped>
.playItemAll {
  padding: 0 5%;
  .content {
    margin: 20px 0;
    .boutique {
      width: 100%;
      height: 250px;
      background: -webkit-linear-gradient(
        left,
        #e0bcbc,
        #c78484 10%,
        #d49c9c 30%,
        #cc8e8e 50%,
        #eb9191 60%,
        #dd9292 90%,
        #eec6c6
      );
      border-radius: 20px;
      display: flex;
      align-items: center;
      div {
        &:nth-child(1) {
          margin: 0 20px;
          img {
            width: 188px;
            height: 188px;
            border-radius: 10px;
          }
        }
        &:nth-child(2) {
          p {
            line-height: 30px;
            &:nth-child(1) {
              color: rgb(255, 251, 0);
              border: 1px solid rgb(255, 251, 0);
              border-radius: 30px;
              text-align: center;
              width: 100px;
            }
            &:nth-child(2) {
              color: white;
            }
            &:nth-child(3) {
              color: grey;
            }
          }
        }
      }
    }
  }
  .btnItem {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 20px;
    .btn {
      border-radius: 38px;
    }
    > p {
      display: flex;
      align-items: center;
      .order {
        font-size: 16px;
        color: black;
      }
      span {
        margin-right: 10px;
        font-size: 14px;
        color: rgb(80, 80, 80);
      }
    }
  }
  .tagList {
    width: 100%;
    transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
    height: 100%;
    display: none;
    .categories {
      height: 100%;
      .tag {
        display: flex;
        margin-bottom: 20px;
        height: 15%;
        .title {
          width: 13%;
          height: 75px;
          display: flex;

          justify-content: center;
          align-items: center;
        }
        .tag-content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          width: 80%;
          .tag-item {
            margin: 5px 20px 5px 0;
            display: flex;
            align-items: center;
            &:nth-child(1) {
              display: none;
            }
            i {
              display: inline-block;
              margin-left: 5px;
              width: 20px;
              height: 10px;
              background-image: url("../../assets/img/topbar.png");
              background-position: -195px -1px;
            }
          }
        }
      }
    }
  }
  .playList {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    justify-content: center;
  }
}
.active {
  color: red !important;
}
</style>