<script setup lang="ts">
import { EchartsUI, type EchartsUIType, useEcharts } from '@dhy/plugins/echarts';
import { ref, onMounted } from 'vue';
import { adapterChart } from '@/utils/chartAdapter';
const stackedLineChartRef = ref<EchartsUIType>();
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
    type: 'line',
    data: {
      nameKey: 'x',
      valueKey: 'y1,y2,y3',
      list: chartList.value,
    },
    theme: 'data-screen-theme',
  });
  const { renderEcharts } = useEcharts(stackedLineChartRef);
  renderEcharts(chartOptions);
}
// 生命周期钩子
onMounted(() => {
  createLineChart();
});
</script>
<template>
  <div class="sub-container">
    <block-title title="实验室预约趋势" />
    <empty :isEmpty="!chartList.length">
      <EchartsUI class="chart-container" ref="stackedLineChartRef"></EchartsUI>
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
