import { reqTradeInfo } from "@/api";

const state = {
  tradeInfo: {},
};
const mutations = {
  //直接修改数据
  RECEIVETRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo;
  },
};

const actions = {
  async getTradeInfo({ commit }) {
    const result = await reqTradeInfo();
    if (result.code === 200) {
      commit("RECEIVETRADEINFO", result.data);
    }
  },
};

const getters = {
  // 避免A.B.C
  detailArrayList(state) {
    return state.tradeInfo.detailArrayList || [];
  },
  userAddressList(state) {
    return state.tradeInfo.userAddressList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
