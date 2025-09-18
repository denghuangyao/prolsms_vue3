<script setup lang="ts">
import { EchartsUI, type EchartsUIType, useEcharts } from '@dhy/plugins/echarts';
import { ref, onMounted } from 'vue';
import { adapterChart } from '@/utils/chartAdapter';
const pieChartRef = ref<EchartsUIType>();

let activeKey = ref('CAIGOUPAIHANG');
let menuList = ref<any>([
  { label: '采购', key: 'CAIGOUPAIHANG', labelKey: '' },
  { label: '库存', key: 'KUCUNPAIHANG', labelKey: '' },
  { label: '入库', key: 'RUKUPAIHANG', labelKey: '' },
  { label: '出库', key: 'CHUKUPAIHANG', labelKey: '' },
]);
let chartList = ref<any>([
  { name: '技术部', value: 100 },
  { name: '测试部', value: 200 },
  { name: '产品部', value: 300 },
  { name: '销售部', value: 400 },
  { name: '行政部', value: 500 },
]);
function selectTabChange(key: any) {
  // console.log('whp_shuliangpaihang-selectChange----', key);
  activeKey.value = key;
}
function createPieChart() {
  // 合并配置选项
  const chartOptions = adapterChart({
    type: 'pie',
    data: {
      list: chartList.value,
    },
    theme: 'data-screen-theme',
  });
  const { renderEcharts } = useEcharts(pieChartRef);
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
      title="物资数量排行"
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
