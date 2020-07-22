import {
  reqAddOrUpdateShopCart,
  reqShopCartList,
  reqUpdateIsChecked,
  reqDeleteCart,
} from "@/api";

const state = {
  shopCartList: [],
};
const mutations = {
  RECEIVESHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};

const actions = {
  //异步请求数据
  //async 和 await的用法
  async addorUpdateShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code === 200) {
      return "添加购物车成功";
    } else {
      // return "添加购物车失败";
      // 由于promise的特性，当返回值为一个正常数据，则返回的一定是成功的promise
      return Promise.reject(new Error("添加购物车失败"));
    }
  },
  // 请求购物车列表数据
  async getShopCartList({ commit }) {
    // 等待返回对象
    const result = await reqShopCartList();
    if (result.code === 200) {
      // 提交到mutations
      commit("RECEIVESHOPCARTLIST", result.data);
    }
  },
  // 单个修改成功或者失败异步代码处理。
  // 请求读写商品列表数据的接口,第二个参数仅能传一个数据，所以使用对象解构
  async updateIsChecked({ commit }, { skuId, isChecked }) {
    // 等待请求成功或者失败后执行后面的代码
    const result = await reqUpdateIsChecked(skuId, isChecked);
    // 如果成功
    if (result.code === 200) {
      // 返回一个成功的promise对象，数据为以下字符串
      return "修改选中状态成功";
    } else {
      // 反之，返回一个失败的promise对象，并抛出错误，信息为一个字符串
      return Promise.reject(new Error("修改选中状态失败"));
    }
  },
  // 更新全选全不选成功或者失败的异步代码处理
  updateAllIsChecked({ commit, state, dispatch }, isChecked) {
    // 创建一个容器，接收所有的成功或者失败的promise对象
    let promises = [];
    //遍历vuex内shopCartList商品列表信息数据，每一个商品，其中每一个商品都自带id以及skunum...
    state.shopCartList.forEach((item) => {
      // 如果当前那一个组商品被选中，则直接退出
      if (item.isChecked === isChecked) return;
      // 若遍历到isChecked为false的那一组商品时
      // 在此调用dispatch，更改单个的选项框updateIsChecked方法调用
      let promise = dispatch("updateIsChecked", {
        // 并将参数传递到上面那个方法中。
        skuId: item.skuId,
        isChecked: isChecked,
      });
      // 将所有无论成功与否的promise对象存入peomises中（尾部）。
      promises.push(promise);
    });
    // 使用promise对象中的all方法，全成即成，一败全败
    return Promise.all(promises);
  },

  // 请求响应函数：（请求删除单个商品）
  async deleteShopCart({ commit }, skuId) {
    const result = await reqDeleteCart(skuId);
    if (result.code === 200) {
      return "当前商品删除成功！";
    } else {
      return Promise.reject(new Error("删除当前商品失败！"));
    }
  },
  // 请求响应函数：（请求删除所有选中的商品）
  async deleteCheckedShopCart({ commit, dispatch, state }) {
    let promises = [];
    state.shopCartList.forEach((item) => {
      if (!item.isChecked) return;
      // 本质上我们还是调用dispatch使用删除单个的请求，进行一个一个的删除。
      let promise = dispatch("deleteShopCart", item.skuId);
      promises.push(promise);
    });
    return Promise.all(promises);
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
