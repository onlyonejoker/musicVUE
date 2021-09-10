<template>
  <div class="zhuanfa" :class="{ display: isDisplay }">
    <p>分享{{ typeText() }}</p>
    <div>
      <el-input
        type="textarea"
        :rows="7"
        placeholder="说点什么"
        v-model="textarea"
        resize="none"
      ></el-input>
      <section>
        <btn @click.native="share" text="分享" />
        <btn @click.native="cancel" text="取消" />
      </section>
    </div>
  </div>
</template>

<script>
import { resource } from "@/request/user";
import btn from "../button/btn.vue";
export default {
  name: "zhuanfa",
  data() {
    return {
      textarea: "",
      isDisplay: false,
      id: null,
      type: null,
    };
  },
  components: {
    btn,
  },
  methods: {
    cancel() {
      this.isDisplay = false;
    },
    //数据处理
    typeText() {
      if (this.type == "song") {
        return "歌单";
      } else if (this.type == "Single") {
        return "专辑";
      } else if (this.type == "video") {
        return "视频";
      } else if (this.type == "mv") {
        return "mv";
      }
    },
    //分享歌单
    share() {
      console.log(this.id, this.type, this.textarea);
      resource(parseInt(this.id), this.type, this.textarea)
        .then(() => {})
        .catch();
    },
  },
  mounted() {
    this.$bus.$on("fenxiang", (id, type) => {
      this.isDisplay = true;
      this.id = id;
      this.type = type;
    });
  },
};
</script>

<style lang="less" scoped>
.zhuanfa {
  display: none;
  width: 530px;
  height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #c4c4c4;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.479), 0 0 6px rgba(0, 0, 0, 0.397);
  z-index: 1000000;
  p {
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    padding: 10px 0;
    background-color: red;
    color: white;
  }
  > div {
    padding: 20px 20px 0 20px;
    section {
      margin-top: 20px;
      .btn {
        margin-right: 10px;
        &:nth-child(1) {
          background-color: rgba(255, 0, 0, 0.644);
          color: white;
          &:hover {
            background-color: red;
          }
        }
      }
    }
  }
}
.display {
  display: block;
}
</style>