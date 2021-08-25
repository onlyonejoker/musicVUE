<template>
  <div class="like">
    <div class="btn-list">
      <btn @click.native="allplay" icon="el-icon-caret-right" text="全部播放" />
      <btn
        icon="el-icon-circle-plus-outline"
        @click.native="addFn"
        text="添加到"
      />
      <btn icon="el-icon-caret-right" text="保留" />
      <add-play :isDispaly="isDisplay" :ids="ids" :index="99999" />
    </div>
    <songItem :uid="parseInt(uid)" @del="delList" :song="likelists" />
  </div>
</template>

<script>
import songItem from "common/song/songItem.vue";
import btn from "btn/btn.vue";
import addPlay from "common/add/addPlay.vue";

import { likelist, playlist, like } from "@/request/user";
import { songDetail } from "@/request/song";
import { playDetail } from "@/request/playList";
export default {
  name: "like",
  data() {
    return {
      likelists: [],
      isDisplay: 0,
      ids: null,
    };
  },
  components: {
    songItem,
    btn,
    addPlay,
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
    //添加到歌单
    addFn() {
      if (this.isDisplay == 99999) {
        this.isDisplay = 0;
      } else {
        this.isDisplay = 99999;
      }
    },
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
              if (res.privileges) {
                let id = [];
                if (res.privileges.length <= 1) {
                  id = res.privileges.id;
                } else {
                  res.privileges.forEach((e) => {
                    id.push(e.id);
                  });
                  id = id.join(",");
                }
                this.ids = id;
                //用得到的id获取歌单详情
                //渲染页面
                songDetail(id)
                  .then((res1) => {
                    this.likelists = res1.songs;
                  })
                  .catch();
              }
            });
          })
          .catch();
      } else {
        //个人非访客的喜欢歌单
        likelist(this.uid)
          .then((res) => {
            console.log(res);
            let id = null;
            res.length <= 1 ? (id = res.ids) : (id = [...res.ids].join(","));
            this.ids = id;
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
    //取消喜欢
    delList(id) {
      like(id, false)
        .then(() => {
          this.$router.go(0);
        })
        .catch();
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
    position: relative;
    .btn {
      margin-right: 50px;
      &:nth-child(1) {
        color: #fff;
        background-color: rgba(255, 0, 0, 0.623);
        &:hover {
          background-color: rgba(255, 0, 0);
        }
      }
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
    }
  }
  .display {
    display: flex !important;
    flex-flow: column;
    justify-content: space-between;
  }
}
</style>
