import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import TypeNav from "@/components/TypeNav";
import SliderLoop from "@/components/SliderLoop";
import "@/mock/mockServer";
import Pagination from "@/components/Pagination";
import { MessageBox, Message } from "element-ui";

// 引入elementui单独对象
// 消息盒子

Vue.prototype.$msgbox = MessageBox;
// 弹出框
Vue.prototype.$alert = MessageBox.alert;
// 提示信息
Vue.prototype.$message = Message;

//这个是为了测试接口请求函数  后期也会使用这样的方式去使用
import * as API from "@/api";
// console.log(API)
// API.reqBannerList()
// API.reqGoodsList({})

Vue.config.productionTip = false;

Vue.component("TypeNav", TypeNav);
Vue.component("SliderLoop", SliderLoop);
Vue.component("Pagination", Pagination);

new Vue({
  beforeCreate() {
    // 相当于this.prototype上添加了一个$bus
    Vue.prototype.$bus = this;
    // 相当于this.prototype添加了一个$API,并且地址值为该项目的单文件接口函数文件
    Vue.prototype.$API = API;
  },
  el: "#app",
  render: (h) => h(App),
  router,
  store,
});
