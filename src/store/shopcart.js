import { reqAddOrUpdateShopCart } from "@/api";

const state = {};
const mutations = {};

const actions = {
  //异步请求数据
  //async 和 await的用法
  async addorUpdateShopCart({ commit }, { skuId, skuNum }) {
    console.log(111);
    const result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code === 200) {
      return "添加购物车成功";
    } else {
      // return "添加购物车失败";
      // 由于promise的特性，当返回值为一个正常数据，则返回的一定是成功的promise
      return Promise.reject(new Error("添加购物车失败"));
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
