import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//终极解决多次触发push或者repalce，报错的问题
//NavigationDuplicated

const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onResolved, onRejected) {
  if (onResolved === undefined && onRejected === undefined) {
    // originPush.call目的是让VueRouter实例化对象去调用‘
    //如果不加，那就是window在调用
    return originPush.call(this, location).catch(() => {});
  } else {
    return originPush.call(this, location, onResolved, onRejected);
  }
};

VueRouter.prototype.replace = function(location, onResolved, onRejected) {
  if (onResolved === undefined && onRejected === undefined) {
    // originPush.call目的是让VueRouter实例化对象去调用‘
    //如果不加，那就是window在调用
    return originReplace.call(this, location).catch(() => {});
  } else {
    return originReplace.call(this, location, onResolved, onRejected);
  }
};

import routes from "@/router/routes";
import store from "@/store";

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
export default router;

// 路由守卫，全局前置路由导航守卫
// 要求1
// 必须登录后才能访问多个界面
// 要求2：
// 当没有登录的时候，跳转到订单，交易相关，支付相关，以及个人中心页面，直接跳转到登录页面

router.beforeEach((to, from, next) => {
  // to:          代表路由对象，目标路径
  // from：       代表路由对象，起始路径
  // next:        解析钩子函数，是否允许访问当前路径
  // next()       允许访问
  // next(fasle)  不允许访问
  // next('路径') 重定向访问
  let targetPath = to.path;
  // 如果，当前跳转的路径为支付(pay) 或者 个人中心(center) 再或者 购物车(trade)页面
  if (
    targetPath.startsWith("/pay") ||
    targetPath.startsWith("/trade") ||
    targetPath.startsWith("/center")
  ) {
    // 如果当前vuex中有保存用户登录过后的用户名，放行
    if (store.state.user.userInfo.name) {
      next();
    } else {
      // 如果当前vuex中没有保存用户登录过后的用户名，跳转到登录页面
      next("/login?redirect=" + targetPath);
    }
  } else {
    // 如果不是跳转到上面三个页面，则放行
    next();
  }
});
