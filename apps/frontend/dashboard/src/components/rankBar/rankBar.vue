<script lang="ts" setup>
import { onMounted, useTemplateRef, watch, toRefs } from 'vue';
import { useScroll, useIntervalFn, useTimeoutFn, type Fn } from '@vueuse/core';
import { type ProgressBarConfig, useProgressbarGrid } from './use-progressbar-grid';
// import progressBar from './progress-bar.vue';
interface Props {
  dataList: any[];
  nameKey?: string;
  valueKey?: string;
  isAutoScroll?: boolean;
  bar?: {
    height: number;
    radius?: number;
  } & ProgressBarConfig;
}
const {
  dataList = [],
  nameKey = 'label',
  valueKey = 'value',
  isAutoScroll = true,
  bar = {
    num: 48,
    radius: 0,
    preColor: '#1398ff',
    suffixColor: '#3affe4',
    backColor: '#0d4570',
    distance: 30, //栅格间距百分比，单位是%
  },
} = defineProps<Props>();
const { renderBack, renderProgressBar, perGridWidth } = useProgressbarGrid(bar);
const tableContainerEl = useTemplateRef<HTMLElement>('tableContainer');
let pause: Fn = () => {},
  resume: Fn = () => {};
const openScroll = () => {
  const { y, arrivedState } = useScroll(tableContainerEl, {
    offset: { bottom: 5 },
  });
  const { bottom } = toRefs(arrivedState);
  let intervalFn = useIntervalFn(() => {
    // console.log('滚动--', bottom.value, y.value);
    if (bottom.value) {
      pause();
      useTimeoutFn(() => {
        y.value = 0;
        resume();
      }, 1000);
    }
    y.value = y.value + 1;
  }, 30);
  pause = intervalFn.pause; // 暂停滚动
  resume = intervalFn.resume; // 开始滚动
};
onMounted(() => {
  if (isAutoScroll) {
    openScroll();
  }
});
// 数据处理— —没有实现排序，需要后台返回有序数组(从大到小)
watch(
  () => dataList,
  (newData: any) => {
    console.log('newData--', newData);
    if (!newData.length) return;
    let firstValue = newData[0]?.[valueKey];
    newData.forEach((item: any) => {
      if (firstValue <= 0) {
        item.percentage = 0;
      } else {
        item.percentage = Math.floor((+item[valueKey] / firstValue) * 100);
      }
    });
  },
  {
    deep: true,
    immediate: true,
  },
);
//鼠标移入停止滚动
function MouseEnter() {
  if (isAutoScroll) {
    pause();
  }
}
function MouseLeave() {
  //鼠标离开继续滚动
  if (isAutoScroll) {
    resume();
  }
}
</script>
<template>
  <div
    class="table-container full-view"
    ref="tableContainer"
    @mouseenter="MouseEnter"
    @mouseleave="MouseLeave"
  >
    <div v-if="dataList.length" class="table-progress">
      <div class="item" v-for="(item, index) in dataList" :key="index">
        <div class="title">
          <span :class="index < 3 ? 'index-bg index' : 'index'">{{
            index < 9 ? `0${index + 1}` : index + 1
          }}</span>
          <span class="dt">{{ item[nameKey] }}</span>
          <span class="dd">{{ item[valueKey] }}</span>
        </div>
        <div class="progress-container">
          <div class="progress-box">
            <div class="progress-bar">
              <div
                class="grid-progress-bar"
                v-for="i in bar.num"
                :style="`--barRadius:${bar.radius}px;
    --barWidth:${perGridWidth}%;
    --barBackground:${renderBack(i, item.percentage)};
    --barMarginLeft:${bar.distance}%;
    background:${renderProgressBar(i)};
    `"
              ></div>
              <!-- <progress-bar :bar="bar" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes fillProgress {
  from {
    width: 0%;
  }

  to {
    width: calc(var(--percent) * 1%);
    /* 动画结束时，宽度等于 CSS 变量 --progress */
  }
}

.table-progress {
  padding: pxTovw(20);
  box-sizing: border-box;

  .item {
    padding-bottom: pxTovw(20);

    &:hover {
      .title .dd {
        font-weight: bold;
      }
      .progress-container {
        box-shadow: 0px 0px 4px 0px #66dff4;
      }
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .index {
        color: #1be0fe;
        font-weight: bold;
        font-size: pxTovw(14);
        width: pxTovw(36);
        height: pxTovw(26);
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: italic;
        padding-right: pxTovw(6);
      }

      .index-bg {
        background: url('@assets/images/largeScreen/num_bg.png') center center no-repeat;
        background-size: 100% 100%;
        color: #fff !important;
      }

      .dt {
        flex: 1;
        font-size: pxTovw(14);
        color: #cdcdcd;
        margin: 0 pxTovw(10);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowarp;
      }

      .dd {
        color: #cdcdcd;
        font-size: pxTovw(14);
      }
    }
    .progress-container {
      margin-top: pxTovw(10);
      border: solid pxTovw(1) #3790d4;
      display: flex;
      align-items: center;
      padding: pxTovw(3) pxTovw(5);
      box-sizing: border-box;
      height: pxTovw(15);
    }
    .progress-box {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      // background: #0e3e63;
      // border-radius: 0px pxTovw(10) pxTovw(10) 0px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .progress-bar {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }
      .grid-progress-bar {
        height: 100%;
        width: var(--barWidth);
        border-radius: var(--barRadius);
        transition: all 1s;
        position: relative;
        // margin-left: var(--barMarginLeft);
        // &:first-of-type {
        //   margin-left: 0;
        // }
        &::before {
          position: absolute;
          content: '';
          height: 100%;
          width: 100%;
          background: var(--barBackground);
          border-radius: var(--barRadius);
          transition: all 1s;
        }
      }
      // .bar {
      //   // height: 100%;
      //   // background: linear-gradient(270deg, #2fd3f9 16%, #0086bb 100%);
      //   // border-radius: 0px pxTovw(10) pxTovw(10) 0px;
      //   // width: calc(var(--percent) * 1%);
      //   width: 0%;
      //   /* 初始宽度为 0 */
      //   animation: fillProgress 2s forwards;
      //   background-color: transparent;
      //   /* 动画名称，持续时间，以及让动画停留在最后一帧 */
      // }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
.table-container {
  overflow: auto;
}
</style>
