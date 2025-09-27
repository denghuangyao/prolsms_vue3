<script lang="ts" setup>
// import barChart from './components/normal/barChart.vue';
import doughnutChart from './components/normal/doughnutChart.vue';
// import lineChart from './components/normal/lineChart.vue';
import stackedLineChart from './components/special/stackedLineChart.vue';
import stackedBarChart from './components/special/stackedBarChart.vue';
import { default as shujugaikuang, type GaikuangDataConfig } from './components/shujugaikuang.vue';
import qualityRank from './components/qualityRank.vue';
import OnlineTable from './components/onlineTable.vue';
import Pie3DChart from '@/views/components/special/pie3DChart.vue';
import bar3DChart from './components/special/bar3DChart.vue';
let shijugaikuangData: GaikuangDataConfig = {
  WHP: {
    compareList: [
      { label: '库存总数', value: '', position: 'total' },
      { label: '库存总金额', value: '', position: 'leftTop' },
      { label: '库存不足', value: '', position: 'rightTop' },
      { label: '待归还', value: '', position: 'leftBottom' },
      { label: '待出库', value: '', position: 'rightBottom' },
    ],
    list: [
      { label: '库存总数', value: '10000' },
      { label: '库存总金额', value: '50000' },
      { label: '库存不足', value: '10' },
      { label: '待归还', value: '500' },
      { label: '待出库', value: '600' },
    ],
    label: '危化品',
  },
  YQYY: {
    compareList: [
      { label: '仪器总数', value: '', position: 'total' },
      { label: '使用中', value: '', position: 'leftTop' },
      { label: '超时未下机', value: '', position: 'rightTop' },
      { label: '故障', value: '', position: 'leftBottom' },
      { label: '停用', value: '', position: 'rightBottom' },
    ],
    list: [
      { label: '仪器总数', value: '20000' },
      { label: '使用中', value: '10000' },
      { label: '超时未下机', value: '5' },
      { label: '故障', value: '10' },
      { label: '停用', value: '4' },
    ],
    label: '仪器预约',
  },
};
</script>
<template>
  <div class="daping-bg">
    <dp-header class="daping-header" title="数据监控平台大屏"> </dp-header>
    <div class="main-container flexRowCon">
      <!-- 普通图表显示：区域1，2，3 -->
      <div class="content-block flexColumnCon">
        <!-- 普通图表S -->
        <bar3DChart class="content-item" />
        <qualityRank class="content-item" />
        <doughnutChart class="content-item" />
        <!-- <barChart class="content-item" /> -->
      </div>
      <div class="content-middle flexColumnCon">
        <!-- 数据概况 -->
        <shujugaikuang class="content-shujugaikuang" :data="shijugaikuangData" />
        <!-- 特殊图表显示 -->
        <stackedLineChart class="content-bottom" />
      </div>
      <!-- 普通图表显示：区域4，5，6 -->
      <div class="content-block flexColumnCon">
        <Pie3DChart class="content-item" />
        <stackedBarChart class="content-item" />
        <!-- <lineChart class="content-item" /> -->
        <OnlineTable class="content-item" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin btn-bg {
  background: linear-gradient(180deg, #20dcf9 0%, #0f588a 100%);
  background: -moz-linear-gradient(180deg, #20dcf9 0%, #0f588a 100%);
  background: -o-linear-gradient(180deg, #20dcf9 0%, #0f588a 100%);
  background: -webkit-linear-gradient(180deg, #20dcf9 0%, #0f588a 100%);
}
body {
  width: pxTovw(1920);
  min-height: pxTovw(1080);
}
.mt20 {
  margin-top: pxTovw(20);
}
.main-container {
  padding: pxTovw(20);
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - #{pxTovw(67)});
  .content-block {
    // width: pxTovw(520);
    flex: 1;
    box-sizing: border-box;

    .content-item {
      width: 100%;
      // min-height: pxTovw(310);
      box-sizing: border-box;
      flex: 1;
    }
    .contentbox {
      display: flex;
      flex-direction: column;
    }
  }
  .content-middle {
    // width: pxTovw(800);
    flex: 0 0 42.4%;
    box-sizing: border-box;
    .content-bottom {
      width: 100%;
      // height: pxTovw(410);
      box-sizing: border-box;
      flex: 1;
    }
    .content-shujugaikuang {
      // height: pxTovw(540);
      flex: 1.5;
      box-sizing: border-box;
    }
  }
}
.flexRowCon {
  display: flex;
  flex-direction: row;
  column-gap: pxTovw(18);
}
.flexColumnCon {
  display: flex;
  flex-direction: column;
  row-gap: pxTovw(15);
}
.daping-bg {
  // width: pxTovw(1920);
  /**头部内容样式S */
  .daping-header {
    .header-slot-box {
      position: absolute;
      left: pxTovw(30);
      top: pxTovw(11);
      display: flex;
      align-items: center;
    }
    .btn {
      cursor: pointer;
      .btn-img {
        height: pxTovw(16);
        width: pxTovw(17);
        margin-right: pxTovw(6);
      }
      .btn-text {
        font-size: pxTovw(14);
      }
      @include btn-bg;
      box-shadow: inset 0px pxTovw(2) pxTovw(12) 0px rgba(40, 216, 244, 0.3);
      border-radius: pxTovw(2);
      color: #fff;
      padding: pxTovw(7) pxTovw(11);
      display: flex;
      align-items: center;
      margin-right: pxTovw(20);
      height: pxTovw(34);
      box-sizing: border-box;
    }
    .header-logo-img {
      width: pxTovw(247);
      height: pxTovw(42);
      display: block;
      margin: 0 auto;
    }
  }
  height: calc(100vh);
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('@assets/images/largeScreen/xtdp/dp_bg.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
}
// 小屏幕下的样式
@media (max-width: 576px) {
  .daping-bg {
    height: unset;
    background: #000710;

    .main-container {
      flex-direction: column !important;
      flex-wrap: wrap;

      .content-block:first-child {
        height: 930px !important;
        order: 2 !important;
        flex: 0 0 auto !important;
      }
      .content-bottom {
        flex: 2;
      }
      .content-middle {
        height: 500px !important;
        order: 1;
        flex: 0 0 auto !important;
      }

      .content-block:nth-child(3) {
        order: 3 !important;
        height: 930px !important;
        flex: 0 0 auto !important;
      }
    }
  }
}
</style>
