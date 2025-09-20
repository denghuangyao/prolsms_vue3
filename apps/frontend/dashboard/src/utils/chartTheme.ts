import { getLinearGradient } from './chartHelper';

const normalBarColor = getLinearGradient('#00BFDC', '#009EDC');
const cyanBarColor = getLinearGradient('#2FD3F9', '#0086BB');
const blueBarColor = getLinearGradient('#50A5FF', '#007BFF');
const purpleBarColor = getLinearGradient('#89A8FF', '#4F57E8');

//蓝色渐变色
const blueLineColor = getLinearGradient('#216BC6', '#124B99', '#093377', 'transparent');

//青色渐变色
const cyanLineColor = getLinearGradient('#1679B3', '#15629B', '#135089', 'transparent');

//绿色渐变色
const greenLineColor = getLinearGradient('#2AA179', '#228282', '#175983', 'transparent');

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
    areaColor: blueLineColor,
  },
  green: {
    lineColor: '#2AA179',
    areaColor: greenLineColor,
  },
  cyan: {
    lineColor: '#1679B3',
    areaColor: cyanLineColor,
  },
};
export const seriesBarColor = {
  normal: normalBarColor,
  cyan: cyanBarColor,
  blue: blueBarColor,
  purple: purpleBarColor,
};
