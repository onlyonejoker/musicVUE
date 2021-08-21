import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    token: null,
    login: null,
    play: null,
    musicInfo: null,
    others: null,
    myCreatPlay: null,
  },
  mutations: {
    loading(state) {
      state.loading = !state.loading;
    },
    token(state, data) {
      state.token = data;
    },
    login(state, data) {
      state.login = data;
    },
    play(state, data) {
      state.play = data;
    },
    musicInfo(state, data) {
      state.musicInfo = data;
    },
    others(state, data) {
      state.others = data;
    },
    myCreatPlay(state, data) {
      state.myCreatPlay = data;
    },
  },
  actions: {},
  modules: {},
});
