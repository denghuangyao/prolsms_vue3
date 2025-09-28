<script lang="ts" setup>
import { ref } from 'vue';
const linkStatusEnum = ref({
  正常: 'primary',
  在线: 'success',
  离线: 'info',
  故障: 'danger',
  未连接: 'warning',
});
let headerList: any = ref([
  { label: '排行', prop: 'idx', type: 'idx', width: '55' },
  { label: '房间名称', prop: 'fangjianName', width: '85' },
  { label: '探头名称', prop: 'mingcheng', width: '85' },
  { label: '连接状态', prop: 'lianjie', width: '85', type: 'tag', enum: linkStatusEnum.value },
  { label: '实时数据', prop: 'shuju', width: '135' },
]);
let dataList: any = ref([
  {
    fangjianName: '实验室501',
    mingcheng: '温度探头',
    lianjie: '在线',
    shuju: '12℃',
  },
  {
    fangjianName: '实验室401',
    mingcheng: '湿度探头',
    lianjie: '未连接',
    shuju: '61%RH',
  },
  {
    fangjianName: '实验室301',
    mingcheng: '漏水探头',
    lianjie: '离线',
    shuju: '无',
  },
  {
    fangjianName: '实验室702',
    mingcheng: 'TVOC探头',
    lianjie: '故障',
    shuju: '--',
  },
  {
    fangjianName: '实验室201',
    mingcheng: 'TVOC探头',
    lianjie: '在线',
    shuju: '0.04mg/m3',
  },
  {
    fangjianName: '实验室101',
    mingcheng: '二氧化碳探头',
    lianjie: '正常',
    shuju: '800ppm',
  },
  {
    fangjianName: '实验室703',
    mingcheng: '温度探头',
    lianjie: '在线',
    shuju: '12℃',
  },
  {
    fangjianName: '实验室801',
    mingcheng: '温度探头',
    lianjie: '离线',
    shuju: '18℃',
  },
  {
    fangjianName: '实验室802',
    mingcheng: '温度探头',
    lianjie: '未连接',
    shuju: '30℃',
  },
]);
</script>
<template>
  <div class="sub-container">
    <block-title title="监测实时数据" />
    <scroll-table class="chart-container" :dataList="dataList" :tableHeaders="headerList" />
  </div>
</template>
<style lang="scss" scoped>
.sub-container {
  display: flex;
  flex-direction: column;
  max-height: 33%;
  .chart-container {
    height: calc(100% - #{clampPx(40)} - #{clampPx(12)});
  }
}
</style>
