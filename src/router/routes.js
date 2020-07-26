// import Home from "@/pages/Home";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";
// import Search from "@/pages/Search";
// import Detail from "@/pages/Detail";
// import AddCartSuccess from "@/pages/AddCartSuccess";
// import ShopCart from "@/pages/ShopCart";
// import Trade from "@/pages/Trade";
// import Pay from "@/pages/Pay";
// import PaySuccess from "@/pages/PaySuccess";
// import Center from "@/pages/Center";
// import MyOrder from "@/pages/Center/MyOrder";
// import GroupOrder from "@/pages/Center/GroupOrder";

// 懒加载import
const Home = () => import("@/pages/Home");
const Login = () => import("@/pages/Login");
const Register = () => import("@/pages/Register");
const Search = () => import("@/pages/Search");
const Detail = () => import("@/pages/Detail");
const AddCartSuccess = () => import("@/pages/AddCartSuccess");
const ShopCart = () => import("@/pages/ShopCart");
const Trade = () => import("@/pages/Trade");
const Pay = () => import("@/pages/Pay");
const PaySuccess = () => import("@/pages/PaySuccess");
const Center = () => import("@/pages/Center");
const MyOrder = () => import("@/pages/Center/MyOrder");
const GroupOrder = () => import("@/pages/Center/GroupOrder");

// 供路由守卫使用，检测当前用户名是否存在
import store from "@/store";

export default [
  {
    path: "/center",
    component: Center,
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "",
        redirect: "myorder",
      },
    ],
  },
  {
    path: "/pay",
    component: Pay,
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
  },
  {
    path: "/trade",
    component: Trade,
  },
  {
    path: "/shopcart",
    component: ShopCart,
  },
  {
    path: "/addcartsuccess",
    component: AddCartSuccess,
  },
  {
    path: "/detail/:goodsId",
    component: Detail,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    // 用来判定底部是否隐藏
    meta: {
      isHide: true,
    },
    // 假如用户直接在路径中输入/login还是会去到登录页面，此时我们需要限制这一操作
    beforeEnter: (to, from, next) => {
      // 如果当前用户名不存在
      if (!store.state.user.userInfo.name) {
        // 放行
        next();
      } else {
        // 去到根目录，home
        next("/");
      }
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
    path: "/search/:keyword?",
    component: Search,
    name: "search",
    // props: route => ({keyword:route.params.keyword,keyword1:route.query.keyword1})
  },
  {
    path: "/",
    redirect: "/home",
  },
];
