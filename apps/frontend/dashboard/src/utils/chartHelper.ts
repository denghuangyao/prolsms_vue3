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
export function randomHexColor() {
  //随机生成十六进制颜色
  var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
  while (hex.length < 6) {
    //while循环判断hex位数，少于6位前面加0凑够6位
    hex = '0' + hex;
  }
  return '#' + hex; //返回‘#'开头16进制颜色
}
