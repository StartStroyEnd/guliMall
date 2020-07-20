<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["imgList"],
  data() {
    return {
      defaultIndex: 0,
    };
  },
  computed: {
    defaultImg() {
      // if (this.imgList) {
      //   return this.imgList[this.defaultIndex];
      // } else {
      //   return {};
      // }
      // 方式2
      if (this.imgList) {
        return this.imgList[this.defaultIndex] || {};
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.$bus.$on("changeDefaultIndex", this.changeDefaultIndex);
  },
  methods: {
    changeDefaultIndex(index) {
      this.defaultIndex = index;
    },
    // event事件对象
    move(event) {
      // 获取事件源的元素
      let target = event.target;
      // 获取鼠标移动时，相对于事件源元素横轴的距离
      let mouseX = event.offsetX;
      // 获取鼠标移动时，相对于事件源元素竖轴的距离
      let mouseY = event.offsetY;
      //获取当前事件源元素的替代元素，这个替代元素是一个空的div用于模拟事件源元素的位置。
      // 从而实现在这个假事件源元素身上移动，实现大图显示位置更换
      let mask = this.$refs.mask;
      // 获取大图元素
      let bigImg = this.$refs.bigImg;

      // 求出mask蒙版需要走的位置
      // 其思路为：
      // 蒙版所能够移动的距离为自身宽高的1/2，因为这是一个二倍图
      // 横轴蒙版可移动距离（宽度）=自身所占宽度 - 蒙版的一半宽
      let maskX = mouseX - mask.offsetWidth / 2;
      // 竖轴蒙版可移动距离（高度）=自身所占高度 - 蒙版的一半高
      let maskY = mouseY - mask.offsetHeight / 2;

      // 蒙版的边界值判断，否则蒙版会溢出到假的事件源元素以外
      // 横轴蒙版边界
      // 概念：
      // offserHeight 元素在竖轴所占据的位置，包含边框
      // offserWidth 元素在横轴轴所占据的位置，包含边框

      // 左侧边界，当蒙版的
      if (maskX < 0) {
        maskX = 0;
        // 如蒙版的横轴移动距离大于了 假事件源元素距离视口的x轴的宽度 - 蒙版自身x轴距离假事件源元素的宽度
      } else if (maskX > target.clientWidth - mask.offsetWidth) {
        // 则将蒙版归位到假事件源元素自身的一半宽度
        maskX = target.clientWidth - mask.offsetWidth;
      }
      // 竖轴蒙版边界
      // 原理同上
      if (maskY < 0) {
        maskY = 0;
      } else if (maskY > target.clientHeight - mask.offsetHeight) {
        maskY = target.clientHeight - mask.offsetHeight;
      }

      // 将以上所计算出的蒙版可移动距离设置到蒙版
      // 横轴
      mask.style.left = maskX + "px";
      // 竖轴
      mask.style.top = maskY + "px";

      // 将所计算的移动距离，设置给大图
      // 其移动的位置与蒙版相反且是蒙版的两倍
      bigImg.style.left = -2 * maskX + "px";
      bigImg.style.top = -2 * maskY + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
