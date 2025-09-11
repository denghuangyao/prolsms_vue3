<script setup lang="ts">
import { EchartsUI, type EchartsUIType, useEcharts } from '@dhy/plugins/echarts';
import { ref, onMounted } from 'vue';
import { adapterChart } from './utils/chartAdapter';
const lineChartRef = ref<EchartsUIType>();
const barChartRef = ref<EchartsUIType>();
const pieChartRef = ref<EchartsUIType>();
let chartList = [
  { name: 'dhy', value: 123 },
  { name: 'lcl', value: 100 },
  { name: 'ziji', value: 520 },
  { name: 'ziji2', value: 520 },
  { name: 'ziji3', value: 520 },
  { name: 'ziji4', value: 520 },
  { name: 'ziji5', value: 520 },
  { name: 'ziji6', value: 520 },
  { name: 'ziji7', value: 520 },
  { name: 'ziji8', value: 520 },
  { name: 'ziji9', value: 520 },
  { name: 'ziji10', value: 520 },
  { name: 'ziji11', value: 520 },
  { name: 'ziji12', value: 520 },
  { name: 'ziji13', value: 520 },
  { name: 'ziji14', value: 520 },
];
function createLineChart() {
  // 合并配置选项
  const chartOptions = adapterChart({
    type: 'line',
    data: {
      list: chartList,
    },
    theme: 'data-screen-theme',
  });
  const { renderEcharts } = useEcharts(lineChartRef);
  renderEcharts(chartOptions);
}
function createBarChart() {
  // 合并配置选项
  const chartOptions = adapterChart({
    type: 'bar',
    data: {
      list: chartList,
    },
    theme: 'data-screen-theme',
  });
  const { renderEcharts } = useEcharts(barChartRef);
  renderEcharts(chartOptions);
}
function createPieChart() {
  // 合并配置选项
  const chartOptions = adapterChart({
    type: 'pie',
    data: {
      list: chartList,
    },
    theme: 'data-screen-theme',
  });
  const { renderEcharts } = useEcharts(pieChartRef);
  renderEcharts(chartOptions);
}
// 生命周期钩子
onMounted(() => {
  createLineChart();
  createBarChart();
  createPieChart();
});
</script>

<template>
  <EchartsUI ref="lineChartRef"></EchartsUI>
  <EchartsUI ref="barChartRef"></EchartsUI>
  <EchartsUI ref="pieChartRef"></EchartsUI>
</template>

<style scoped></style>
