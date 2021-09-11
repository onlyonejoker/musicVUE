<template>
  <div class="djDetail">
    <topbar />
    <div class="djDetail-info" v-if="info">
      <div class="djDetail-info-img">
        <img v-lazy="info.picUrl" alt="picUrl" />
      </div>
      <div class="djDetail-info-info">
        <h2>{{ info.name }}</h2>
        <p>
          创建者：<span @click="linkUser(info.dj.userId)">
            {{ info.dj.nickname }}</span
          >
        </p>
        <p>创建时间：{{ this.$time(info.createTime) }}</p>
      </div>
    </div>
    <div class="djDetail-content" v-if="dj">
      <h2>节目{{ dj.count }}</h2>
      <div>
        <dj-list :dj="item" v-for="(item, index) in dj.programs" :key="index" />
        <page :more="more" @page="pageFn" />
      </div>
    </div>
  </div>
</template>

<script>
import topbar from "../../components/common/topbar.vue";
import { djDetail, djProgram } from "@/request/dj";
import DjList from "../../components/common/list/djList.vue";
import Page from "../../components/common/page/page.vue";
export default {
  components: { topbar, DjList, Page },
  name: "djDatail",
  computed: {
    uid() {
      return this.$route.query.id;
    },
  },
  data() {
    return {
      info: null,
      dj: null,
      page: 0,
      more: false,
    };
  },
  methods: {
    djDetail() {
      djDetail(this.uid)
        .then((res) => {
          console.log(res);
          this.info = res.data;
        })
        .catch();
    },
    djProgram() {
      djProgram(this.uid, 30, this.page * 30)
        .then((res) => {
          console.log(res);
          this.dj = res;
          this.more = res.more;
        })
        .catch();
    },
    linkUser(id) {
      this.$router.push({ path: "/user/home", query: { id } });
    },
    pageFn(page) {
      this.page = page;
      this.djProgram();
    },
  },
  mounted() {
    this.djDetail();
    this.djProgram();
  },
};
</script>

<style lang="less" scoped>
.djDetail {
  .djDetail-info {
    padding: 0 10%;
    display: flex;
    margin-top: 20px;
    .djDetail-info-img {
      margin-right: 20px;
      img {
        width: 188px;
        height: 188px;
        border-radius: 10px 10px;
      }
    }
    .djDetail-info-info {
      p {
        margin: 20px 0;
        span {
          &:hover {
            color: red;
          }
        }
      }
    }
  }
  .djDetail-content {
    padding: 0 10%;
    margin-top: 20px;
    position: relative;
    margin-bottom: 100px;
    > div {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>