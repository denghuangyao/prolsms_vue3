<script setup lang="ts">
import { EchartsUI, type EchartsUIType, useEcharts } from '@dhy/plugins/echarts';
import { ref, onMounted, computed } from 'vue';
import { adapterChart } from '@/utils/chartAdapter';
const pieChartRef = ref<EchartsUIType>();

let activeKey = ref('HUANJINGJIANCE');
let menuList = ref<any>([
  { label: '环境监测', key: 'HUANJINGJIANCE', labelKey: '' },
  { label: 'AI监测', key: 'AIJIANCE', labelKey: '' },
  { label: '设备采购', key: 'SHEBEICAIGOU', labelKey: '' },
  { label: '设备分布', key: 'SHEBEIFENBU', labelKey: '' },
]);
let chartData = ref<any>({
  HUANJINGJIANCE: [
    { name: '在线', value: 200 },
    { name: '故障', value: 150 },
    { name: '离线', value: 120 },
    { name: '报废', value: 50 },
    { name: '维修中', value: 30 },
    { name: '待维修', value: 20 },
  ],
  AIJIANCE: [
    { name: '在线', value: 300 },
    { name: '故障', value: 100 },
    { name: '离线', value: 80 },
    { name: '报废', value: 40 },
    { name: '维修中', value: 20 },
    { name: '待维修', value: 10 },
  ],
  SHEBEICAIGOU: [
    { name: '在线', value: 400 },
    { name: '故障', value: 200 },
    { name: '离线', value: 160 },
    { name: '报废', value: 70 },
    { name: '维修中', value: 40 },
    { name: '待维修', value: 30 },
  ],
  SHEBEIFENBU: [
    { name: '在线', value: 500 },
    { name: '故障', value: 300 },
    { name: '离线', value: 240 },
    { name: '报废', value: 100 },
    { name: '维修中', value: 60 },
    { name: '待维修', value: 50 },
  ],
});
let chartList = computed(() => {
  return chartData.value[activeKey.value] || [];
});
const { renderEcharts } = useEcharts(pieChartRef);
function selectTabChange(key: any) {
  activeKey.value = key;
  createPieChart();
}
function createPieChart() {
  // 合并配置选项
  const chartOptions = adapterChart({
    type: 'pie',
    data: {
      list: chartList.value,
    },
    legend: {
      show: true,
    },
    theme: 'data-screen-theme',
  });
  renderEcharts(chartOptions);
}
// 生命周期钩子
onMounted(() => {
  createPieChart();
});
</script>
<template>
  <div class="sub-container">
    <block-title
      autoCarousel
      title="硬件概况"
      @selectTabChange="selectTabChange"
      :menuList="menuList"
      :activeKey="activeKey"
    />
    <empty :isEmpty="!chartList.length">
      <EchartsUI ref="pieChartRef"></EchartsUI>
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
