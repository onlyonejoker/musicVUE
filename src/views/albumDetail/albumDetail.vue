<template>
  <div class="albumDetail">
    <topbar />
    <albumInfo
      :info="info"
      :scroll="[this.$refs.albumComment]"
      :dynamic="dynamic"
      :songs="songs"
    />
    <div class="album-content" v-if="songs && info">
      <div class="song">
        <h2>歌曲</h2>
        <songItem :song="songs" />
      </div>
      <div class="description">
        <div>
          <h2>简介</h2>
          <p v-for="(item, index) in info.description.split('\n')" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
    <div class="albumComment" ref="albumComment">
      <zycomment
        :resourceId="uid"
        :type="3"
        :comments="comment"
        :hotComments="hotComments"
      />
      <page @page="page" :more="more" />
    </div>
  </div>
</template>

<script>
import topbar from "@/components/common/topbar.vue";
import albumInfo from "@/components/content/album/albumInfo.vue";
import songItem from "@/components/common/song/songItem.vue";
import { album, albumDynamic, commentAlbum } from "@/request/album";
import page from "page/page.vue";
import Zycomment from "@/components/common/comment/zycomment.vue";
export default {
  name: "albumDetail",
  components: {
    topbar,
    albumInfo,
    songItem,
    page,
    Zycomment,
  },
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  data() {
    return {
      info: null,
      dynamic: null,
      songs: null,
      comment: null,
      hotComments: null,
      offset: 0,
      more: false,
    };
  },
  methods: {
    //请求相关
    album() {
      Promise.all([
        album(this.uid),
        albumDynamic(this.uid),
        commentAlbum(this.uid, 20, this.offset * 20),
      ])
        .then((res) => {
          console.log(res);
          this.info = res[0].album;
          this.songs = res[0].songs;
          this.dynamic = res[1];
          this.comment = res[2].comments;
          this.hotComments = res[2].hotComments;
          this.more = res[2].more;
        })
        .catch();
    },
    //分页器
    page(page) {
      this.offset = page;
      commentAlbum(this.uid, 20, this.offset * 20)
        .then((res) => {
          console.log(res);
          this.comment = res.comments;
          this.more = res.more;
        })
        .catch();
    },
  },
  mounted() {
    this.album();
  },
};
</script>

<style lang="less" scoped>
.albumDetail {
  .album-content {
    display: flex;
    padding: 20px 10% 0;
    margin-top: 20px;
    border-top: 1px solid white;
    .song {
      width: 80%;
    }
    .description {
      width: 20%;
      h2 {
        margin-bottom: 20px;
      }
      p {
        text-indent: 2em;
        font-size: 14px;
      }
    }
  }
  .albumComment {
    padding: 0 5%;
    position: relative;
    > div {
      h2 {
        margin: 20px 0;
        background-color: gray;
        padding: 10px 0 10px;
      }
    }
  }
}
</style>