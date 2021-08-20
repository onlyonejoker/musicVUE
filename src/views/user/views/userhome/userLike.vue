<template>
  <div class="like">
    <p class="btn-list">
      <btn @click.native="allplay" icon="el-icon-caret-right" text="全部播放" />
      <btn icon="el-icon-circle-plus-outline" text="添加到" />
      <btn icon="el-icon-caret-right" text="保留" />
    </p>
    <songItem :song="likelists" />
  </div>
</template>

<script>
import songItem from "common/song/songItem.vue";
import btn from "btn/btn.vue";

import { likelist, playlist } from "@/request/user";
import { songDetail } from "@/request/song";
import { playDetail } from "@/request/playList";
export default {
  name: "like",
  data() {
    return {
      likelists: [],
    };
  },
  components: {
    songItem,
    btn,
  },
  computed: {
    //优先路由id，获取用户信息参数
    uid() {
      return (
        this.$store.state.others || this.$store.state.login.account.id || null
      );
    },
  },
  methods: {
    //传入用户id获取我喜欢并且获取歌曲详情
    //如果非本人的音乐，获取他人的喜欢的音乐
    getLikelist() {
      if (this.$store.state.others) {
        //获取第一个歌单，一般第一个歌单都是我喜欢的歌单
        playlist(this.uid, 1, 0)
          .then((res) => {
            //取出我喜欢的歌单id
            playDetail(res.playlist[0].id).then((res) => {
              //处理我喜欢的歌单的id
              //如果歌单小于一不用拼接字符串
              //如果歌单歌曲大于1，则需要拼接id
              let id = [];
              if (res.privileges.length <= 1) {
                id = res.privileges.id;
              } else {
                res.privileges.forEach((e) => {
                  id.push(e.id);
                });
                id = id.join(",");
              }
              //用得到的id获取歌单详情
              //渲染页面
              songDetail(id)
                .then((res1) => {
                  this.likelists = res1.songs;
                })
                .catch();
            });
          })
          .catch();
      } else {
        //个人非访客的喜欢歌单
        likelist(this.uid)
          .then((res) => {
            let id = null;
            res.length <= 1 ? (id = res.ids) : (id = [...res.ids].join(","));
            songDetail(id)
              .then((res1) => {
                this.likelists = res1.songs;
              })
              .catch();
          })
          .catch();
      }
    },
    //获取歌单全部音乐的id发送到播放页面
    allplay() {
      if (this.likelists !== null) {
        this.$store.commit("musicInfo", this.likelists);
      } else {
        alert("加载中");
      }
    },
  },
  created() {
    this.getLikelist();
  },
};
</script>

<style lang="less" scoped>
.like {
  padding: 0 15%;
  width: 100%;
  min-height: 50vh;
  .btn-list {
    margin-top: 50px;
    .btn {
      margin-right: 50px;
      &:nth-child(1) {
        color: #fff;
        background-color: rgba(255, 0, 0, 0.623);
        &:hover {
          background-color: rgba(255, 0, 0);
        }
      }
    }
  }
}
</style>
