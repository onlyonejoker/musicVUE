<template>
  <div class="history">
    <p>
      <btn text="最近一周" @click.native="historyW" />
      <btn text="全部历史" @click.native="historyA" />
    </p>
    <songItem :song="historySong" />
  </div>
</template>

<script>
import { history } from "@/request/user";
import songItem from "@/components/common/song/songItem.vue";
import btn from "btn/btn.vue";
export default {
  name: "history",
  components: {
    btn,
    songItem,
  },
  computed: {
    //优先路由id，获取用户信息参数
    uid() {
      return (
        this.$store.state.others || this.$store.state.login.account.id || null
      );
    },
  },
  data() {
    return {
      historySong: [],
      type: 0,
    };
  },

  methods: {
    //请求相关
    history() {
      history(this.uid, this.type)
        .then((res) => {
          this.historySong = [];
          if (this.type == 0) {
            res.allData.forEach((e) => {
              this.historySong.push(e.song);
            });
          } else if (this.type == 1) {
            res.weekData.forEach((e) => {
              this.historySong.push(e.song);
            });
          }
          console.log(res);
        })
        .catch();
    },
    //事件相关
    historyW() {
      this.type = 1;
      this.history();
    },
    historyA() {
      this.type = 0;
      this.history();
    },
  },
  mounted() {
    this.history();
  },
};
</script>

<style lang="less" scoped>
.history {
  width: 80%;
  margin: 0 auto;
  p {
    margin: 10px 0;
    .btn {
      margin-left: 5px;
    }
  }
}
</style>