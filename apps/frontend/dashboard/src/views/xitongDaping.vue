<script lang="ts" setup>
import barChart from './components/normal/barChart.vue';
import doughnutChart from './components/normal/doughnutChart.vue';
import lineChart from './components/normal/lineChart.vue';
import stackedLineChart from './components/special/stackedLineChart.vue';
import stackedBarChart from './components/special/stackedBarChart.vue';
import { default as shujugaikuang, type GaikuangDataConfig } from './components/shujugaikuang.vue';
import qualityRank from './components/qualityRank.vue';
import OnlineTable from './components/onlineTable.vue';
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
};
</script>
<template>
  <div class="daping-bg">
    <dp-header class="daping-header" title="数据监控平台大屏"> </dp-header>
    <div class="main-container flexRowCon">
      <!-- 普通图表显示：区域1，2，3 -->
      <div class="content-block flexColumnCon">
        <!-- 普通图表S -->
        <stackedBarChart class="content-item" />
        <doughnutChart class="content-item" />
        <lineChart class="content-item" />
      </div>
      <div class="content-middle flexColumnCon">
        <!-- 数据概况 -->
        <shujugaikuang class="content-shujugaikuang" :data="shijugaikuangData" />
        <!-- 特殊图表显示 -->
        <stackedLineChart class="content-bottom" />
      </div>
      <!-- 普通图表显示：区域4，5，6 -->
      <div class="content-block flexColumnCon">
        <qualityRank class="content-item" />
        <OnlineTable class="content-item" />
        <doughnutChart class="content-item" />
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
  flex: 1;
  .content-block {
    width: pxTovw(520);
    .content-item {
      width: 100%;
      height: pxTovw(310);
      box-sizing: border-box;
      margin-bottom: pxTovw(15);
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    .contentbox {
      display: flex;
      flex-direction: column;
    }
  }
  .content-middle {
    width: pxTovw(800);
    margin: 0 pxTovw(18);
    box-sizing: border-box;
    .content-bottom {
      width: 100%;
      height: pxTovw(410);
      box-sizing: border-box;
      margin-top: pxTovw(10);
    }
    .content-shujugaikuang {
      height: pxTovw(540);
      box-sizing: border-box;
    }
  }
}
.flexRowCon {
  display: flex;
  flex-direction: row;
}
.flexColumnCon {
  display: flex;
  flex-direction: column;
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
</style>
