"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    loading: false,
    token: null,
    login: null,
    play: null,
    musicInfo: null,
    others: null,
    myCreatPlay: null,
    artistUid: null
  },
  mutations: {
    loading: function loading(state) {
      state.loading = !state.loading;
    },
    token: function token(state, data) {
      state.token = data;
    },
    login: function login(state, data) {
      state.login = data;
    },
    play: function play(state, data) {
      state.play = data;
    },
    musicInfo: function musicInfo(state, data) {
      state.musicInfo = data;
    },
    others: function others(state, data) {
      state.others = data;
    },
    myCreatPlay: function myCreatPlay(state, data) {
      state.myCreatPlay = data;
    },
    artistUid: function artistUid(state, data) {
      state.artistUid = data;
    }
  },
  actions: {},
  modules: {}
});

exports["default"] = _default;