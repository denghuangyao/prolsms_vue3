<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { EchartsUI, type EchartsUIType, useEcharts } from '@dhy/plugins/echarts';

import { adapterChart } from '@/utils/chartAdapter';
const bar3DChartRef = ref<EchartsUIType>();
let chartList = ref([
  { name: '行政部', value: 500 },
  { name: '技术部', value: 100 },
  { name: '测试部', value: 200 },
  { name: '销售部', value: 400 },
  { name: '产品部', value: 300 },
]);
function createLineChart() {
  // 合并配置选项
  const chartOptions = adapterChart({
    type: '3d-bar',
    data: {
      list: chartList.value,
    },
    theme: 'data-screen-theme',
  });
  const { renderEcharts } = useEcharts(bar3DChartRef);
  renderEcharts(chartOptions);
}
// 生命周期钩子
onMounted(() => {
  createLineChart();
});
</script>
<template>
  <div class="sub-container">
    <block-title title="各部门人员情况" />
    <empty :isEmpty="!chartList.length">
      <EchartsUI ref="bar3DChartRef"></EchartsUI>
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
