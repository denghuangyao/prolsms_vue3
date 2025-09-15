import { computed } from 'vue';

export interface ProgressBarConfig {
  num: number; //栅格数量
  backColor?: string; //背景颜色
  distance: number; //栅格间距百分比，单位是%
  preColor?: string;
  suffixColor?: string;
}
// 进度条网格组件逻辑层
export function useProgressbarGrid(bar: ProgressBarConfig) {
  // 每一个栅格比例(100%)
  let perGridPercent = 100 / bar.num;
  // 完整渲染的栅格个数
  const perGridWidth = computed(() => {
    let width = Number(((100 - bar.distance) / bar.num).toFixed(2));
    console.log('perGridWidth', width);
    return width;
  });
  const getRenderGridNum = (valuePercent: number) => {
    return Math.floor(valuePercent / perGridPercent);
  };
  // 不完整渲染的栅格剩余比例(1)
  const getRemainingGridPercent = (valuePercent: number) => {
    return (valuePercent - getRenderGridNum(valuePercent) * perGridPercent) / perGridPercent;
  };
  // 渲染进度条背景颜色
  const renderBack = (i: number, valuePercent: number) => {
    let remainingGridPercent = getRemainingGridPercent(valuePercent); //剩余栅格比例(1)
    let renderGridNum = getRenderGridNum(valuePercent); //完整渲染的栅格个数
    console.log(
      'renderBack-当前值百分比-',
      valuePercent,
      '-完整渲染格子数',

      renderGridNum,
      '-剩余格子比例',
      remainingGridPercent,
    );
    if (remainingGridPercent === 0) {
      if (i <= renderGridNum) {
        return 'transparent';
      } else {
        return `${bar.backColor}`;
      }
    } else {
      if (i <= renderGridNum) {
        return 'transparent';
      } else if (i === renderGridNum + 1) {
        return `linear-gradient(to right,transparent ${remainingGridPercent * 100}%,${
          bar.backColor
        } ${(1 - remainingGridPercent) * 100}%)`;
      } else {
        return `${bar.backColor}`;
      }
    }
  };
  const renderProgressBar = (i: number) => {
    return `linear-gradient(to right,${bar.preColor},${bar.suffixColor}) ${
      (i - 1) * perGridWidth.value
    }% / ${bar.num * 100 + '%'} no-repeat`;
  };
  return {
    renderBack,
    perGridWidth,
    renderProgressBar,
  };
}
