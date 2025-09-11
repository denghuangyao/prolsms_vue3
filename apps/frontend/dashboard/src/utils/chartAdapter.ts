// 图表数据适配器，适配echarts图表数据格式

import { type ECOption, echarts } from '@dhy/plugins/echarts';
import { changeStrBychar, randomHexColor } from './chartHelper';
import { getTheme, ThemeType } from './chartTheme';
// 统一适配图表数据格式，后续根据图表类型进行适配
type ChartDataType<T> = {
  list: T[]; //图表数据
  nameKey?: string; //图表名称字段
  valueKey?: string; //图表值字段
};
//图表配置项: 图表类型、数据、主题配置项 + echarts基础配置项
type ChartOptions<T> = {
  type: keyof typeof adapterMap; //图表类型
  data: ChartDataType<T>; //图表数据
  theme: ThemeType; //图表主题
} & ECOption;
/**
 * 抽取基础项配置,统一图表样式
 * @param options
 * @returns
 */
function generateBaseOption(options: ECOption = {}): ECOption {
  const { title = '', xAxisName = '', yAxisName = '', theme = {} } = options;
  // 基础配置，后续根据图表类型进行适配
  return {
    tooltip: {
      confine: true, //鼠标首次移入屏幕会闪动，全屏会出现滚动条
      textStyle: {
        //设置图例文字样式
        fontSize: 14,
      },
    },
  };
}
/**
 * 适配折线图的Echarts配置项
 * @param data
 * @param options
 * @returns
 */
const adaptLineChart = <T = any>(data: ChartDataType<T>, options: ECOption = {}): ECOption => {
  let { list = [], nameKey = 'name', valueKey = 'value' } = data;
  let xAxisData: any = list.map((i: any) => i[nameKey]);
  let seriesData: any = list.map((i: any) => i[valueKey]);
  let baseOptions = generateBaseOption(options);
  return {
    ...baseOptions,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0,191,220,0.3)' },
            { offset: 1, color: 'rgba(0,158,220,0.3)' },
          ]),
        },
      },
      renderMode: 'html',
      formatter(params: any) {
        const item = params[0];
        let name = item.axisValue;
        let value = item.value;
        let marker: any = `<span class="wl-custom-tooltip-markerStyle" style="background:linear-gradient( 180deg, #00BFDC 16%, #009EDC 100%);"></span>`;
        return `<div class="wl-custom-tooltip-namestyle">${marker}${name}</div><div class="wl-custom-tooltip-valuestyle wl-pl16">${value}</div>`;
      },
      padding: [9, 16],
      extraCssText: 'box-shadow: inset 0px 0px 4px 0px #66DFF4;border-radius:4px',
      backgroundColor: '#001C32',
      borderColor: '#66DFF4',
      borderWidth: 1,
    },
    legend: {
      show: false,
    },
    grid: {
      outerBounds: {
        left: 15, // 考虑Y轴标签
        right: 15,
        top: 15,
        bottom: 7, // 考虑X轴标签
      },
      left: '3%', //相当于距离左边效果:padding-left
      top: '15%', //相当于距离上边效果:padding-top
      bottom: '7%',
      right: '3%', //离容器右侧的距离。
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      boundaryGap: false, //两边留白策略
      axisTick: {
        show: true, //刻度线
        inside: true,
        lineStyle: {
          color: '#D8D8D8',
        },
      },
      axisLabel: {
        //x轴文字的配置
        margin: 10, //刻度标签与轴线之间的距离
        color: '#CDCDCD',
        fontSize: 14,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.15)', //x轴的颜色
        },
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false, //刻度线
      },
      axisLine: {
        show: false, //轴线
      },
      axisLabel: {
        margin: 10, //刻度标签与轴线之间的距离
        //y轴文字的配置
        color: '#CDCDCD',
        fontSize: 14,
      },
      splitLine: {
        //网格线
        lineStyle: {
          type: 'solid', //设置网格线类型 dotted：虚线 solid:实线
          color: 'rgba(255,255,255,0.15)',
        },
      },
    },
    series: [
      {
        type: 'line',
        data: seriesData,
        symbol: 'emptyCircle',
        symbolSize: 6,
        smooth: true,
        animation: true, // 开启动画
        animationDuration: 5000, //从左到右动画
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#00BFDC', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#009EDC', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        areaStyle: {
          color: 'rgba(47,211,248,0.3)',
        },
      },
    ],
  };
};
/**
 * 适配柱状图的Echarts配置项
 * @param data 数据源,对象数组
 * @param options
 * @returns
 */
const adaptBarChart = <T = any>(data: ChartDataType<T>, options: ECOption = {}): any => {
  let { list = [], nameKey = 'name', valueKey = 'value' } = data;
  let xAxisData: any = list.map((i: any) => i[nameKey]);
  let seriesData: any = list.map((i: any) => i[valueKey]);
  let baseOptions = generateBaseOption(options);
  console.log('baseOptions', baseOptions, xAxisData, seriesData);
  return {
    ...baseOptions,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
      },
      renderMode: 'html',
      formatter(params: any) {
        const item = params[0];
        let name = item.axisValue;
        let value = item.value;
        let marker: any = `<span class="wl-custom-tooltip-markerStyle" style="background:#3779FF;"></span>`;
        return `<div class="wl-custom-tooltip-namestyle">${marker}${name}</div><div class="wl-custom-tooltip-valuestyle wl-pl16">${value}</div>`;
      },
      padding: [9, 16],
      extraCssText: 'box-shadow: inset 0px 0px 4px 0px #66DFF4;border-radius:4px',
      backgroundColor: '#001C32',
      borderColor: '#66DFF4',
      borderWidth: 1,
    },
    grid: {
      left: '3%', //相当于距离左边效果:padding-left
      top: '15%', //相当于距离上边效果:padding-top
      bottom: '7%',
      right: '3%', //离容器右侧的距离。
      outerBounds: {},
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#2F5A8D',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          //x轴文字的配置
          margin: 10, //刻度标签与轴线之间的距离
          interval: 0,
          formatter(params: any) {
            if (params.length > 6) {
              let str1 = params.substr(0, 6);
              let len = params.length > 11 ? 11 : params.length;
              let str2 = params.substr(5, len);
              return len >= 11 ? str1 + `\n` + str2 + '...' : str1 + `\n` + str2;
            }
            return params;
          },
          fontSize: 14,
          color: '#CDCDCD',
          lineHeight: 18,
        },
        boundaryGap: true,
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: {
          show: false, //刻度线
        },
        axisLine: {
          show: false, //轴线
        },
        axisLabel: {
          margin: 10, //刻度标签与轴线之间的距离
          //y轴文字的配置
          color: '#CDCDCD',
          fontSize: 14,
        },
        splitLine: {
          //网格线
          lineStyle: {
            type: 'dashed', //设置网格线类型 dotted：虚线 solid:实线
            color: 'rgba(255,255,255,0.15)',
          },
        },
      },
    ],
    series: [
      {
        type: 'bar',
        barWidth: 28,
        animationDuration: 10000, //柱状图缓缓上升效果
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#00BFDC', // 亮色
              },
              {
                offset: 1,
                color: '#009EDC', // 暗色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        data: seriesData,
      },
    ],
  };
};
/**
 * 适配饼图的ECharts配置项
 * @param data 数据源,对象数组 [{name: '', value: ''}])
 */
const adaptPieChart = <T = any>(data: ChartDataType<T>, options: ECOption = {}): ECOption => {
  let { color }: any = options;
  console.log('adaptPieChart,--theme', color);
  let { list, nameKey = 'name', valueKey = 'value' } = data;
  let seriesData = list.map((i: any) => {
    return {
      name: i[nameKey],
      value: i[valueKey],
    };
  });
  seriesData = seriesData.filter((i: any) => Number(i.value));
  seriesData.forEach((i: any, idx: any) => {
    i.name = `${i.name}_idx_${idx}`;
  });
  let isShowLegend = list.length < 5; //数据少于5时需要显示图例;
  let colorList = color || [];
  if (colorList.length < list.length) {
    list.forEach((item: any) => {
      colorList.push(randomHexColor());
    });
  }
  return {
    tooltip: {
      transitionDuration: 0, //防止鼠标移入时页面出现抖动
      trigger: 'item',
      renderMode: 'html',
      formatter(params: any) {
        const item = params;
        let idx = item.data.name.lastIndexOf('_idx_');
        let _name = item.data.name.slice(0, idx);
        let value = item.data.value;
        let marker: any = `<span class="wl-custom-tooltip-markerStyle" style="background:${item.color}"></span>`;
        return `<div class="wl-custom-tooltip-namestyle">${marker}${_name}</div><div class="wl-custom-tooltip-valuestyle wl-pl16">${value}</div>`;
      },
      padding: [9, 16],
      extraCssText: 'box-shadow: inset 0px 0px 4px 0px #66DFF4;border-radius:4px',
      backgroundColor: '#001C32',
      borderColor: '#66DFF4',
      borderWidth: 1,
    },
    color: colorList,
    grid: {
      outerBounds: {},
    },
    legend: {
      show: isShowLegend,
      selectedMode: false,
      icon: 'roundRect',
      type: 'scroll',
      pageIconColor: '#CDCDCD',
      pageTextStyle: {
        color: '#CDCDCD',
      },
      right: 'center',
      orient: 'horizontal',
      bottom: '3%',
      width: '90%',
      itemGap: 10,
      itemWidth: 9,
      itemHeight: 8,
      textStyle: {
        //设置图例文字样式
        fontSize: 14,
        color: '#CDCDCD',
        padding: [0, 0, 0, 2],
        lineHeight: 14, //防止图例文字被挡一部分
      },
      formatter: (paramName: any) => {
        // console.log("-params-legend-",paramName)
        let idx = paramName.lastIndexOf('_idx_');
        let name = paramName.slice(0, idx);
        let _name = changeStrBychar(name, 18);
        return _name;
      },
    },
    series: [
      {
        type: 'pie',
        avoidLabelOverlap: true,
        center: isShowLegend ? ['50%', '43%'] : ['50%', '50%'],
        minAngle: 15, //最小角度
        startAngle: 100, //起始角度
        animationDuration: 5000, //慢慢转动效果
        stillShowZeroSum: false,
        labelLine: {
          length: 5,
        },
        label: {
          fontSize: 14,
          width: 5,
          ellipsis: '...',
          overflow: 'truncate',
          formatter: (params: any) => {
            const item = params;
            // console.log("--formatter-params",params)
            let idx = item.data.name.lastIndexOf('_idx_');
            let name = item.data.name.slice(0, idx);
            let _name = changeStrBychar(name, 18);
            // 字数超过7个的隐藏
            if (_name.length > 7) {
              _name = _name.slice(0, 7) + '...';
            }
            let value = item.data.value;
            return `{name|${_name}} {value|${value}}`;
          },
          rich: {
            value: {
              color: '#FFFFFF',
              fontSize: 14,
              lineHeight: 14,
            },
            name: {
              color: '#FFFFFF',
              fontSize: 14,
              lineHeight: 14,
            },
          },
        },
        emphasis: {
          disabled: false, //是否关闭扇区高亮效果
          scale: false, //扇区是否缩放
        },
        itemStyle: {
          borderWidth: 0,
          borderColor: 'transparent',
          color: (params: any) => {
            return colorList[params.dataIndex];
          },
        },
        data: seriesData,
      },
    ],
  };
};

const adaptStackedLineChart = <T = any>(
  data: ChartDataType<T>,
  options: ECOption = {},
): ECOption => {
  return {};
};
const adapterMap = {
  line: adaptLineChart,
  bar: adaptBarChart,
  pie: adaptPieChart,
};
export function adapterChart<T = any>(options: ChartOptions<T>) {
  const { type = 'line', data, theme = 'bussiness-white', ...otherOptions } = options;
  const adapter = adapterMap[type];
  if (adapter) {
    // 获取主题和适配器
    const themeConfig = getTheme(theme);
    // 合并配置选项
    const chartOptions = { ...otherOptions, ...themeConfig };
    // 使用适配器生成Echarts配置
    const ecOption = adapter(data, chartOptions);
    return ecOption;
  } else {
    throw new Error(`No adapter found for chart type: ${type}`);
  }
}
