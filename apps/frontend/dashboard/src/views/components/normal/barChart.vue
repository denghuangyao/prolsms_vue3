<script setup lang="ts">
import { EchartsUI, type EchartsUIType, useEcharts } from '@dhy/plugins/echarts';
import { ref, onMounted } from 'vue';
import { adapterChart } from '@/utils/chartAdapter';

const barChartRef = ref<EchartsUIType>();
let chartList = ref([
  { name: '技术部', value: 100 },
  { name: '测试部', value: 200 },
  { name: '产品部', value: 300 },
  { name: '销售部', value: 400 },
  { name: '行政部', value: 500 },
]);
function createBarChart() {
  // 合并配置选项
  const chartOptions = adapterChart({
    type: 'bar',
    data: {
      list: chartList.value,
    },
    theme: 'data-screen-theme',
  });
  const { renderEcharts } = useEcharts(barChartRef);
  renderEcharts(chartOptions);
}
// 生命周期钩子
onMounted(() => {
  createBarChart();
});
</script>
<template>
  <div class="sub-container">
    <block-title title="部门人数情况" />
    <empty :isEmpty="!chartList.length">
      <EchartsUI class="chart-container" ref="barChartRef"></EchartsUI>
    </empty>
  </div>
</template>
<style lang="scss" scoped>
.sub-container {
  display: flex;
  flex-direction: column;
  .chart-container {
    flex: 1;
  }
}
</style>
