<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去
          <!-- <a href="login.html" target="_blank">登陆</a> -->
          <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model="mobile"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{4}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <!-- src="http://182.92.128.115/api/user/passport/code" -->
        <img
          ref="code"
          alt="code"
          src="/api/user/passport/code"
          @click="changeCode"
        />
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="text"
          placeholder="请输入你的登录密码"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /\w{6,20}/ }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="text"
          placeholder="请输入确认密码"
          v-model="password2"
          name="password2"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('password2') }"
        />
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="controls">
        <input
          type="checkbox"
          v-model="ischeck"
          name="ischeck"
          v-validate="{ agree: true }"
          :class="{ invalid: errors.has('ischeck') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("ischeck") }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    // 自动收集表单中的数据
    return {
      mobile: "",
      password: "",
      code: "",
      password2: "",
      ischeck: false,
    };
  },
  methods: {
    async register() {
      // 解构出当前组件中的四个参数
      const success = await this.$validator.validateAll();
      if (success) {
        let { mobile, password, code, password2 } = this;
        // 判断所有的输入框必须填写且两个密码框是一致的才可以触发请求发送
        // if (mobile && password && code && password === password2) {
        // 将当前组件中收集的数据，存入userInfo中，以发送请求时，提供此参数与之后台对应
        let userInfo = { mobile, password, code };
        try {
          // 事件触发，发送请求
          await this.$store.dispatch("userRegister", userInfo);
          // 发送请求并未接收成功与否的提示
          alert("注册成功，将跳转到登录页面！");
          this.$router.push("/login");
        } catch (error) {
          // 打印错误信息
          alert(error.message);
        }
        // }
      }
    },
    changeCode() {
      // this.$refs.code.src = "http://182.92.128.115/api/user/passport/code";
      this.$refs.code.src = "/api/user/passport/code";
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
