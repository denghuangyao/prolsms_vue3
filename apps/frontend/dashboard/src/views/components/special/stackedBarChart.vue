<script setup lang="ts">
import { EchartsUI, type EchartsUIType, useEcharts } from '@dhy/plugins/echarts';
import { ref, onMounted } from 'vue';
import { adapterChart } from '@/utils/chartAdapter';
import { $pxByScreenW } from '@/utils/screen';
const stackedBarChartRef = ref<EchartsUIType>();
let chartList = ref([
  { x: '技术部', y1: 100, y2: 200, y3: 300 },
  { x: '测试部', y1: 200, y2: 100, y3: 150 },
  { x: '产品部', y1: 300, y2: 250, y3: 200 },
  { x: '销售部', y1: 40, y2: 50, y3: 60 },
  { x: '行政部', y1: 100, y2: 150, y3: 200 },
]);
function createLineChart() {
  // 合并配置选项
  const chartOptions = adapterChart({
    type: 'bar',
    data: {
      nameKey: 'x',
      valueKey: 'y1,y2,y3',
      list: chartList.value,
    },
    theme: 'data-screen-theme',
    grid: {
      top: '10%',
      bottom: '15%',
    },
    dataZoom: [
      //滚动条
      {
        show: true,
        type: 'slider',
        realtime: true,
        startValue: 0,
        endValue: 100,
        xAxisIndex: [0],
        bottom: '5%',
        left: '12%',
        right: '12%',
        height: $pxByScreenW(15),
        handleSize: $pxByScreenW(20),
        handleStyle: {
          color: '#009edc',
          borderWidth: $pxByScreenW(2),
          borderColor: 'rgba(45, 221, 237,1)',
        },
        moveHandleSize: 0,
        borderColor: 'rgba(0,0,0,0)',
        fillerColor: 'rgba(45, 221, 237,0.2)',
        textStyle: {
          fontSize: $pxByScreenW(14),
          color: 'rgba(255,255,255,0.85)',
        },
        emphasis: {
          handleStyle: {
            borderColor: '#40b2bb',
          },
        },
      },
    ],
  });
  const { renderEcharts } = useEcharts(stackedBarChartRef);
  renderEcharts(chartOptions);
}
// 生命周期钩子
onMounted(() => {
  createLineChart();
});
</script>
<template>
  <div class="sub-container">
    <block-title title="各部门实验室预约情况" />
    <empty :isEmpty="!chartList.length">
      <EchartsUI class="chart-container" ref="stackedBarChartRef"></EchartsUI>
    </empty>
  </div>
</template>
<style lang="scss" scoped>
.sub-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  .chart-container {
    flex: 1;
  }
}
</style>
