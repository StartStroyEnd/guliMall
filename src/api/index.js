//这个文件是项目的接口请求函数文件
//给每个接口发请求，我们都把它封装成一个函数，到时需要请求拿数据的时候，就去调用对应的接口函数就完了
import Ajax from "@/ajax/Ajax";
import mockAjax from "@/ajax/mockAjax";
// 请求获取三级分类列表数据
// get   /api/product/getBaseCategoryList   参数：无

export const reqCategoryList = () =>
  Ajax({
    url: "/product/getBaseCategoryList",
    method: "GET",
  });

// 使用mock的接口去请求 banner数据   get 请求     /banner
export const reqBannerList = () => mockAjax.get("/banner");
export const reqFloorList = () => mockAjax.get("/floor");

//请求search的商品搜索列表数据
// post  /api/list   data   //data如果是空的对象代表没有搜索条件，会返回所有商品信息
export const reqGoodsList = (searchParams) => Ajax.post("/list", searchParams);

// 请求商品详情数据
export const reqGoodsDetailInfo = (skuId) => Ajax.get(`/item/${skuId}`);

// 请求添加购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  Ajax.post(`/cart/addToCart/${skuId}/${skuNum}`);

// 请求购物车列表数据
export const reqShopCartList = () => Ajax.get("/cart/cartList");

// 请求修改购物车选中状态的api
export const reqUpdateIsChecked = (skuId, isChecked) =>
  Ajax.get(`/cart/checkCart/${skuId}/${isChecked}`);

// 请求删除购物车中所选中的商品
export const reqDeleteCart = (skuId) =>
  Ajax.delete(`/cart/deleteCart/${skuId}`);

// 请求注册帐号
export const reqRegister = (userInfo) =>
  Ajax.post("user/passport/register", userInfo);

// 请求登录
export const reqLogin = (userInfo) =>
  Ajax.post("/user/passport/login", userInfo);

// 请求退出登录，清空本地数据
export const reqLogout = () => Ajax.get("/user/passport/logout");

// 请求订单交易信息
export const reqTradeInfo = () => Ajax.get("/order/auth/trade");

// 获取订单支付信息(创建订单，返回订单编号)
export const reqSubmitOrder = (tradeNo, tradeInfo) =>
  Ajax.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, tradeInfo);

// 获取订单的支付信息
export const reqOrderInfo = (orderId) =>
  Ajax.get(`/payment/weixin/createNative/${orderId}`);

// 支付状态请求，通过这个接口来判断用户是否已经付款
export const reqPayStatus = (orderId) =>
  Ajax.get(`/payment/weixin/queryPayStatus/${orderId}`);

// 当前我的订单页面的订单详情页面数据请求
export const reqMyOrder = (page, limit) =>
  Ajax.get(`/order/auth/${page}/${limit}`);
