import { TooltipMarkerHTML } from '@/utils/chartAdapter';
import { $pxByScreenW } from '@/utils/screen';
import { echarts } from '@dhy/plugins/echarts';
import 'echarts-gl';
// const colorList = [
//   'rgba(76, 139, 241, 0.9)',
//   'rgba(101, 193, 241, 0.9)',
//   'rgba(249, 215, 114, 0.9)',
//   'rgba(179, 186, 195, 0.9)',
//   'rgba(255, 255, 255,  0.9)',
//   'rgba(145, 186, 217, 0.9)',
// ];
const baseOptions = {
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
    formatter: (params: any) => {
      console.log('3D-charts--params', params);
      if (params.seriesName !== 'mouseoutSeries') {
        return TooltipMarkerHTML(params.seriesName, '100');
      }
      return '';
    },
  },
  legend: {
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
  label: {
    show: true,
  },
  xAxis3D: {
    min: -1,
    max: 1,
  },
  yAxis3D: {
    min: -1,
    max: 1,
  },
  zAxis3D: {
    min: -1,
    max: 1,
  },
  grid3D: {
    show: true,
    boxHeight: 15,
    // boxWidth和boxDepth这两个属性值保持一致，才可以在调整饼图宽度的时候保持水平，不然就会歪歪扭扭
    boxWidth: 90,
    boxDepth: 90,
    top: '-10%',

    viewControl: {
      autoRotate: false, // 自动旋转
      // 3d效果可以放大、旋转等，请自己去查看官方配置
      alpha: 25,
      rotateSensitivity: 1,
      zoomSensitivity: 0,
      panSensitivity: 0,
      distance: 170,
    },
    // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
    postEffect: {
      // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
      enable: true,
      bloom: {
        enable: true,
        bloomIntensity: 1,
      },
      SSAO: {
        enable: true,
        quality: 'medium',
        radius: 2,
      },
    },
    // environment: 'auto',
  },
};
/**
 * 生成扇形的曲面参数方程,实现3d饼图
 * @param startRatio :当前扇形起始比例，取值区间[0, endRatio)
 * @param endRatio :当前扇形结束比例，取值区间(startRatio, 1]
 * @param isSelected :是否选中，效果参照二维饼图选中效果（单选）
 * @param isHovered :是否放大，效果接近二维饼图高亮（放大）效果（未能实现阴影）
 * @param k :用于参数方程的一个参数，取值 0~1 之间，通过「内径 / 外径」的值换算而来。
 * @param h :配置3d扇形高度
 * @returns
 */
function getParametricEquation(
  startRatio: any,
  endRatio: any,
  isSelected: any,
  isHovered: any,
  k: any,
  h: any,
) {
  // 计算
  const midRatio = (startRatio + endRatio) / 2;
  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },

    x(u: number, v: number) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y(u: number, v: number) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z(u: number, v: number) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      //
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      // 当前图形的高度是Z根据h（每个value的值决定的）
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
}
// 生成模拟 3D 饼图的配置项
function getPie3D(pieData: any[], internalDiameterRatio: number) {
  const series = [];
  // 总和
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData = [];
  const k =
    typeof internalDiameterRatio !== 'undefined'
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;
    let seriesItem: any = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k,
      },
    };

    if (typeof pieData[i].itemStyle != 'undefined') {
      let itemStyle: any = {};
      if (typeof pieData[i].itemStyle.color != 'undefined') {
        itemStyle.color = pieData[i].itemStyle.color;
      }
      if (typeof pieData[i].itemStyle.opacity != 'undefined') {
        itemStyle.opacity = pieData[i].itemStyle.opacity;
      }
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    console.log('3d-pie--series[i]', series[i]);
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.endRatio * 10,
      // series[i].pieData.value === series[0].pieData.value ? 1 : 1,
    );
    startValue = endValue;
    legendData.push(series[i].name);
  }
  //   补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
    // name: 'mouseoutSeries',
    type: 'surface',
    parametric: true, // 是否为参数曲面
    wireframe: {
      show: false, // 曲面图的网格线
    },
    itemStyle: {
      opacity: 0.2,
      color: 'rgba(165, 247, 253, 0.1)',
    },
    silent: false,
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u: number, v: number) {
        return Math.sin(v) * Math.sin(u) + Math.sin(u);
      },
      y: function (u: number, v: number) {
        return Math.sin(v) * Math.cos(u) + Math.cos(u);
      },
      z: function (_u: number, v: number) {
        return Math.cos(v) > 0 ? 0.1 : -0.1;
      },
    },
  });

  return {
    ...baseOptions,
    series,
  };
}
function bindListen(myChart: any, option: any, height: any) {
  // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
  let selectedIndex = '';
  let hoveredIndex = '';
  // 设置默认展示数据
  let defaultIndex = 0;
  // 与2D环形图的数据参数有关,可设置默认相中
  myChart.dispatchAction({
    type: 'highlight',
    // 第四个series中展示中的默认数值
    seriesIndex: 4,
    dataIndex: defaultIndex,
  });

  // 监听点击事件，实现选中效果（单选）
  myChart.on('click', (params: any) => {
    // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
    let isSelected = !option.series[params.seriesIndex].pieStatus.selected;
    let isHovered = option.series[params.seriesIndex].pieStatus.hovered;
    let k = option.series[params.seriesIndex].pieStatus.k;
    let startRatio = option.series[params.seriesIndex].pieData.startRatio;
    let endRatio = option.series[params.seriesIndex].pieData.endRatio;

    // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
    if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
      option.series[selectedIndex].parametricEquation = getParametricEquation(
        option.series[selectedIndex].pieData.startRatio,
        option.series[selectedIndex].pieData.endRatio,
        false,
        false,
        k,
        option.series[selectedIndex].pieData.endRatio * 20,
      );
      option.series[selectedIndex].pieStatus.selected = false;
    }

    // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
    option.series[params.seriesIndex].parametricEquation = getParametricEquation(
      startRatio,
      endRatio,
      isSelected,
      isHovered,
      k,
      //10
      endRatio * 20 + (height ? height : 10),
    );
    option.series[params.seriesIndex].pieStatus.selected = isSelected;

    // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
    isSelected ? (selectedIndex = params.seriesIndex) : null;

    // 使用更新后的 option，渲染图表
    myChart.setOption(option);
  });
  // 监听 mouseover，近似实现高亮（放大）效果
  myChart.on('mouseover', (params: any) => {
    // 准备重新渲染扇形所需的参数
    let isSelected;
    let isHovered;
    let startRatio;
    let endRatio;
    let k;
    // 2D环形图 设置默认数据展示
    if (params.dataIndex != defaultIndex) {
      myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 4,
        dataIndex: defaultIndex,
      });
    }

    // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    if (hoveredIndex === params.seriesIndex) {
      return;
      // 否则进行高亮及必要的取消高亮操作
    } else {
      // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
      if (hoveredIndex !== '') {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
        isSelected = option.series[hoveredIndex].pieStatus.selected;
        isHovered = false;
        startRatio = option.series[hoveredIndex].pieData.startRatio;
        endRatio = option.series[hoveredIndex].pieData.endRatio;
        k = option.series[hoveredIndex].pieStatus.k;

        // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
        option.series[hoveredIndex].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          endRatio * 20 + (height ? height : 10),
        );
        option.series[hoveredIndex].pieStatus.hovered = isHovered;

        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
        hoveredIndex = '';
      }
      // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
      if (params.seriesName !== 'mouseoutSeries') {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        isSelected = option.series[params.seriesIndex].pieStatus.selected;
        isHovered = true;
        startRatio = option.series[params.seriesIndex].pieData.startRatio;
        endRatio = option.series[params.seriesIndex].pieData.endRatio;
        k = option.series[params.seriesIndex].pieStatus.k;

        // 对当前点击的扇形，执行高亮操作（对 option 更新）
        option.series[params.seriesIndex].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          endRatio * 20 + (height ? height : 10),
        );
        option.series[params.seriesIndex].pieStatus.hovered = isHovered;

        // 记录上次高亮的扇形对应的系列号 seriesIndex
        hoveredIndex = params.seriesIndex;
      }

      // 使用更新后的 option，渲染图表
      myChart.setOption(option);
    }
  });
  // 修正取消高亮失败的 bug
  myChart.on('globalout', () => {
    console.log('3d-pie--globalout');
    let isSelected;
    let isHovered;
    let startRatio;
    let endRatio;
    let k;
    if (hoveredIndex !== '') {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
      isSelected = option.series[hoveredIndex].pieStatus.selected;
      isHovered = false;
      k = option.series[hoveredIndex].pieStatus.k;
      startRatio = option.series[hoveredIndex].pieData.startRatio;
      endRatio = option.series[hoveredIndex].pieData.endRatio;

      // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
      option.series[hoveredIndex].parametricEquation = getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        endRatio * 20,
      );
      option.series[hoveredIndex].pieStatus.hovered = isHovered;

      // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
      hoveredIndex = '';
    }

    // 使用更新后的 option，渲染图表
    // myChart.clear();
    myChart.setOption(option);
    // 鼠标移出后重新渲染3D环形图
  });
}
export function use3DChart(chartRef: any, data: any[], internalDiameterRatio = 0.7) {
  if (!chartRef) return;
  console.log('use3DChart-data', data);
  const paramsList = data.map((item, _index) => {
    return {
      value: item.value,
      shading: 'realistic',
      name: item.name,

      //   itemStyle: {
      //     color: colorList[index],
      //   },
    };
  });
  let option = getPie3D(paramsList, internalDiameterRatio);
  const el = chartRef?.value?.$el as HTMLElement;
  let chartInstance = echarts.init(el);
  chartInstance.setOption(option);
  bindListen(chartInstance, option, 0.1);
}
