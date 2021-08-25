<template>
  <div class="playlistUpdate">
    <p>编辑歌单</p>
    <div class="updataBody">
      <div>
        <label for="playName">歌单名称<span class="must">*</span></label
        ><input name="playName" type="text" v-model="playName" />
      </div>
      <div>
        <label for="playDesc">歌单简介</label>
        <textarea name="playDesc" v-model="playDesc" />
      </div>
      <div>
        <label for="img">歌单封面</label>
        <input name="img" type="file" @change="playlistUpdateImg" />
      </div>
      <div class="tag">
        <p>歌单标签</p>
        <div>
          <span
            @click="delTag(item)"
            v-for="(item, index) in tag"
            :key="index"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
    <div class="tags">
      <ul v-for="(item, index) in tags" :key="index">
        <li
          @click="selectTag(item.name)"
          v-for="(item, index) in item"
          :key="index"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <btn icon="el-icon-check" @click.native="playUpdate" text="提交" />
  </div>
</template>

<script>
import { playlistUpdate, playlistUpdateImg } from "@/request/user";
import { playTags } from "@/request/playList";
import { Notification } from "element-ui";
import btn from "btn/btn.vue";
export default {
  name: "playlistUpdate",
  data() {
    return {
      tags: [
        [{ name: "语种" }],
        [{ name: "流派" }],
        [{ name: "场景" }],
        [{ name: "心情" }],
        [{ name: "主题" }],
      ],
      tag: [],
      playName: "",
      playDesc: "",
      files: null,
    };
  },
  methods: {
    //更新
    playUpdate() {
      playlistUpdate(
        this.$route.query.play,
        this.playName,
        this.playDesc,
        this.tag.join(";")
      )
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
    playlistUpdateImg(e) {
      let file = new FormData();
      file.append("imgFile", e.target.files[0]);
      playlistUpdateImg(file, this.$route.query.play)
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
    //事件相关
    playTags() {
      playTags()
        .then((res) => {
          console.log(res);
          res.tags.forEach((e) => {
            switch (e.category) {
              case 0:
                this.tags[0].push(e);
                break;
              case 1:
                this.tags[1].push(e);
                break;
              case 2:
                this.tags[2].push(e);
                break;
              case 3:
                this.tags[3].push(e);
                break;
              case 4:
                this.tags[4].push(e);
                break;
              default:
                break;
            }
          });
          console.log(this.tags);
        })
        .catch();
    },
    selectTag(name) {
      this.tag.length >= 3
        ? Notification.success({ type: "info", message: "最多三个标签" })
        : this.tag.push(name);
    },
    delTag(item) {
      this.tag.splice(this.tag.indexOf(item), 1);
    },
  },
  components: {
    btn,
  },
  mounted() {
    this.playTags();
  },
};
</script>

<style lang="less" scoped>
.playlistUpdate {
  padding: 20px 15% 0;
  > p {
    font-size: 22px;
    line-height: 50px;
  }

  .btn {
    margin: 20px 475px 0;
    background-color: rgba(255, 8, 0, 0.74);
    &:hover {
      background-color: red;
    }
  }
  .updataBody {
    display: flex;
    flex-flow: column;
    > div {
      width: 100%;
      display: flex;
      margin: 10px 0;
      label {
        width: 15%;
        display: flex;
        align-items: center;
      }
      input {
        height: 38px;
        outline: none;
        line-height: 38px;
        border: 1px solid white;
        width: 500px;
      }
      textarea {
        height: 100px;
        outline: none;
        border: 1px solid white;
        resize: none;
        font-size: 16px;
        line-height: 20px;
        width: 500px;
        font-family: "宋体";
        &::-webkit-scrollbar {
          width: 6px;
          height: 0px;
          background-color: rgba(240, 240, 240, 1);
        }
        /*定义滚动条轨道 内阴影+圆角*/
        &::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #ffffff;
        }
        /*定义滑块 内阴影+圆角*/
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: rgb(255, 0, 0);
        }
      }
    }
    .tag {
      height: 24px;
      font-size: 14px;
      display: flex;
      align-items: center;
      p {
        width: 15%;
      }
      div {
        width: 500px;
        height: 24px;
        background-color: white;
        border: 1px solid white;
        span {
          margin: 0 5px;
          background-color: #c4c4c4;
        }
      }
    }
  }
  .tags {
    display: flex;
    width: 500px;
    height: 280px;
    flex-flow: column;
    overflow: scroll;
    padding: 20px;
    border: 1px solid white;
    margin-left: 15%;
    &::-webkit-scrollbar {
      width: 6px;
      height: 0px;
      background-color: rgba(240, 240, 240, 1);
    }
    /*定义滚动条轨道 内阴影+圆角*/
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #ffffff;
    }
    /*定义滑块 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgb(255, 0, 0);
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 10px;
      li {
        width: 95px;
        height: 30px;
        line-height: 30px;
        &:hover {
          color: red;
          text-decoration: underline;
        }
        &:first-child {
          width: 100%;
          font-size: 14px;
          color: grey;
          text-decoration: none;
          pointer-events: none;
        }
      }
    }
  }
}
.must {
  color: rgb(254, 133, 125);
}
</style>