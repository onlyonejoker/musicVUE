<template>
  <div class="playCreate" :class="{ display: isDisplay }">
    <div class="play-create-content">
      <p>创建歌单</p>
      <div class="text">
        <label for="create">歌单名</label>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="button">
        <btn @click.native="cancel" text="取消" />
        <btn @click.native="create" class="confirm" text="确定" />
      </div>
    </div>
  </div>
</template>

<script>
import btn from "btn/btn.vue";
import { playCreate } from "@/request/playList";
export default {
  name: "playCreate",
  data() {
    return {
      input: "",
      isDisplay: false,
    };
  },
  components: {
    btn,
  },
  methods: {
    cancel() {
      console.log(1);
      this.isDisplay = false;
    },
    create() {
      playCreate(this.input)
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
  },
  mounted() {
    this.$bus.$on("create", () => {
      this.isDisplay = true;
      console.log(1);
    });
  },
};
</script>

<style lang="less" scoped>
.playCreate {
  width: 100vw;
  height: 100vh;
  z-index: 1001;
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.315);
  .play-create-content {
    width: 520px;
    height: 243px;
    background-color: #c4c4c4;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: 10px 30px 30px 20px;
    p {
      text-align: center;
      height: 26px;
      line-height: 26px;
    }
    .text {
      display: flex;
      label {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .button {
      display: flex;
      flex-flow: row-reverse;
      .confirm {
        background-color: rgba(255, 0, 0, 0.774);
        color: #fff;
        order: -1;
        margin-left: 10px;
        &:hover {
          background-color: red;
        }
      }
    }
  }
}

.display {
  display: flex !important;
}
</style>