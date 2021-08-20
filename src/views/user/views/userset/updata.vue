<template>
  <div class="updata">
    <section>
      <div class="row">
        <label for="nike">昵称</label>
        <el-input v-model="nickname"></el-input>
      </div>
      <div class="row">
        <label for="introduce">简介</label>
        <el-input type="textarea" resize="none" rows="5" maxlength="100" v-model="textarea">
        </el-input>
        <i class="textarea">{{100 - textarea.length}}</i>
      </div>
      <div class="row">
        <label for="sex">性别:</label>
        <div class="sex">
          <p :class="{active:sex==1}" @click="active(1)">
            <span><i></i></span>
            <span>男</span>
          </p>
          <p :class="{active:sex==2}" @click="active(2)">
            <span><i></i></span>
            <span>女</span>
          </p>
          <p :class="{active:sex==0}" @click="active(0)">
            <span><i></i></span>
            <span>保密</span>
          </p>
        </div>
      </div>
      <div class="row">
        <label for="birthday">生日</label>
        <el-input v-model="birthday"></el-input>
      </div>
      <div class="row">
        <label for="city">城市</label>
        <el-input v-model="city"></el-input>
      </div>
      <div class="row">
        <button @mousedown="mousedown" @click="userUpdate" @mouseup="mouseup" :class="{click:click}">保存</button>
      </div>
    </section>
    <section>
      <div>
        <img :src="userimg" alt="">

        <div class="imgFileBox">
          <div class="imgFile">
            <input type="file" name="imgFile" @change="upimg">
            <p>更换图像</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { update, upload } from "@/request/user.js";

export default {
  name: "updata",
  data() {
    return {
      nickname: this.$store.state.login.profile.nickname,
      sex: this.$store.state.login.profile.gender,
      textarea: this.$store.state.login.profile.signature,
      birthday: null,
      city: null,
      click: false,
      imgFile: null,
    };
  },
  computed: {
    userimg() {
      if (this.$store.state.login !== null) {
        return this.$store.state.login.profile.avatarUrl;
      } else {
        return null;
      }
    },
  },
  methods: {
    active(i) {
      this.sex = i;
    },
    mousedown() {
      this.click = true;
    },
    mouseup() {
      this.click = false;
    },
    userUpdate() {
      let time = new Date(this.birthday).getTime();
      update(this.nickname, this.textarea, this.sex, time)
        .then(() => {
          alert("保存成功");
        })
        .catch(() => {});
    },
    upimg(e) {
      let formData = new FormData();
      formData.append("imgFile", e.target.files[0]);
      upload(formData)
        .then((res) => {
          console.log(res);
        })
        .catch();
    },
  },
};
</script>

<style lang="less" scoped>
  .updata {
    padding: 20px 0 0;
    display: flex;
    section {
      width: 50%;
      .row {
        display: flex;
        align-items: center;
        padding: 10px 0;
        position: relative;
        label {
          width: 20%;
        }
        .textarea {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 12px;
          color: grey;
        }
        .sex {
          display: flex;
          p {
            display: flex;
            align-items: center;
            margin-right: 20px;
            span {
              margin-right: 5px;
              &:nth-child(1) {
                display: block;
                width: 14px;
                height: 14px;
                border: 1px solid black;
                border-radius: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                i {
                  width: 4px;
                  height: 4px;
                  background-color: black;
                  border-radius: 100%;
                }
              }
            }
          }
        }
        &:last-child {
          height: 50px;
        }
        button {
          position: absolute;
          width: 100px;
          height: 30px;
          outline: none;
          border: none;
          background-color: rgba(226, 226, 226);
          border-radius: 30px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      &:nth-child(2) {
        div {
          width: 200px;
          height: 200px;
          position: relative;
          margin: 0 auto;
          padding: 12px;
          img {
            width: 188px;
            height: 188px;
          }
          .imgFileBox {
            width: 188px;
            height: 20px;
            background-color: rgba(0, 0, 0, 0.418);
            margin: 0;
            padding: 0;
            position: absolute;
            bottom: 0;
            left: 12px;
            color: white;
            text-align: center;
            .imgFile {
              position: relative;
              width: 100%;
              height: 100%;
              padding: 0;
              margin: 0;
              display: flex;
              input {
                position: absolute;
                width: 100%;
                height: 20px;
                opacity: 0;
              }
              p {
                width: 100%;
                height: 20px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
  .active {
    span {
      &:nth-child(1) {
        background-color: red !important;
        border: none !important;
        i {
          background-color: white !important;
        }
      }
      &:nth-child(2) {
        color: red !important;
      }
    }
  }
  .click {
    background-color: rgb(255, 255, 255) !important;
  }
</style>