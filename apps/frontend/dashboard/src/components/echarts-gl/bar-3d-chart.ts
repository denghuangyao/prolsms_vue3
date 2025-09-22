import { hexToRgba } from '@/utils/chartHelper';
import { echarts } from '@dhy/plugins/echarts';
import 'echarts-gl';
function getRenderItem(color: string, type: string = '') {
  const rgba = hexToRgba(color, type === 'top' ? 0.6 : 0.01);
  return {
    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 1,
        color: rgba,
      },
      {
        offset: 0,
        color,
      },
    ]),
  };
}
//顶部矩形宽度和高度比值设定为0.5,则表示w/h = FACTOR
const FACTOR = 0.3;
// 立方体左侧面的图形类
const LeftRectShape = echarts.graphic.extendShape({
  // shape 是一个固定值。
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  // ctx 其实就是 canvas.getContext('2d')。可以使用 ctx 绘制 arc、rect、bezierCurveTo 等形状
  buildPath: function (ctx, shape) {
    // 注意：shape 其实 dataTime 调用 renderItem() 方法是返回的图形定义。
    const { width: w, height: h, x, y } = shape;
    // console.log('LeftRectShape--shape-, y, h', y, h);
    // 绘制一个平面
    ctx.moveTo(x, y); // 左上角
    ctx.lineTo(x, y - h); // 左下角
    ctx.lineTo(x + w, y - h + w * FACTOR); // 右下角
    ctx.lineTo(x + w, y + w * FACTOR); // 右上角
    ctx.closePath();
  },
});
// 立方体右侧面的图形类
const RightRectShape = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  buildPath: function (ctx, shape) {
    const { width: w, height: h, x, y } = shape;
    // console.log('RightRectShape--shape-, y, h', y, h);
    ctx.moveTo(x, y + w * FACTOR); //
    ctx.lineTo(x, y + w * FACTOR - h); //
    ctx.lineTo(x + w, y - h);
    ctx.lineTo(x + w, y);
    ctx.closePath();
  },
});

const TopRectShape = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  buildPath: function (ctx, shape) {
    let { width: w, x, y, height: h } = shape;
    // console.log('TopRectShape--shape-, y, h', y, h);
    y = y - h;
    ctx.moveTo(x, y);
    ctx.lineTo(x + w / 2, y + (w / 2) * FACTOR);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w / 2, y - (w / 2) * FACTOR);
    ctx.closePath();
  },
});

// 三个面图形
echarts.graphic.registerShape('LeftRectShape', LeftRectShape);
echarts.graphic.registerShape('RightRectShape', RightRectShape);
echarts.graphic.registerShape('TopRectShape', TopRectShape);
// 图表配置项 - series 配置项
export function generate3dBarSeries(source: any[], colorList: any[] = []) {
  return [
    {
      type: 'custom',
      name: source[0][1],
      yAxisIndex: 0,
      xAxisIndex: 0,
      animation: true,
      animationDuration: 3000, // 设置动画时长为 3000 毫秒
      renderItem: function (params: any, api: any): any {
        let hexColor = colorList[params.seriesIndex];
        // 注意： echarts 坐标系默认是从 div 元素的左上角作为原点。
        // 朝左边 x 值越大，朝下边 y 值越大。
        const [x, y] = api.coord([api.value(0), api.value(1)]);
        const [w, h] = api.size([api.value(0), api.value(1)]);

        const { y: gridY, height: gridH } = params.coordSys;
        console.log('--generate3dBarSeries-, params', params, colorList);
        // w 表示整个图像的宽度，理论上我们将立方体分为 LeftRectShape 和 RightRectShape，
        // 所以每个 rect 的宽度就是 w/2，
        const rectWidth = (w / 2) * FACTOR;
        return {
          type: 'group',
          children:
            api.value(1) > 0
              ? [
                  {
                    type: 'LeftRectShape',
                    x: x - rectWidth,
                    y: y,
                    shape: {
                      // 立方体左侧面的宽度
                      y: h - rectWidth * FACTOR,
                      width: rectWidth,
                      // 立方体的高度
                      height: h - rectWidth * FACTOR,
                    },
                    enterFrom: {
                      // 淡入
                      style: { opacity: 0 },
                      shape: {
                        height: 0,
                      },
                      y: gridH + gridY,
                    },
                    style: {
                      ...getRenderItem(hexColor, 'left'),
                    },
                  },
                  {
                    type: 'RightRectShape',
                    x: x,
                    y: y,
                    shape: {
                      // 立方体左侧面的宽度
                      y: h - rectWidth * FACTOR,
                      width: rectWidth,
                      // 立方体的高度
                      height: h - rectWidth * FACTOR,
                    },
                    enterFrom: {
                      // 淡入
                      style: { opacity: 0 },
                      shape: {
                        height: 0,
                      },
                    },
                    style: {
                      ...getRenderItem(hexColor, 'right'),
                    },
                  },
                  {
                    type: 'TopRectShape',
                    x: x - rectWidth,
                    y: y,
                    shape: {
                      y: h - rectWidth * FACTOR,

                      // 立方体顶部矩形的宽度
                      width: rectWidth * 2,
                      // 立方体的高度
                      height: h - rectWidth * FACTOR,
                    },
                    enterFrom: {
                      // 淡入
                      style: { opacity: 0 },
                      shape: {
                        height: 0,
                      },
                    },
                    style: {
                      ...getRenderItem(hexColor, 'top'),
                    },
                  },

                  /* 绘制 bar 的背景 */
                  {
                    type: 'LeftRectShape',
                    shape: {
                      x: x - rectWidth,
                      y: gridH + gridY - rectWidth * FACTOR,
                      // 立方体的宽度
                      width: rectWidth,
                      // 立方体的高度
                      height: gridH - rectWidth * FACTOR,
                    },
                    enterFrom: {
                      // 淡入
                      style: { opacity: 0 },
                    },
                    style: {
                      fill: hexColor,
                      opacity: 0.2,
                    },
                  },
                  {
                    type: 'RightRectShape',
                    shape: {
                      x: x,
                      y: gridH + gridY - rectWidth * FACTOR,
                      // 立方体的宽度
                      width: rectWidth,
                      // 立方体的高度
                      height: gridH - rectWidth * FACTOR,
                    },
                    enterFrom: {
                      // 淡入
                      style: { opacity: 0 },
                    },
                    style: {
                      fill: hexColor,
                      opacity: 0.2,
                    },
                  },
                  {
                    type: 'TopRectShape',
                    shape: {
                      x: x - rectWidth,
                      y: gridH + gridY - rectWidth * FACTOR,
                      // 立方体顶部矩形的宽度
                      width: rectWidth * 2,
                      // 立方体的高度
                      height: gridH - rectWidth * FACTOR,
                    },
                    enterFrom: {
                      // 淡入
                      style: { opacity: 0 },
                    },
                    style: {
                      fill: hexColor,
                      opacity: 0.2,
                    },
                  },
                ]
              : [],
        };
      },
    },
  ];
}
