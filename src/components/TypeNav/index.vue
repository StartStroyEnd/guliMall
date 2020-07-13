<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort">
        <div class="all-sort-list2">
          <!-- 于此处对应渲染 一级列表-->
          <div
            class="item bo"
            v-for="(c1, index) in categoryList"
            :key="c1.categoryList"
          >
            <h3>
              <!-- 链接 -->
              <a href="">{{ c1.categoryName }}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <!-- 二级列表 -->
                <dl
                  class="fore"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryList"
                >
                  <dt>
                    <a href="">{{ c2.categoryName }}</a>
                  </dt>
                  <dd>
                    <!-- 三级列表 -->
                    <em
                      v-for="(c3, index) in c2.categoryChild"
                      :key="c3.categoryList"
                    >
                      <a href="">{{ c3.categoryName }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {};
  },
  mounted() {
    //   对接actions
    // actions对接组件对象的操作
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      this.$store.dispatch("getCategoryList");
    },
  },
  computed: {
    // 老实人写法：
    // 不使用mapState,其原始写法为：
    // categoryList() {
    //   // 若该return语句中没有.home则可以使用...mapState
    //   return this.$store.state.home.categoryList;
    // },

    // 错误写法：
    // 由于.home是分模块，无法直接使用rest语法直接获取
    // 而mapState默认映射的是this.$store.state.categoryList的数据，所以不能使用数组形式来获取
    // ...mapState(["categoryList"])

    // 正确写法：
    // 此时将数据传递到当前组件中
    ...mapState({
      // 添加花括号时一定要有return，没有就不能加，否则无法获取
      // 箭头函数=>获取的是这个方法的返回值
      // 当前只返回一个返回值
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 650px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            background-color: #333;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
