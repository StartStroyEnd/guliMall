// 7月13日，对axios的二次封装

import axios from "axios";
import NProgress from "nprogress";
// 引入nprogress文件夹中的css文件
import "nprogress/nprogress.css";

const service = axios.create({
  // 若此处直接将域放入baseURL则会直接跨域，后端不运行则无法访问
  // 配置基础路径
  baseURL: "/api",
  // 配置超时限制
  timeout: 10000,
});

// Add a request interceptor
service.interceptors.request.use(
  // function(config) {
  //   // Do something before request is sent
  //   return config;
  // },
  // function(error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // }
  //

  // config 是发送请求的配置对象，必须处理完返回这个配置对象
  (config) => {
    NProgress.start();
    return config;
  }
);

// Add a response interceptor
service.interceptors.response.use(
  // function(response) {
  //   // Any status code that lie within the range of 2xx cause this function to trigger
  //   // Do something with response data
  //   return response;
  // },
  // function(error) {
  //   // Any status codes that falls outside the range of 2xx cause this function to trigger
  //   // Do something with response error
  //   return Promise.reject(error);
  // }

  (response) => {
    // 1.停止进度条,
    // 2.返回响应时，直接返回响应的数据(data)
    NProgress.done();
    return response.data;
  },
  (error) => {
    // 以后，不允许用户继续处理：中断promise链
    alert("请求错误，错误信息：" + error.message || "未知错误");

    // 方式1：禁用用户处理｛中断｝返回一个空的promise对象为一个pending状态
    // return new Promise(() => {});

    // 方式2：允许用户处理：返回一个失败状态的Promise。让用户自己去处理错误
    return Promise.reject(error);
  }
);

export default service;
