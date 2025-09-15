//将px转成vw
export const $pxTovw = function ($px) {
  let designWidth = 1920;
  return `${($px / designWidth) * 100}vw`;
};
//将px或无单位数值根据1920比例缩放转换
export const $pxByScreenW = function (width) {
  let currentWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!currentWidth) return width;
  let designWidth = 1920;
  let scale = currentWidth / designWidth;
  return Number((width * scale).toFixed(3));
};
