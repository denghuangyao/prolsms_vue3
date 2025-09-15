<script setup lang="ts">
import { EchartsUI, type EchartsUIType, useEcharts } from '@dhy/plugins/echarts';
import { ref, onMounted } from 'vue';
import { adapterChart } from '@/utils/chartAdapter';
const lineChartRef = ref<EchartsUIType>();
let chartList = ref([
  { name: '技术部', value: 100 },
  { name: '测试部', value: 200 },
  { name: '产品部', value: 300 },
  { name: '销售部', value: 40 },
  { name: '行政部', value: 100 },
]);
function createLineChart() {
  // 合并配置选项
  const chartOptions = adapterChart({
    type: 'line',
    data: {
      list: chartList.value,
    },
    theme: 'data-screen-theme',
  });
  const { renderEcharts } = useEcharts(lineChartRef);
  renderEcharts(chartOptions);
}
// 生命周期钩子
onMounted(() => {
  createLineChart();
});
</script>
<template>
  <div class="sub-container">
    <block-title title="报警数量趋势" />
    <empty :isEmpty="!chartList.length">
      <EchartsUI class="chart-container" ref="lineChartRef"></EchartsUI>
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
