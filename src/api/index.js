// 这个文件夹为一个接口函数文件

// 当给发送请求时,都会封装成一个函数
// 当需要请求后所响应的数据的时候,就直接掉用这个接口函数

// http://182.92.128.115/api/product/getBaseCategoryList
// get /api/product/getBaseCategoryList 无参数

import Ajax from "@/ajax/Ajax";

// 写法    1
// reqCategoryList请求列表
// get的第一个参数默认是url
// export const reqCategoryList = () =>
//   Ajax.get("/api/product/getBaseCategoryList");

// 原始写法：

// 部分暴露
export const reqCategoryList = () =>
  Ajax({
    // 去除/api
    url: "/product/getBaseCategoryList",
    method: "GET",
    // 返回ajax
  });
