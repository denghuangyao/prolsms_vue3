import { echarts } from '@dhy/plugins/echarts';
//蓝色渐变色
const blueLinearGradientColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  {
    offset: 0,
    color: '#216BC6',
  },
  {
    offset: 0.35,
    color: '#124B99',
  },
  {
    offset: 0.7,
    color: '#093377',
  },
  {
    offset: 1,
    color: 'transparent',
  },
]);
//青色渐变色
const cyanLinearGradientColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  {
    offset: 0,
    color: '#1679B3',
  },
  {
    offset: 0.35,
    color: '#15629B',
  },
  {
    offset: 0.7,
    color: '#135089',
  },
  {
    offset: 1,
    color: 'transparent',
  },
]);
//绿色渐变色
const greenLinearGradientColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  {
    offset: 0,
    color: '#2AA179',
  },
  {
    offset: 0.35,
    color: '#228282',
  },
  {
    offset: 0.7,
    color: '#175983',
  },
  {
    offset: 1,
    color: 'transparent',
  },
]);
const dataScreenTheme = {
  color: ['#005CFA', '#A3FDB0', '#0CD9B5', '#F9C65A', '#335F6A', '#1BE0FE', '#617589', '#2E7EF8'],
};
const bussinessTheme = {};
const safetyTheme = {};
const ThemeMap = {
  // 主题映射表，可以根据需要添加更多主题
  'data-screen-theme': dataScreenTheme,
  'bussiness-white': bussinessTheme,
  'safety-dark': safetyTheme,
};
export type ThemeType = keyof typeof ThemeMap;
export const getTheme = (theme: ThemeType) => {
  return ThemeMap[theme] || bussinessTheme; // 默认返回白屏主题;
};
export const seriesLineColor = {
  blue: {
    lineColor: '#216BC6',
    areaColor: blueLinearGradientColor,
  },
  green: {
    lineColor: '#2AA179',
    areaColor: greenLinearGradientColor,
  },
  cyan: {
    lineColor: '#1679B3',
    areaColor: cyanLinearGradientColor,
  },
};
