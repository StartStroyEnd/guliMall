import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import TypeNav from "@/components/TypeNav";
import SliderLoop from "@/components/SliderLoop";
import "@/mock/mockServer";
import MyPagination from "@/components/Pagination";
import { MessageBox, Message, Pagination } from "element-ui";
Vue.use(Pagination);

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
// 不使用注册
Vue.component("Pagination", MyPagination);

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

// 图片懒加载~~~~
// 引入！
import VueLazyLoad from "vue-lazyload";
import loading from "@/assets/images/loading.gif";
// 安装
Vue.use(VueLazyLoad, {
  loading,
});

// 引入前台表单验证
import "@/validate";
