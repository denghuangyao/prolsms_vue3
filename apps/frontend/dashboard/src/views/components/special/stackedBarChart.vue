<script setup lang="ts">
import { EchartsUI, type EchartsUIType, useEcharts } from '@dhy/plugins/echarts';
import { ref, onMounted } from 'vue';
import { adapterChart } from '@/utils/chartAdapter';
import { $pxByScreenW } from '@/utils/screen';
const stackedBarChartRef = ref<EchartsUIType>();
let chartList = ref([
  { x: '技术部', y1: 100, y2: 200, y3: 300, y4: 250 },
  { x: '测试部', y1: 200, y2: 100, y3: 150, y4: 200 },
  { x: '产品部', y1: 300, y2: 250, y3: 200, y4: 150 },
  { x: '销售部', y1: 40, y2: 50, y3: 60, y4: 70 },
  { x: '行政部', y1: 100, y2: 150, y3: 200, y4: 200 },
  { x: '后勤部', y1: 50, y2: 100, y3: 150, y4: 200 },
  { x: '财务部', y1: 80, y2: 120, y3: 160, y4: 180 },
  { x: '人事部', y1: 90, y2: 110, y3: 130, y4: 140 },
  { x: '市场部', y1: 70, y2: 80, y3: 90, y4: 100 },
  { x: '研发部', y1: 60, y2: 70, y3: 80, y4: 90 },
  { x: '运营部', y1: 30, y2: 40, y3: 50, y4: 60 },
  { x: '客服部', y1: 20, y2: 30, y3: 40, y4: 50 },
  { x: '法务部', y1: 10, y2: 20, y3: 30, y4: 40 },
  { x: 'IT部', y1: 120, y2: 130, y3: 140, y4: 150 },
  { x: '设计部', y1: 110, y2: 120, y3: 130, y4: 140 },
  { x: '运营支持部', y1: 130, y2: 140, y3: 150, y4: 160 },
  { x: '战略部', y1: 140, y2: 150, y3: 160, y4: 170 },
  { x: '公共关系部', y1: 150, y2: 160, y3: 170, y4: 180 },
  { x: '质量部', y1: 160, y2: 170, y3: 180, y4: 190 },
  { x: '安全部', y1: 170, y2: 180, y3: 190, y4: 200 },
  { x: '采购部', y1: 180, y2: 190, y3: 200, y4: 210 },
  { x: '物流部', y1: 190, y2: 200, y3: 210, y4: 220 },
  { x: '行政支持部', y1: 200, y2: 210, y3: 220, y4: 230 },
  { x: '培训部', y1: 210, y2: 220, y3: 230, y4: 240 },
  { x: '信息技术部', y1: 220, y2: 230, y3: 240, y4: 250 },
  { x: '数据分析部', y1: 230, y2: 240, y3: 250, y4: 260 },
  { x: '客户服务部', y1: 240, y2: 250, y3: 260, y4: 270 },
  { x: '业务发展部', y1: 250, y2: 260, y3: 270, y4: 280 },
  { x: '战略规划部', y1: 260, y2: 270, y3: 280, y4: 290 },
  { x: '风险管理部', y1: 270, y2: 280, y3: 290, y4: 300 },
  { x: '合规部', y1: 280, y2: 290, y3: 300, y4: 310 },
  { x: '品牌部', y1: 290, y2: 300, y3: 310, y4: 320 },
  { x: '公关部', y1: 300, y2: 310, y3: 320, y4: 330 },
  { x: '创新部', y1: 310, y2: 320, y3: 330, y4: 340 },
  { x: '战略合作部', y1: 320, y2: 330, y3: 340, y4: 350 },
  { x: '国际业务部', y1: 330, y2: 340, y3: 350, y4: 360 },
  { x: '企业发展部', y1: 340, y2: 350, y3: 360, y4: 370 },
  { x: '社会责任部', y1: 350, y2: 360, y3: 370, y4: 380 },
  { x: '可持续发展部', y1: 360, y2: 370, y3: 380, y4: 390 },
  { x: '数字化转型部', y1: 370, y2: 380, y3: 390, y4: 400 },
  { x: '智能化部', y1: 380, y2: 390, y3: 400, y4: 410 },
  { x: '云计算部', y1: 390, y2: 400, y3: 410, y4: 420 },
  { x: '大数据部', y1: 400, y2: 410, y3: 420, y4: 430 },
  { x: '人工智能部', y1: 410, y2: 420, y3: 430, y4: 440 },
  { x: '区块链部', y1: 420, y2: 430, y3: 440, y4: 450 },
  { x: '物联网部', y1: 430, y2: 440, y3: 450, y4: 460 },
  { x: '5G通信部', y1: 440, y2: 450, y3: 460, y4: 470 },
  { x: '网络安全部', y1: 450, y2: 460, y3: 470, y4: 480 },
  { x: '信息安全部', y1: 460, y2: 470, y3: 480, y4: 490 },
  { x: '数据安全部', y1: 470, y2: 480, y3: 490, y4: 500 },
  { x: '应用开发部', y1: 480, y2: 490, y3: 500, y4: 510 },
  { x: '系统集成部', y1: 490, y2: 500, y3: 510, y4: 520 },
  { x: '技术支持部', y1: 500, y2: 510, y3: 520, y4: 530 },
  { x: '客户关系部', y1: 510, y2: 520, y3: 530, y4: 540 },
  { x: '售后服务部', y1: 520, y2: 530, y3: 540, y4: 550 },
  { x: '市场营销部', y1: 530, y2: 540, y3: 550, y4: 560 },
  { x: '销售支持部', y1: 540, y2: 550, y3: 560, y4: 570 },
  { x: '业务运营部', y1: 550, y2: 560, y3: 570, y4: 580 },
  { x: '财务管理部', y1: 560, y2: 570, y3: 580, y4: 590 },
  { x: '人力资源部', y1: 570, y2: 580, y3: 590, y4: 600 },
  { x: '行政管理部', y1: 580, y2: 590, y3: 600, y4: 610 },
]);
function createLineChart() {
  // 合并配置选项
  const chartOptions = adapterChart({
    type: 'bar',
    data: {
      nameKey: 'x',
      valueKey: 'y1,y2,y3,y4',
      seriesName: '整间预约,工位预约,仪器预约,总的实验室预约',
      list: chartList.value,
    },
    theme: 'data-screen-theme',
    grid: {
      top: '10%',
      bottom: '15%',
    },
    dataZoom: [
      //滚动条
      {
        show: true,
        type: 'slider',
        realtime: true,
        startValue: 0,
        endValue: 4,
        xAxisIndex: [0],
        bottom: '5%',
        left: '12%',
        right: '12%',
        height: $pxByScreenW(15),
        handleSize: $pxByScreenW(20),
        handleStyle: {
          color: '#009edc',
          borderWidth: $pxByScreenW(2),
          borderColor: 'rgba(45, 221, 237,1)',
        },
        moveHandleSize: 0,
        borderColor: 'rgba(0,0,0,0)',
        fillerColor: 'rgba(45, 221, 237,0.2)',
        textStyle: {
          fontSize: $pxByScreenW(14),
          color: 'rgba(255,255,255,0.85)',
        },
        emphasis: {
          handleStyle: {
            borderColor: '#40b2bb',
          },
        },
      },
    ],
  });
  const { renderEcharts } = useEcharts(stackedBarChartRef);
  renderEcharts(chartOptions);
}
// 生命周期钩子
onMounted(() => {
  createLineChart();
});
</script>
<template>
  <div class="sub-container">
    <block-title title="各部门实验室预约情况" />
    <empty :isEmpty="!chartList.length">
      <EchartsUI class="chart-container" ref="stackedBarChartRef"></EchartsUI>
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
