import { reqRegister, reqLogout, reqLogin } from "@/api";
import { getUserTempId } from "@/utils/userabout";

const state = {
  userTempId: getUserTempId(),
  userInfo: JSON.parse(localStorage.getItem("USERINFO_KEY")) || {},
};
const mutations = {
  RECEIVEUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  RESETUSERINFO(state) {
    state.userInfo = {};
  },
};

const actions = {
  async userRegister({ commit }, userInfo) {
    const result = await reqRegister(userInfo);
    if (result.code === 200) {
      return "注册成功";
    } else {
      return Promise.reject(new Error("注册失败"));
    }
  },
  // 由dispatch触发该方法，请求数据，并将请求需要的数据userInfo传入
  async userLogin({ commit }, userInfo) {
    // 等待请求结果
    const result = await reqLogin(userInfo);
    // 如果请求的状态码为200
    if (result.code === 200) {
      // 保存用户登录的信息，以达到自动登录
      localStorage.setItem("USERINFO_KEY", JSON.stringify(result.data));

      // 提交到RECEIVEUSERINFO，并且传入数据到state中的userInfo中
      commit("RECEIVEUSERINFO", result.data);
    }
  },
  async userlogout({ commit }) {
    const result = await reqLogout();
    // 退出成功
    if (result.code === 200) {
      // 提交执行RESETUSERINFO，将vuex中的登录信息置空
      commit("RESETUSERINFO");
      // 并将localStorage中的账户数据清空
      localStorage.removeItem("USERINFO_KEY")
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
