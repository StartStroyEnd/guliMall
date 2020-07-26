import Vue from "vue";
import VeeValidate from "vee-validate";
// 引入中文的提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";

Vue.use(VeeValidate);
// 导入中文提示信息，将英文字符映射为中文
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    // 修改内置规则的message
    is: (field) => `${field}必须与密码相同`,
  },
  // 对应
  attributes: {
    phone: "手机号",
    code: "验证码",
    password: "密码",
    password2: "确认密码",
    ischeck: "协议",
  },
});

// // 自定义一个错误提示，
VeeValidate.Validator.extend("agree", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意哦~",
});
