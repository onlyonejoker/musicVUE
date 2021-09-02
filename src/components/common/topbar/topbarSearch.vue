<template>
  <div class="search">
    <el-input
      :placeholder="showKeyword"
      prefix-icon="el-icon-search"
      v-model="input2"
      size="mini"
      type="search"
      @focus="focus"
      @blur="blur"
      @input="inputFn"
    >
    </el-input>
    <el-button size="small" type="primary" icon="el-icon-search" @click="search"
      >搜索</el-button
    >
    <div class="hot-search" ref="hotSearch">
      <div v-if="!input2">
        <div
          class="hotItem"
          v-for="(item, index) in searchHots"
          :key="index"
          @click="linkSearch(index)"
        >
          <div :class="{ Hot: index < 3 }">{{ index + 1 }}</div>
          <div>
            <h5>
              {{ item.searchWord }}
              <img v-lazy="item.iconUrl" alt="" v-if="item.iconUrl" />
              <span>{{ item.score }}</span>
            </h5>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
      <div v-else-if="searchSuggest" class="searchSuggest">
        <p>{{ input2 }}相关的结果</p>
        <div v-if="searchSuggest.songs">
          <h5>单曲</h5>
          <p
            v-for="(Item, index) in searchSuggest.songs"
            :key="index"
            @click="linkSong(Item.id)"
          >
            {{ Item.name }}-
            <span v-for="(item, index) in Item.artists" :key="index">
              {{ item.name }}
            </span>
          </p>
        </div>
        <div v-if="searchSuggest.artists">
          <h5>歌手</h5>
          <p
            v-for="(item, index) in searchSuggest.artists"
            :key="index"
            @click="linkartists(item.id)"
          >
            {{ item.name }}
          </p>
        </div>
        <div v-if="searchSuggest.playlists">
          <h5>歌单</h5>
          <p
            v-for="(item, index) in searchSuggest.playlists"
            :key="index"
            @click="linkPlay(item.id)"
          >
            {{ item.name }}
          </p>
        </div>
        <div v-if="searchSuggest.albums">
          <h5>专辑</h5>
          <p
            v-for="(item, index) in searchSuggest.albums"
            :key="index"
            @click="linkalbums(item.id)"
          >
            {{ item.name }}
          </p>
        </div>
        <div v-if="searchSuggest.mv">
          <h5>MV</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchDefault, searchHot, searchSuggest } from "@/request/search.js";
export default {
  name: "search",
  data() {
    return {
      input2: "",
      showKeyword: null,
      searchHots: null,
      times: null,
      searchSuggest: null,
    };
  },
  methods: {
    //请求相关
    search() {
      this.input2 ? null : (this.input2 = this.showKeyword);
      this.$router.push({
        path: "/search",
        query: { keywords: this.input2 },
      });
    },
    searchDefault() {
      searchDefault()
        .then((res) => {
          this.showKeyword = res.data.showKeyword;
        })
        .catch();
    },
    //事件相关
    focus() {
      this.$refs.hotSearch.style.display = "block";
      searchHot()
        .then((res) => {
          this.searchHots = res.data;
        })
        .catch();
    },
    blur() {
      setTimeout(() => {
        this.$refs.hotSearch.style.display = "none";
      }, 500);
    },
    linkSearch(data) {
      this.$router.push({
        path: "/search",
        query: { keywords: data.searchWord },
      });
    },
    linkSong(id) {
      this.$router.push({
        path: "/song",
        query: { id },
      });
      this.$router.go(0);
    },
    linkPlay(id) {
      this.$router.push({
        path: "/play",
        query: { id },
      });
      this.$router.go(0);
    },
    linkartists(id) {
      this.$router.push({
        path: "/artistDetail",
        query: { id },
      });
      this.$router.go(0);
    },
    linkalbums(id) {
      this.$router.push({
        path: "/albumDetail",
        query: { id },
      });
      this.$router.go(0);
    },

    inputFn() {
      this.times ? clearTimeout(this.times) : null;
      this.times = setTimeout(() => {
        searchSuggest(this.input2)
          .then((res) => {
            console.log(res);
            this.searchSuggest = res.result;
          })
          .catch();
      }, 500);
    },
  },
  mounted() {
    this.searchDefault();
  },
};
</script>

<style lang="less" scoped>
.search {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  .el-button {
    color: black;
    padding: 0;
    line-height: 26px;
    margin-left: 10px;
    input {
      &::-webkit-search-results-button {
        display: none;
      }
    }
  }
  .hot-search {
    display: none;
    position: absolute;
    top: 38px;
    width: 300px;
    height: 400px;
    z-index: 100;
    overflow: scroll;
    background-color: #c4c4c4;
    border: 1px solid white;
    &::-webkit-scrollbar {
      width: 6px;
      height: 0px;
      background-color: #f0f0f0;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #ff0000;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #ffffff;
    }
    .hotItem {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      margin: 10px 0;
      padding: 0 20px;
      &:hover {
        background-color: white;
        cursor: pointer;
      }
      div {
        &:nth-child(1) {
          width: 10%;
          color: grey;
        }
        &:nth-child(2) {
          width: 90%;
          margin: 10px 0;
          h5 {
            img {
              height: 15px;
              margin: 0 10px;
              vertical-align: middle;
            }
            span {
              font-size: 14px;
              font-weight: 400;
              color: grey;
              margin: 0 10px;
            }
          }
          p {
            font-size: 14px;
            color: grey;
          }
        }
      }
    }
    .searchSuggest {
      div {
        h5 {
          padding: 0 20px;
          background-color: white;
        }
        p {
          padding: 0 20px;
          font-size: 14px;
          line-height: 30px;
          &:hover {
            background-color: rgba(255, 255, 255, 0.541);
          }
        }
      }
    }
  }
}
.Hot {
  color: red !important;
  flex-wrap: 700 !important;
}
</style>