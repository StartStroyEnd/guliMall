import Vue from "vue";
import App from "@/App";
import router from "@/router";
import TypeNav from "@/components/TypeNav";
// 引入状态管理器插件（vuex）
import store from "@/store";

Vue.component("TypeNav", TypeNav);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // 注册
  // 让每一个组件都可以获得this.$router路由器对象
  router,
  // 让每一个组件都可以获得this.$store对象
  store,
}).$mount("#app");
