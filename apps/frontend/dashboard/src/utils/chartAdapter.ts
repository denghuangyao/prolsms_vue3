// 图表数据适配器，适配echarts图表数据格式

import { type ECOption, echarts } from '@dhy/plugins/echarts';
import {
  changeStrBychar,
  randomHexColor,
  generateDataSet,
  randomHexAndRgbaColor,
  getLinearGradient,
} from './chartHelper';
import { getTheme, type ThemeType, seriesLineColor, seriesBarColor } from './chartTheme';
import { $pxByScreenW } from './screen';
import { generate3dBarSeries } from '@/components/echarts-gl/bar-3d-chart';

// 统一适配图表数据格式，后续根据图表类型进行适配
type ChartDataType<T> = {
  list: T[]; //图表数据
  nameKey?: string; //图表名称字段
  valueKey?: string; //图表值字段
  seriesName?: string; //图表系列名称,多条线图用逗号分隔
};
//图表配置项: 图表类型、数据、主题配置项 + echarts基础配置项
type ChartOptions<T> = {
  type: keyof typeof adapterMap; //图表类型
  data: ChartDataType<T>; //图表数据
  theme: ThemeType; //图表主题
} & ECOption;
//提示信息框的符号标记(小方框)
export const TooltipMarkerHTML = (name: string, value: string | number, color?: string): string => {
  let markerColor = color || 'linear-gradient( 180deg, #00BFDC 16%, #009EDC 100%)';
  let marker: any = `<span class="wl-custom-tooltip-markerStyle" style="background:${markerColor};"></span>`;
  return `<div class="wl-custom-tooltip-namestyle">${marker}${name}</div><div class="wl-custom-tooltip-valuestyle wl-pl16">${value}</div>`;
};
const TooltipMultiMarkerHTML = (name: string, params: any[]): string => {
  if (params.length === 0) return '';
  //每一列称为一个『维度』。encode: { x: [0], y: [1] }//x轴对应dataset第一列（0维度），y轴对应dataset第二列（1维度）
  let contentHTML: any = `<div class="wl-custom-tooltip-namestyle">${name}</div>`;
  params.forEach((item: any) => {
    let marker: any = `<span class="wl-custom-tooltip-markerStyle" style="background:${item.color};"></span>`;
    contentHTML += `<div class="wl-custom-tooltip-valuestyle">${marker}${item.seriesName}：${item.data[item.encode.y]}</div>`;
  });
  return contentHTML;
};
/**
 * 抽取基础项配置,统一图表样式
 * @param options options: ECOption = {}
 * @returns
 */
function generateBaseOption(options: ECOption = {}): ECOption {
  console.log('options', options);
  // const { title = '', xAxisName = '', yAxisName = '', theme = {} } = options;
  // 基础配置，后续根据图表类型进行适配
  return {
    ...options,
    tooltip: {
      confine: true, //是否将 tooltip 框限制在图表的区域内。
      transitionDuration: 0, //提示框浮层的移动动画过渡时间,单位s
      textStyle: {
        //设置图例文字样式
        fontSize: $pxByScreenW(14),
      },
      renderMode: 'html',
      padding: [9, 16],
      extraCssText: 'box-shadow: inset 0px 0px 4px 0px #66DFF4;border-radius:4px',
      backgroundColor: '#001C32',
      borderColor: '#66DFF4',
      borderWidth: $pxByScreenW(1),
    },
    legend: {
      type: 'scroll',
      width: '80%', //图例组件的图形宽度
      icon: 'roundRect',
      itemWidth: $pxByScreenW(9),
      itemHeight: $pxByScreenW(8),
      textStyle: {
        //设置图例文字样式
        fontSize: $pxByScreenW(14),
        color: '#CDCDCD',
        padding: [0, 0, 0, $pxByScreenW(2)],
        lineHeight: $pxByScreenW(14), //防止图例文字被挡一部分
      },
      selectedMode: true,
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
  let { list = [], nameKey = 'name', valueKey = 'value', seriesName = '未知' } = data;

  let seriesNum = valueKey.split(',').length;
  let colorList: any = [seriesLineColor.cyan, seriesLineColor.blue, seriesLineColor.green];
  if (colorList.length < seriesNum) {
    //颜色不够用随机生成
    let { hexColor, rgbaColor } = randomHexAndRgbaColor();
    list.forEach(() => {
      colorList.push({
        lineColor: hexColor,
        areaColor: rgbaColor,
      });
    });
  }
  let dataset = generateDataSet(list, nameKey, valueKey, seriesName);
  console.log('dataset-adaptLineChart', dataset);
  let seriesData: ECOption[] = [];
  for (let i = 0; i < seriesNum; i++) {
    seriesData.push({
      // name: '32423',
      type: 'line',
      symbol: 'emptyCircle',
      symbolSize: $pxByScreenW(6),
      smooth: true,
      animation: true, // 开启动画
      animationDuration: 5000, //从左到右动画
      itemStyle: {
        color: colorList[i].lineColor,
      },
      areaStyle: {
        color: colorList[i].areaColor,
      },
    });
  }
  let baseOptions = generateBaseOption(options);
  let customOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: seriesNum > 1 ? 'line' : 'none',
        lineStyle: {
          color: '#329abe',
          type: 'solid',
          width: $pxByScreenW(1),
        },
      },
      formatter(params: any) {
        const item = params[0];
        return params.length > 1
          ? TooltipMultiMarkerHTML(item.name, params)
          : TooltipMarkerHTML(item.axisValue, item.data[item.encode.y]);
      },
    },
    dataset,
    legend: {
      show: seriesNum > 1, //多条线图时显示图例
      right: $pxByScreenW(16),
      top: '4%',
      itemGap: $pxByScreenW(20),
    },
    grid: {
      // containLabel: true修改写法改为
      // 网格边框是否包含轴标签，默认只在刻度上显示。
      outerBoundsMode: 'same',
      outerBoundsContain: 'axisLabel',
      left: '3%', //相当于距离左边效果:padding-left
      top: '15%', //相当于距离上边效果:padding-top
      bottom: '7%',
      right: '3%', //离容器右侧的距离。
    },
    xAxis: {
      type: 'category',
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
        margin: $pxByScreenW(10), //刻度标签与轴线之间的距离
        color: '#CDCDCD',
        fontSize: $pxByScreenW(14),
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
        margin: $pxByScreenW(10), //刻度标签与轴线之间的距离
        //y轴文字的配置
        color: '#CDCDCD',
        fontSize: $pxByScreenW(14),
      },
      splitLine: {
        //网格线
        lineStyle: {
          type: 'solid', //设置网格线类型 dotted：虚线 solid:实线
          color: 'rgba(255,255,255,0.15)',
        },
      },
    },
    series: seriesData,
  } as ECOption;
  return echarts.util.merge(baseOptions, customOptions);
};
/**
 * 适配柱状图的Echarts配置项
 * @param data 数据源,对象数组
 * @param options
 * @returns
 */
const adaptBarChart = <T = any>(data: ChartDataType<T>, options: ECOption = {}): any => {
  let { list = [], nameKey = 'name', valueKey = 'value', seriesName = '未知' } = data;
  let seriesNum = valueKey.split(',').length;
  let colorList: any = [seriesBarColor.cyan, seriesBarColor.blue, seriesBarColor.purple];
  if (colorList.length < seriesNum) {
    //颜色不够用随机生成
    let { rgbaColor, hexColor } = randomHexAndRgbaColor(0.7);
    list.forEach(() => {
      colorList.push(getLinearGradient(hexColor, rgbaColor));
    });
  }
  let dataset = generateDataSet(list, nameKey, valueKey, seriesName);
  console.log('dataset-adaptBarChart', dataset);
  let seriesData: ECOption[] = [];
  for (let i = 0; i < seriesNum; i++) {
    seriesData.push({
      type: 'bar',
      barWidth: $pxByScreenW(28),
      animationDuration: 10000, //柱状图缓缓上升效果
      stack: 'total', //堆叠柱状图
      emphasis: {
        focus: 'series',
      },
      itemStyle: {
        color: colorList[i],
      },
    });
  }
  let baseOptions = generateBaseOption(options);
  console.log('baseOptions-adaptBarChart', baseOptions, seriesData);
  let customOptions: ECOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
      },
      formatter(params: any) {
        const item = params[0];
        return params.length > 1
          ? TooltipMultiMarkerHTML(item.name, params)
          : TooltipMarkerHTML(item.axisValue, item.data[item.encode.y]);
      },
    },
    grid: {
      // containLabel: true修改写法调整
      outerBoundsMode: 'same',
      outerBoundsContain: 'axisLabel',
      left: '3%', //相当于距离左边效果:padding-left
      top: '15%', //相当于距离上边效果:padding-top
      bottom: '7%',
      right: '3%', //离容器右侧的距离。
    },
    dataset,
    legend: {
      show: seriesNum > 1, //多条线图时显示图例
      right: $pxByScreenW(16),
      top: '2.8%',
      itemGap: $pxByScreenW(20),
    },
    xAxis: [
      {
        type: 'category',
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
          margin: $pxByScreenW(10), //刻度标签与轴线之间的距离
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
          fontSize: $pxByScreenW(14),
          color: '#CDCDCD',
          lineHeight: $pxByScreenW(18),
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
          margin: $pxByScreenW(10), //刻度标签与轴线之间的距离
          //y轴文字的配置
          color: '#CDCDCD',
          fontSize: $pxByScreenW(14),
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
    series: seriesData as never[],
  };
  return echarts.util.merge(baseOptions, customOptions);
};
/**
 * 适配饼图的ECharts配置项
 * @param data 数据源,对象数组 [{name: '', value: ''}])
 */
const adaptPieChart = <T = any>(data: ChartDataType<T>, options: ECOption = {}): ECOption => {
  console.log('adaptPieChart-options', options?.legend);
  let { color }: any = options;
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
  let isShowLegend =
    (Array.isArray(options?.legend) ? options.legend[0]?.show : (options?.legend as any)?.show) ??
    list.length <= 5; //数据少于5时需要显示图例;
  let colorList = color || [];
  if (colorList.length < list.length) {
    list.forEach(() => {
      colorList.push(randomHexColor());
    });
  }

  let baseOptions = generateBaseOption(options);
  let customOptions = {
    tooltip: {
      trigger: 'item',
      formatter(params: any) {
        const item = params;
        let idx = item.data.name.lastIndexOf('_idx_');
        let _name = item.data.name.slice(0, idx);
        let value = item.data.value;
        return TooltipMarkerHTML(_name, value, item.color);
      },
    },
    color: colorList,
    legend: {
      show: isShowLegend,
      type: 'scroll',
      pageIconColor: '#CDCDCD',
      pageTextStyle: {
        color: '#CDCDCD',
      },
      right: 'center',
      orient: 'horizontal',
      bottom: '3%',
      width: '90%',
      itemGap: $pxByScreenW(10),
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
        radius: ['35%', '58%'], //圆环图设置
        avoidLabelOverlap: true,
        center: isShowLegend ? ['50%', '43%'] : ['50%', '50%'],
        minAngle: $pxByScreenW(15), //最小角度
        startAngle: $pxByScreenW(100), //起始角度
        animationDuration: $pxByScreenW(5000), //慢慢转动效果
        stillShowZeroSum: false,
        labelLine: {
          length: $pxByScreenW(5),
        },
        label: {
          fontSize: $pxByScreenW(14),
          ellipsis: '...',
          overflow: 'truncate',
          rich: {
            value: {
              color: '#FFFFFF',
              fontSize: $pxByScreenW(14),
              lineHeight: $pxByScreenW(14),
            },
            name: {
              color: '#FFFFFF',
              fontSize: $pxByScreenW(14),
              lineHeight: $pxByScreenW(14),
            },
          },
          formatter: (params: any) => {
            const item = params;
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
        },
        // emphasis: {
        //   disabled: false, //是否关闭扇区高亮效果
        //   scale: false, //扇区是否缩放
        // },
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
  return echarts.util.merge(baseOptions, customOptions);
};
const adapt3DBarChart = <T = any>(data: ChartDataType<T>, options: ECOption = {}): ECOption => {
  let { list = [], nameKey = 'name', valueKey = 'value', seriesName = '未知' } = data;
  let seriesNum = valueKey.split(',').length;
  let colorList: any = ['#2FD3F9', '#66C9F2', '#80D1CD', '#9BD977', '#22beaf'];
  if (colorList.length < seriesNum) {
    //颜色不够用随机生成
    colorList.push(randomHexColor());
  }
  let dataset = generateDataSet(list, nameKey, valueKey, seriesName);
  console.log('dataset-adapt3DBarChart', dataset);
  let seriesData = generate3dBarSeries(dataset.source, colorList);
  let baseOptions = generateBaseOption(options);
  console.log('baseOptions-adapt3DBarChart', baseOptions, seriesData);
  let customOptions: ECOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
      },
      formatter(params: any) {
        const item = params[0];
        return params.length > 1
          ? TooltipMultiMarkerHTML(item.name, params)
          : TooltipMarkerHTML(item.axisValue, item.data[item.encode.y]);
      },
    },
    grid: {
      // containLabel: true修改写法调整
      outerBoundsMode: 'same',
      outerBoundsContain: 'axisLabel',
      left: '3%', //相当于距离左边效果:padding-left
      top: '15%', //相当于距离上边效果:padding-top
      bottom: '7%',
      right: '3%', //离容器右侧的距离。
    },
    legend: {
      show: seriesNum > 1, //多条线图时显示图例
      right: $pxByScreenW(16),
      top: '4%',
      itemGap: $pxByScreenW(20),
    },
    xAxis: [
      {
        type: 'category',
        // data: xAxisData,
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
          margin: $pxByScreenW(10), //刻度标签与轴线之间的距离
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
          fontSize: $pxByScreenW(14),
          color: '#CDCDCD',
          lineHeight: $pxByScreenW(18),
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
          margin: $pxByScreenW(10), //刻度标签与轴线之间的距离
          //y轴文字的配置
          color: '#CDCDCD',
          fontSize: $pxByScreenW(14),
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
    series: seriesData as never[],
    dataset,
  };
  return echarts.util.merge(baseOptions, customOptions);
};
const adaptScatterChart = <T = any>(data: ChartDataType<T>, options: ECOption = {}): ECOption => {
  let { list = [], nameKey = 'name', valueKey = 'value', seriesName = '未知' } = data;
  let temp = '';
  let graphData: any = list.map((i: any) => {
    temp = i[nameKey];
    return [i[nameKey], Number(i[valueKey])];
  });
  let dataNumber: any = list.map((item: any) => {
    return Number(item[valueKey]);
  });
  let max = dataNumber[0];
  dataNumber.forEach((item: any) => {
    if (max < item) {
      max = item;
    }
  });
  let riliRange = temp.split('-')[0] + '-' + temp.split('-')[1];
  console.log('riliRange', riliRange, max, graphData);
  let baseOptions = generateBaseOption(options);
  let customOptions = {
    tooltip: {
      position: 'top',
      formatter(params: any) {
        console.log('params--riliRange', params);
        let { data, encode } = params;
        let name = data[encode.time];
        let value = data[encode.value];
        return TooltipMarkerHTML(name, value);
      },
    },
    // tooltip: {
    //   trigger: 'axis',
    //   axisPointer: {
    //     type: 'none',
    //   },
    //   formatter(params: any) {
    //     const item = params[0];
    //     console.log('params--riliRange', params);
    //     return params.length > 1
    //       ? TooltipMultiMarkerHTML(item.name, params)
    //       : TooltipMarkerHTML(item.axisValue, item.data[item.encode.y]);
    //   },
    // },
    visualMap: [
      {
        min: 0,
        max: 1000,
        calculable: true,
        orient: 'horizontal',
        right: 0,
        bottom: 0,
        show: false,
        inRange: {
          color: ['#d5796e', '#bf444c'],
        },
      },
    ],
    calendar: [
      {
        silent: true,

        orient: 'vertical',
        top: '15%',
        dayLabel: {
          firstDay: 7,
          nameMap: 'ZH',
          fontSize: $pxByScreenW(14),
          color: '#CDCDCD',
          lineHeight: $pxByScreenW(16),
          margin: $pxByScreenW(6),
          fontFamily: 'Courier New',
        },
        yearLabel: {
          show: false,
        },
        monthLabel: {
          show: true,
        },
        cellSize: [$pxByScreenW(84), $pxByScreenW(52)], //单元格大小，行列数，[宽,高]
        left: '1%',
        right: '1%',
        range: riliRange,
        itemStyle: {
          borderColor: '#1bd9f8',
          borderWidth: $pxByScreenW(1),
          // opacity: 0
          color: 'transparent',
        },
        splitLine: {
          lineStyle: {
            color: '#1bd9f8',
          },
        },
      },
    ],
    series: [
      {
        label: {
          show: true,
          formatter: function (params: any) {
            return `${params.dataIndex + 1}`;
          },
          offset: [$pxByScreenW(32), $pxByScreenW(20)],
          fontSize: $pxByScreenW(12),
          color: '#0B4075',
          lineHeight: $pxByScreenW(12),
        },
        type: 'effectScatter',
        coordinateSystem: 'calendar',
        symbolSize: (val: any) => {
          // console.log('热力图的数据大小回调',val)
          return max == 0 ? 0 : (val[1] * $pxByScreenW(22)) / max;
        },
        data: graphData,
        itemStyle: {
          // borderColor: '#1bd9f8',
        },
      },
    ],
  };
  return echarts.util.merge(baseOptions, customOptions);
};
const adapterMap = {
  line: adaptLineChart,
  bar: adaptBarChart,
  pie: adaptPieChart,
  '3d-bar': adapt3DBarChart,
  effectScatter: adaptScatterChart, //散点图
};
export function adapterChart<T = any>(options: ChartOptions<T>) {
  const { type = 'line', data, theme = 'bussiness-white', ...otherOptions } = options;
  const adapter = adapterMap[type];
  if (adapter) {
    // 获取主题和适配器
    const themeConfig = getTheme(theme);
    // 合并配置选项
    const chartOptions = echarts.util.merge(otherOptions, themeConfig);
    console.log('chartOptions', chartOptions);
    // 使用适配器生成Echarts配置
    const ecOption = adapter(data, chartOptions);
    // console.log('返回Echarts配置对象', chartOptions, ecOption);
    return ecOption;
  } else {
    throw new Error(`No adapter found for chart type: ${type}`);
  }
}
