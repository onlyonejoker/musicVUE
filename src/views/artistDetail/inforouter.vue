<template>
  <div class="info" v-if="info">
    <h4>{{ this.$route.query.name }}的介绍</h4>
    <p class="introduce">{{ info.briefDesc }}</p>
    <div
      class="introduction"
      v-for="(item, index) in info.introduction"
      :key="index"
    >
      <h4>{{ item.ti }}</h4>
      <p v-for="(item, index) in item.txt.split('\n')" :key="index">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script>
import { artistDesc } from "@/request/artist";
export default {
  name: "artistInfoRouter",
  data() {
    return {
      info: null,
    };
  },
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  methods: {
    infoFn() {
      artistDesc(this.uid)
        .then((res) => {
          this.info = res;
        })
        .catch();
    },
  },
  mounted() {
    this.infoFn();
  },
};
</script>

<style lang="less" scoped>
.info {
  .introduce {
    line-height: 30px;
    color: rgb(51, 51, 51);
    &::before {
      content: "";
      display: inline-block;
      width: 32px;
      height: 16px;
    }
  }
  .introduction {
    width: 100%;
    margin: 20px 0;
    p {
      line-height: 30px;
      color: rgb(51, 51, 51);
      &::before {
        content: "";
        display: inline-block;
        width: 32px;
        height: 16px;
      }
    }
  }
}
</style>