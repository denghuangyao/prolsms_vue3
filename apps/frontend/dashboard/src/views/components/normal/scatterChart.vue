<script setup lang="ts">
import { EchartsUI, type EchartsUIType, useEcharts } from '@dhy/plugins/echarts';
import { ref, onMounted } from 'vue';
import { adapterChart } from '@/utils/chartAdapter';

const scatterChartRef = ref<EchartsUIType>();
let chartList = ref([
  { name: '2025-02-01', value: 260 },
  { name: '2025-02-04', value: 200 },
  { name: '2025-02-09', value: 279 },
  { name: '2025-02-13', value: 847 },
  { name: '2025-02-18', value: 241 },
  { name: '2025-02-23', value: 411 },
  { name: '2025-02-27', value: 985 },
]);
function createScatterChart() {
  // 合并配置选项
  const chartOptions = adapterChart({
    type: 'effectScatter',
    data: {
      list: chartList.value,
    },
    theme: 'data-screen-theme',
  });
  const { renderEcharts } = useEcharts(scatterChartRef);
  renderEcharts(chartOptions);
}
// 生命周期钩子
onMounted(() => {
  createScatterChart();
});
</script>
<template>
  <div class="sub-container">
    <!-- <block-title title="仪器用电量" /> -->
    <empty :isEmpty="!chartList.length">
      <EchartsUI class="chart-container" ref="scatterChartRef"></EchartsUI>
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
