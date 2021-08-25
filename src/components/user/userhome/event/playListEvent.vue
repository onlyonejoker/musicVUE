<template>
  <div class="resourceInfo" v-if="json.playlist">
    <img
      :src="json.playlist.coverImgUrl"
      @click="linkPLay(json.playlist.userId)"
      alt="coverImgUrl"
    />
    <p>
      <span>
        <span>歌单</span>
        <span @click="linkPLay(json.playlist.id)">{{
          json.playlist.name
        }}</span>
      </span>
      <span @click="linkUser(json.playlist.userId)"
        >by{{ json.playlist.creator.nickname }}</span
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "playListEvent",
  props: { json: Object },
  methods: {
    //跳转相关
    linkPLay(id) {
      this.$router.push({ path: "/play", query: { id } });
    },
    linkUser(id) {
      this.$router.push({
        path: "/user/home",
        query: { id },
      });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.resourceInfo {
  margin: 5px 0 5px 56px;
  padding: 10px 10px;
  background-color: white;
  display: flex;
  img {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
  p {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    span {
      &:nth-child(1) {
        span {
          &:nth-child(1) {
            color: red;
            border: 1px solid red;
            font-size: 12px;
          }
          &:nth-child(1) {
            &:hover {
              color: red;
            }
          }
        }
      }
      &:nth-child(2) {
        font-size: 12px;
        color: grey;
        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>