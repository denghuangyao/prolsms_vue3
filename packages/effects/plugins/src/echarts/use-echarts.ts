import { computed, nextTick, watch, type Ref } from 'vue';
import {
  useElementSize,
  tryOnUnmounted,
  useDebounceFn,
  useTimeoutFn,
  useResizeObserver,
  useWindowSize,
} from '@vueuse/core';
import type EchartsUI from './echarts-ui.vue';
import echarts from './echarts';
import type { EChartsOption } from 'echarts';
export type EchartsUIType = typeof EchartsUI | undefined;
type EchartsThemeType = 'dark' | 'light' | null;
export function useEcharts(chartRef: Ref<EchartsUIType>) {
  let chartInstance: echarts.ECharts | null = null; //echarts实例
  let cacheOptions: EChartsOption = {}; //缓存配置项，用于重绘（响应式更新）
  const isDark = computed(() => false); //主题色切换
  const { width, height } = useWindowSize();
  const resizeHandler = useDebounceFn(resize, 300); //防抖处理，避免多次触发resize事件
  const getOptions = computed((): EChartsOption => {
    return isDark.value ? { background: 'transparent' } : {};
  }); //主题色切换，暗黑色配置设置
  const initEcharts = (t?: EchartsThemeType) => {
    const el = chartRef?.value?.$el as HTMLElement;
    console.log('el-initEcharts', el, chartRef.value);
    if (!el) {
      return;
    }
    chartInstance = echarts.init(el, t || isDark.value ? 'dark' : null);
    return chartInstance;
  };
  const renderEcharts = (options: EChartsOption) => {
    cacheOptions = options;
    const currentOptions = { ...options, ...getOptions.value };
    console.log('currentOptions-renderEcharts', currentOptions);
    return new Promise((resolve) => {
      if (chartRef.value?.offsetHeight === 0 || chartRef.value?.offsetWidth === 0) {
        useTimeoutFn(async () => {
          resolve(await renderEcharts(options));
        }, 30);
        return;
      }
      nextTick(() => {
        if (!chartInstance) {
          const instance = initEcharts();
          if (!instance) return;
        }
        //清空当前实例，会移除实例中所有的组件和图表
        chartInstance?.clear();
        chartInstance?.setOption(currentOptions);
        resolve(chartInstance);
      });
    });
  };
  const renderChart = (options: EChartsOption) => {
    chartInstance?.setOption(options, true);
  };
  watch([width, height], (vals) => {
    console.log('vals-watch', vals);
    resizeHandler?.();
  });
  watch(isDark, () => {
    if (chartInstance) {
      //销毁实例，销毁后实例无法再被使用。
      chartInstance.dispose();
      initEcharts();
      renderChart(cacheOptions);
      resizeHandler();
    }
  });
  function resize() {
    chartInstance?.resize({
      animation: {
        duration: 200,
        easing: 'quadraticIn', // 动画效果
      },
    });
  }
  useResizeObserver(chartRef as never, resizeHandler);

  tryOnUnmounted(() => {
    // 销毁实例，释放资源
    chartInstance?.dispose();
  });
  return { initEcharts, renderEcharts };
}
