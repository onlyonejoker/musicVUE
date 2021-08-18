import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    token: null,
    login: null
  },
  mutations: {
    loading(state) {
      state.loading = !state.loading
    },
    token(state, data) {
      state.token = data
    },
    login(state, data) {
      state.login = data
    }
  },
  actions: {},
  modules: {}
})