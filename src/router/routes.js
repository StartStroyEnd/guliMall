import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
export default [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    // 用来判定底部是否隐藏  （meta圆数据）
    meta: {
      isHide: true,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHide: true,
    },
  },
  {
    path: "/search/:keyword_in?",
    component: Search,
    name: "search",
    // route为当前路由对象
    props: (route) => ({
      // 对应写法    1
      // keyword_q: route.query.keyword_out,
      // keyword_p: route.params.keyword_in,
      // 对应写法    2
      keyword_q: route.query.keyword_q,
      keyword_p: route.params.keyword_p,
    }),
  },
  {
    path: "/",
    redirect: "/home",
  },
];
