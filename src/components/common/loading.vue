<template>
  <div class="loading" v-if="loading">
    <div>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "logoing",
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>

<style lang="less" scoped>
  @name: rotating;
  @keyframes @name {
    to {
      transform: rotate(1turn);
    }
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(2, 2, 2, 0.384);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    div {
      width: 30em;
      height: 30em;
      font-size: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        position: absolute;
        --n: 3;
        --span: calc(5em + (var(--n)-1) * 3em);
        width: var(--span);
        height: var(--span);
        border-style: solid;
        border-color: rgb(0, 255, 0) transparent;
        border-width: 1em 1em 0 0;
        border-radius: 50%;
        animation: @name linear infinite calc(5s / (9 - var(--n) + 1));
        &:nth-child(1) {
          --n: 1;
        }
        &:nth-child(2) {
          --n: 2;
        }
        &:nth-child(3) {
          --n: 3;
        }
        &:nth-child(4) {
          --n: 4;
        }
        &:nth-child(5) {
          --n: 5;
        }
        &:nth-child(6) {
          --n: 6;
        }
        &:nth-child(7) {
          --n: 7;
        }
        &:nth-child(8) {
          --n: 8;
        }
      }
    }
  }
</style>