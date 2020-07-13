import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 存储一份

const originpush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onResolved, onRjected) {
  if (onResolved === undefined && onRjected === undefined) {
    return originpush.call(this, location).catch(() => {});
  } else {
    return originpush.call(this, location, onResolved, onRjected);
  }
};
VueRouter.prototype.replace = function(location, onResolved, onRjected) {
  if (onResolved === undefined && onRjected === undefined) {
    return originReplace.call(this, location).catch(() => {});
  } else {
    return originReplace.call(this, location, onResolved, onRjected);
  }
};

import routes from "@/router/routes";

export default new VueRouter({
  // routes: routes,
  routes,
});
