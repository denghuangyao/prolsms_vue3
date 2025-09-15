<script lang="ts" setup>
import { ref } from 'vue';
import { useSorted } from '@vueuse/core';
const list = ref([
  { label: '技术部', value: 100 },
  { label: '测试部', value: 200 },
  { label: '产品部', value: 300 },
  { label: '销售部', value: 400 },
  { label: '行政部', value: 500 },
  { label: '财务部', value: 200 },
  { label: '后勤部', value: 500 },
]);
let dataList = useSorted(list.value, (a: any, b: any) => b.value - a.value);
</script>
<template>
  <div class="sub-container">
    <block-title title="任务数量排行" />
    <rank-bar class="chart-container" :dataList="dataList" isAutoScroll />
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
