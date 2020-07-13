// 引入api文件夹（接口函数）
import { reqCategoryList } from "@/api";

const state = {
  categoryList: [],
};

const mutations = {
  // 直接修改数据
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },

  // RECEIVECATEGORYLIST(state, categoryList) {
  //
  //   state.categoryList = categoryList;
  // },
};

const actions = {
  // 此时需要发请求获取数据，则先在actions中发送异步请求
  // actions与用户对接的，当用户dispactch时调用此函数
  // getCategoryList({ commit }) {
  //   // 异步请求数据，可异步for if ......
  //   // reqCategoryList相当于axios，此对象.then和.catch获取成功或者失败的数据进行处理
  //   reqCategoryList().then((response) => {
  //     // 再通过mutations拿到成功后的数据(response.data)
  //     //  提交到mutations
  //     // 接收数据(data == state.categoryList),而接口中的数据也是data
  //     commit("RECEIVECATEGORYLIST", response.data);
  //   });
  //   // 由于ajax请求中，已经处理了失败的回调，所以此处可以不写catch方法
  // },
  // 当前需要此数据的组件为TypeNav，则当对应的组件中进行引入

  // 无论函数执行，都会成为一个promise对象
  async getCategoryList({ commit }) {
    // await等待成功或者失败结果，进行处理。
    const result = await reqCategoryList();
    if (result.code === 200) {
      // 提交到mutations 预备渲染
      // 此时第二个参数也可以使用response
      commit("RECEIVECATEGORYLIST",result.data);
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
