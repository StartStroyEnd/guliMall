<template>
  <!-- 定义ref绑定轮播图挂载 -->
  <div class="swiper-container" ref="imglist">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
        <img
          :src="img.imgUrl"
          @click="changeIndex(index)"
          :class="{ active: currentIndex === index }"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "ImageList",
  props: ["imgList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
      this.$bus.$emit("changeDefaultIndex", index);
    },
  },
  watch: {
    imgList: {
      handler() {
        // Vue中。Dom更新是异步的
        this.$nextTick(() => {
          // 绑定ref挂载轮播
          new Swiper(this.$refs.imglist, {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            slidesPerGroup: 5,
            slidesPerView: 5,
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
