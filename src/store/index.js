import Vue from "vue";
import Vuex from "vuex";

// 分支（模块引入）
import home from "./home";

Vue.use(Vuex);

// 存放数据
const state = {};
// 修改数据
const mutations = {};
// 处理数据
const actions = {};
// 获取数据
const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  // 注册模块
  modules: {
    home,
  },
});
