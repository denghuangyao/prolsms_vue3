import { echarts } from '@dhy/plugins/echarts';

/**
 * 根据最大字节长度截断字符串
 * @param str 待处理的字符串
 * @param maxL 最大字节长度
 * @returns 截断后的字符串
 */
export function changeStrBychar(str: any, maxL: number) {
  let iLength = 0; //记录字符的字节数
  if (!str) return '';
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      iLength += 2; //如果当前字符的编码大于255，所占字节数加2
    } else {
      iLength += 1;
    }
    if (iLength > maxL && i != str.length - 1) {
      str = str.slice(0, i) + '...';
      break;
    }
  }
  return str;
}
export function randomHexAndRgbaColor(alpha: number = 0.2) {
  let hexColor = randomHexColor();
  let rgbaColor = hexToRgba(hexColor, alpha);
  return { hexColor, rgbaColor };
}
export function randomHexColor() {
  //随机生成十六进制颜色
  var hex = Math.floor(Math.random() * 0x1000000)
    .toString(16)
    .padStart(6, '0'); //生成ffffff以内16进制数
  return '#' + hex; //返回‘#'开头16进制颜色
}
/**
 * 将十六进制颜色值转换为 RGBA 格式
 * @param {string} hex - 十六进制颜色值（支持 #RRGGBB 或 #RRGGBBAA 格式）
 * @param {number} [alpha] - 可选的透明度值（0-1），如果 hex 包含 AA 则忽略
 * @returns {string} RGBA 格式的颜色值
 */
function hexToRgba(hex: string, alpha: number = 1): string {
  // 去除 # 号并统一为小写
  hex = hex.replace(/^#/, '').toLowerCase();

  // 检查输入是否合法
  if (!/^([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(hex)) {
    throw new Error('Invalid hex color format. Use #RRGGBB, #RGB, or #RRGGBBAA.');
  }

  // 处理简写格式（#RGB -> #RRGGBB）
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  // 提取 RGB 分量
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 提取 Alpha 分量（如果存在）
  let a = 1; // 默认不透明
  if (hex.length === 8) {
    const alphaHex = hex.substring(6, 8);
    a = parseInt(alphaHex, 16) / 255;
  } else if (typeof alpha === 'number') {
    // 如果传入了 alpha 参数且 hex 不包含 AA，则使用传入的 alpha
    a = Math.max(0, Math.min(1, alpha)); // 确保 alpha 在 0-1 范围内
  }
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
/**
 * 在数据集中设置数据
 * 从数据库数据=》图表数据
 * @param data 数据
 *  格式1:[{name:'',value:''},{name:'',value:''},...]
 *  格式2:[{x,y1:'',y2:'',y3:'',...},{x,y1:'',y2:'',y3:'',...}]
 * @param nameKey 名称key
 * @param valueKey 值key,支持多个y轴key，用逗号分隔
 * @returns 二维数组
 *  格式:默认情况下seriesLayoutBy='column'时，（图例显示series.name）对应到 dataset 第一行
 * {
      // 提供一份数据。
      source: [
        // 第一列为x轴数据，后面每一列为一个series的数据
        ['product', '2015', '2016', '2017'],//类目轴：
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1]
      ]
    }
 */
export function generateDataSet(
  chartList: any[],
  nameKey: string = 'name',
  valueKey: string = 'value',
  seriesName?: string | string[],
) {
  let source: any[] = [];
  if (valueKey.includes(',')) {
    let valueKeys = valueKey.split(',');
    let dimensions = Array.isArray(seriesName)
      ? seriesName
      : seriesName
        ? seriesName.split(',')
        : []; //系列名称
    source[0] = ['type', ...dimensions]; //默认情况下，类目轴（图例显示series.name）对应到 dataset 第一列
    //多条线图适配(堆叠图)
    // [{x,y1:'',y2:'',y3:'',...},{x,y1:'',y2:'',y3:'',...}]
    chartList.forEach((item: any) => {
      let sourceItem: any[] = [item[nameKey]]; //默认情况下，每个系列会自动对应到 dataset 的每一列。
      valueKeys.forEach((yAxisKey: any) => {
        sourceItem.push(item[yAxisKey]);
      });
      source.push(sourceItem);
    }); //[[...y1],[...y2],[...y3],...]
    return {
      source,
    };
  }
  chartList.forEach((item: any, index: number) => {
    source[index] = [];
    source[index].push(item[nameKey]);
    source[index].push(item[valueKey]);
  }); //单条线图适配
  return { source };
}
export function getLinearGradient(...colors: string[]): echarts.graphic.LinearGradient {
  let colorStops = colors.map((color, index) => ({
    offset: index / (colors.length - 1),
    color: color,
  }));
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, colorStops);
}
