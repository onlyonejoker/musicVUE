<template>
  <div class="set">
    <p>个人设置</p>
    <ul>
      <li :class="{active:isActive==1}" @click="cut(1)">
        <router-link to="/user/set/updata">基本设置</router-link>
      </li>
      <li :class="{active:isActive==2}" @click="cut(2)">
        <router-link to="/user/set/bind">绑定设置</router-link>
      </li>
      <li></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return { isActive: 1 };
  },
  methods: {
    cut(i) {
      this.isActive = i;
    },
  },
};
</script>

<style lang="less" scoped>
  .set {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    width: 70%;
    margin: 0 auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 0 20px;
    p {
      padding: 40px 0 10px;
      font-size: 26px;
    }
    ul {
      display: flex;
      align-items: center;
      li {
        width: 150px;
        line-height: 30px;
        background-color: #c4c4c4;
        border-top: 3px solid rgba(226, 226, 226);
        border-bottom: 1px solid rgba(226, 226, 226);
        &:nth-child(3) {
          box-sizing: content-box;
          width: 100%;
          height: 30px;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
          text-align: center;
        }
      }
    }
  }
  .active {
    border-top: rgba(255, 0, 0, 0.616) 3px solid !important;
    background-color: rgba(255, 255, 255, 0.76) !important;
    border-bottom: 0 !important;
    border-left: 1px solid rgba(0, 0, 0, 0.411);
    border-right: 1px solid rgba(0, 0, 0, 0.418);
  }
</style>