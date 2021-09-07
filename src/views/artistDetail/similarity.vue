<template>
  <div class="similarity">
    <artistList :artist="item" v-for="(item, index) in simi" :key="index" />
  </div>
</template>

<script>
import artistList from "@/components/common/list/artistList.vue";
import { simiArtist } from "@/request/artist";
export default {
  name: "similarityRouter",
  components: {
    artistList,
  },
  data() {
    return {
      simi: null,
    };
  },
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  methods: {
    simiArtist() {
      simiArtist(this.uid)
        .then((res) => {
          this.simi = res.artists;
        })
        .catch();
    },
  },
  mounted() {
    this.simiArtist();
  },
};
</script>

<style lang="less" scoped>
.similarity {
  display: flex;
  flex-wrap: wrap;
}
</style>