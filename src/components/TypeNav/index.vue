<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOut" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <transition name="show">
          <div class="sort" v-show="isShow">
            <!-- 事件委派，进行回调 -->
            <div class="all-sort-list2" @click="toSearch">
              <!-- 于此处对应渲染 一级列表-->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                @mouseenter="moveIn(index)"
                :class="{ item_on: currentIndex === index }"
                :key="c1.categoryId"
              >
                <h3>
                  <!-- 1.router-link -->
                  <!-- 2.a标签事件定义回调methods -->
                  <!-- 编程式导航，可，但是效率不高则事件委派 -->
                  <!-- 3.a标签事件委派 -->

                  <!-- 路由传参 -->
                  <!-- <router-link
                    :to="{
                      name: 'search',
                      query: {
                        categoryName: c1.categoryName,
                        category1Id: c1.categoryId,
                      },
                    }"
                    >{{ c1.categoryName }}</router-link
                  > -->

                  <!-- 链接 -->
                  <!-- <a href="javascript:;" @click="toSearch(c1)">{{ -->
                  <!-- <a
                    href="javascript:;"
                    @click="
                      $router.push({
                        name: 'search',
                        query: {
                          categoryName: c1.categoryName,
                          category1Id: c1.categoryId,
                        },
                      })
                    "
                    >{{ c1.categoryName }}</a
                  > -->
                  <!-- 3 事件委派，自定义属性-->
                  <a
                    href="javascipt:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <!-- 二级列表 -->
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <!-- <router-link
                          :to="{
                            name: 'search',
                            query: {
                              categoryName: c2.categoryName,
                              category2Id: c2.categoryId,
                            },
                          }"
                          >{{ c2.categoryName }}</router-link
                        > -->
                        <!-- <a
                          href="javascript:;"
                          @click="
                            $router.push({
                              name: 'search',
                              query: {
                                categoryName: c2.categoryName,
                                category2Id: c2.categoryId,
                              },
                            })
                          "
                          >{{ c2.categoryName }}</a
                        > -->

                        <!-- <a href="">{{ c2.categoryName }}</a> -->
                        <!-- 3 事件委派，自定义属性-->
                        <a
                          href="javascipt:;"
                          :data-category1Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <!-- 三级列表 -->
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- 1 -->
                          <!-- <router-link
                            :to="{
                              name: 'search',
                              query: {
                                categoryName: c3.categoryName,
                                category3Id: c3.categoryId,
                              },
                            }"
                            >{{ -->

                          <!-- 2 -->
                          <!-- 到理由管理器对象中去修改接收 -->
                          <!-- c3.categoryName }}</router-link
                          > -->
                          <!-- <a
                            href="javascript:;"
                            @click="
                              $router.push({
                                name: 'search',
                                query: {
                                  categoryName: c3.categoryName,
                                  category3Id: c3.categoryId,
                                },
                              })
                            "
                            >{{ c1.categoryName }}</a
                          > -->

                          <!-- <a href="">{{ c3.categoryName }}</a> -->
                          <!-- 3 事件委派，自定义属性-->
                          <a
                            href="javascipt:;"
                            :data-category1Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from "lodash";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  mounted() {
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  methods: {
    // 鼠标移入一级分类列表控制二三级显示。
    // moveIn(index) {
    //   this.currentIndex = index;
    // },
    // 鼠标移出
    moveOut() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },
    // moveIn: _.throttle(
    moveIn: throttle(
      function(index) {
        this.currentIndex = index;
      },
      10,
      // trailing 拖延触发
      // false则为当事件触发时，50毫秒开始计时的时候就执行回调
      // true则为当事件触发时，延迟50毫秒执行回调
      // { trailing: true }
      { trailing: false }
    ),

    // 点击跳转
    // 参数为事件对象
    toSearch(event) {
      // ele:事件目标元素
      // let ele = event.target
      // // 获取到元素身上所有的自定义属性组成的一个对象
      // // dataset是一个自带方法
      // let dataSet = ele.dataset

      let data = event.target.dataset;
      // console.log(data);
      //其中数据被转换成了小写
      let { categoryname, category1id, category2id, category3id } = data;

      if (categoryname) {
        // 如果categoryname不存在。连location都不用创建
        let location = {
          name: "search",
          // query:,
        };

        let query = {};
        // 为真正的一定点击的是a标签
        // let query = {
        //   categoryName: categoryname,
        // };
        query.categoryName = categoryname;
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        this.$router.push(location);
      }
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
      &.show-enter {
        height: 0;
        opacity: 0;
      }
      &.show-enter-to {
        height: 461px;
        opacity: 1;
      }
      &.show-enter-active {
        transition: all 2s;
      }
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

          &.item_on {
            background-color: #eee;
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
