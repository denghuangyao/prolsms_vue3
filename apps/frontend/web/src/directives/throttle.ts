import type { App, Directive } from 'vue';

const throttleDirect: Directive = {
  mounted(el, binding) {
    // 首次点击时直接执行click事件，在按钮首次点击时立即执行点击事件，并且在之后的时间间隔内忽略其他点击事件
    let lastClickTime = 0;
    const throttleTimeout = 2000;
    el.addEventListener('click', () => {
      let now = Date.now();
      if (now - lastClickTime > throttleTimeout) {
        binding.value();
        console.log('now', now);
        lastClickTime = now;
      }
    });
  },
};

export function registerThrottleDirective(app: App) {
  app.directive('throttle', throttleDirect);
}
