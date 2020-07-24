<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              $route.query.orderNo
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ orderInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      orderInfo: {},
      status: 0,
    };
  },
  mounted() {
    // 在页面挂载前调用请求
    this.getOrderInfo();
  },
  methods: {
    async getOrderInfo() {
      // 用户触发事件调用原型对象上面添加的接口函数
      // 通过query参数（订单号）来进行查找当前用户的商品信息
      const result = await this.$API.reqOrderInfo(this.$route.query.orderNo);
      if (result.code === 200) {
        this.orderInfo = result.data;
      }
    },
    async pay() {
      try {
        const imgUrl = await QRCode.toDataURL(this.orderInfo.codeUrl);
        // this.$alert返回的也是一个promise则需要对成功或者失败进行处理
        // 此时，成功的promise代表了我已经成功支付《成功》
        // 失败的promise代表了支付中遇到了问题《取消》
        this.$alert(`<img src="${imgUrl}"></img>`, "请使用微信扫码支付", {
          dangerouslyUseHTMLString: true,
          showClose: false,
          showCancelButton: true,
          cancelButtonText: "支付中遇到了问题",
          confirmButtonText: "我已经成功支付",
          center: true,
          // 处理用户支付遇到问题和闲的发慌的操作
          beforeClose: (action, instance, done) => {
            // 当用户点击我已经成功支付的时候
            if (action === "confirm") {
              if (this.status != 200) {
                this.$message.error("请确保您已支付~");
              } else {
                clearInterval(this.timer);
                this.timer = null;
                this.$router.push("/paysuccess");
                // 手动关闭消息盒子，如果不使用done则永远也不会关闭
                done();
                // 当用户点击取消（支付时遇到问题）
              }
            } else if (action === "cancel") {
              clearInterval(this.timer);
              this.timer = null;
              this.$message.warning("当前网络故障，若无法支付，请联系客服。");
              done();
            }
          },
        })
          .then(() => {})
          .catch(() => {});
      } catch (error) {
        this.$message.error(error.message);
      }

      // 通过接口请求查看当前用户支付的状态
      // 此时需要循环定时器来不断查询这个状态。
      // 此时需要注意该异步操作的任务队列编号，需要设置为null才可完全清理

      if (!this.timer) {
        this.timer = setInterval(async () => {
          const result = await this.$API.reqPayStatus(this.orderInfo.orderId);
          if (result.code === 200) {
            // 此时需要保存用户支付成功的状态，用来判断当前用户支付完成以后
            // 网络卡顿，响应过慢，来验证用户支付完成或者未支付的状态点击（我已完成支付或者支付遇到问题）
            this.status = result.code;
            clearInterval(this.timer);
            // 此时需要完全清除定时器
            this.timer = null;
            //当当前验证的状态码时，200即为已经成功支付，支付完成以后，跳转到支付成功页面
            this.$router.push("/paysuccess");
            // 手动关闭消息盒子。
            this.$msgbox.close();
            // 转接到beforeClose去处理用户支付时遇到的问题或者闲的发慌的操作
          }
          if (this.status === 200) {
            this.$router.push("/paysuccess");
            this.$message.success("您已成功支付！");
          }
        }, 3000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
