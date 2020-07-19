<template>
  <div class="pagination">
    <!-- 当当前页码等于1的时候不显示上一页 -->
    <!-- 使用自定义事件在此进行数据分发，将这里的点击事件响应到父组件 -->
    <!-- 并抛出参数，父组件对应其更改当前页码，进行再次跳转 -->
    <button
      :disabled="currentPageNum === 1"
      @click="$emit('changePage', currentPageNum - 1)"
    >
      上一页
    </button>
    <!-- 当当前页码范围的起始页码大于1时显示 -->
    <!-- 1是一直存在的当start的值为1时候，不显示，而显示的是这个标签里的1 -->
    <button
      v-show="startEnd.start > 1"
      :class="{ active: currentPageNum === 1 }"
      @click="$emit('changePage', 1)"
    >
      1
    </button>
    <!-- 当当前页码范围的始页码大于2时显示... -->
    <button v-show="startEnd.start > 2">···</button>

    <!-- 遍历计算出来的正常页码范围的结束页码 -->
    <!-- vfor 可以遍历数字，数字来源于计算属性内的方法返回值{数字} -->
    <!-- 当前遍历的这个数字是从1-x   则需要判断后截取 -->
    <!-- 判断遍历出来的1-x 是否大于等于start -->
    <button
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      :class="{ active: page === currentPageNum }"
      @click="$emit('changePage', page)"
    >
      {{ page }}
    </button>

    <!-- 当当前页码范围的结束页码小于最大页码-1 时显示 -->
    <button v-show="startEnd.end < totalPage - 1">···</button>
    <!-- 当当前页码范围的结束页码小于最大页码时显示 当前为40，如果到39的时候是显示的，40则不显示 -->
    <!-- 因为计算中已经重置了 -->
    <button
      v-show="startEnd.end < totalPage"
      :class="{ active: currentPageNum === totalPage }"
      @click="$emit('changePage', totalPage)"
    >
      {{ totalPage }}
    </button>
    <!-- 当当前页码等于最大页码时不显示下一页 -->
    <button
      :disabled="currentPageNum === totalPage"
      @click="$emit('changePage', currentPageNum + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    continueNum: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    totalPage() {
      // 总页数：10= 总数：40/每页页码数：4
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页的起始和结束
    startEnd() {
      // 解构参数
      let { currentPageNum, totalPage, continueNum } = this;
      // 判断总页数，是否比连续页码还要小，判断当前页码是否为起始或者结束位置
      // 如果不是，那么肯定是中间的start 和 end，
      let start;
      let end;
      let disNum;
      if (totalPage <= continueNum) {
        // 如果当前总页码大于了连续页码5
        // 这个时候起始位置肯定为1
        start = 1;
        // 这个时候结束位置肯定为最大页码
        end = totalPage;
      } else {
        // 此时初次计算正常情况下的所有连续页码的起始值和结束值
        // 排除当前页码小于等于1 或者 大于等于最大页码
        start = currentPageNum - Math.floor(continueNum / 2);
        end = currentPageNum + Math.floor(continueNum / 2);
        // 此时出现特殊情况，当当前正常连续页码(start)小于等于1时：
        if (start <= 1) {
          // 计算当前页码小于等于1的正常连续页码的0或者负数到当前页码的差值
          disNum = 1 - start;
          // 将其连续页码的最低页码范围重置为5个正常范围的页码
          start += disNum;
          end += disNum;
          // 若当前页码的正常连续页码（end）大于等于了最大页码
        }
        if (end >= totalPage) {
          // 则计算当前(end) 与 当前页码的差值
          disNum = end - totalPage;
          // 将其连续页码的最大页码范围重置为5个正常范围的页码
          start -= disNum;
          end -= disNum;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
