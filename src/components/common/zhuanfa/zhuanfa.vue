<template>
  <div class="zhuanfa" :class="{ display: isDisplay }">
    <p>转发动态</p>
    <div>
      <el-input
        type="textarea"
        :rows="7"
        placeholder="说点什么"
        v-model="textarea"
        resize="none"
      ></el-input>
      <section>
        <btn @click.native="userEventForwards" text="转发" />
        <btn @click.native="cancel" text="取消" />
      </section>
    </div>
  </div>
</template>

<script>
import { userEventForwards } from "@/request/user";
import btn from "../button/btn.vue";
export default {
  name: "zhuanfa",
  data() {
    return {
      textarea: "",
      isDisplay: false,
      eid: null,
      uid: null,
    };
  },
  components: {
    btn,
  },
  methods: {
    cancel() {
      this.isDisplay = false;
    },
    userEventForwards() {
      userEventForwards(this.uid, this.eid, this.textarea)
        .then(() => {
          this.isDisplay = false;
        })
        .catch();
    },
  },
  mounted() {
    this.$bus.$on("zhuanfa", (eid, uid) => {
      this.isDisplay = true;
      this.eid = eid;
      this.uid = uid;
      console.log(eid, uid);
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