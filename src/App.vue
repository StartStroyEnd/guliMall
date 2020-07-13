<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- <Footer v-if="$route.path === '/home' || $route.path === '/search'"></Footer> -->
    <!-- 谁的路由管理器中写有meta属性，则由此取反以指定是否渲染 -->
    <Footer v-if="!$route.meta.isHide"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 测试当前接口请求是否请求成功
// import { reqCategoryList } from "@/api";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  // mounted测试当前接口请求是否请求成功
  // mounted() {
  //   reqCategoryList();
  // },
};
</script>

<style scoped lang="less"></style>
