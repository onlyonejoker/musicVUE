<template>
  <div class="artist-item" v-if="artist">
    <div class="artist-item-content" @click="artistDetail(artist.id)">
      <img v-lazy="artist.img1v1Url" alt="img1v1Url" />
      <p>{{ artist.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "artistList",
  props: { artist: Object },
  methods: {
    artistDetail(id) {
      this.$router.push({ path: "/artistDetail", query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.artist-item {
  width: 168px;
  .artist-item-content {
    margin: 20px;
    img {
      width: 140px;
      height: 140px;
      border-radius: 100%;
    }
    p {
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>