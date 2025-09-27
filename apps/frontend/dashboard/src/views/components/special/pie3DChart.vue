<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { EchartsUI } from '@dhy/plugins/echarts';
import { use3DChart } from '@/components/echarts-gl/use-3d-chart';
const pie3DChartRef = ref(null);
let chartList = ref([
  { name: '草稿', value: 100 },
  { name: '审核中', value: 200 },
  { name: '审核通过', value: 300 },
  { name: '审核拒绝', value: 400 },
  { name: '已完成', value: 500 },
]);
onMounted(() => {
  use3DChart(pie3DChartRef, chartList.value);
});
</script>
<template>
  <div class="sub-container">
    <block-title title="实验室流程申请" />
    <empty :isEmpty="!chartList.length">
      <EchartsUI ref="pie3DChartRef"></EchartsUI>
    </empty>
  </div>
</template>
<style lang="scss" scoped>
.sub-container {
  display: flex;
  flex-direction: column;
  // height: 100%;
  .chart-container {
    flex: 1;
  }
}
</style>
