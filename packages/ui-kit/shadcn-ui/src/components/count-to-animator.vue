<script setup lang="ts">
import { TransitionPresets, useTransition } from '@vueuse/core';
import { ref, computed, unref, watch, onMounted } from 'vue';
interface Props {
  startVal?: number; //开始值
  endVal: number; //结束值
  autoplay?: boolean; //是否自动播放
  duration?: number; //持续时间ms
  transition?: keyof typeof TransitionPresets; //动画过渡效果
  decimalPlaces?: number; //小数位数，默认为0位小数
  prefix?: string; //前缀
  suffix?: string; //后缀
}
const {
  startVal = 0,
  endVal,
  autoplay = true,
  duration = 1500,
  transition = 'linear',
  decimalPlaces = 0,
  prefix = '',
  suffix = '',
} = defineProps<Props>();
const source = ref(startVal);
let outputValue = useTransition(source);
let value = computed(() => {
  return formatNumber(unref(outputValue));
});
watch([() => startVal, () => endVal], () => {
  console.log('start---watch-', startVal, endVal);
  if (autoplay) {
    start();
  }
});
onMounted(() => {
  autoplay && start();
});
function start() {
  run();
  console.log('start----', startVal, endVal);
  source.value = endVal;
}
function run() {
  outputValue = useTransition(source, {
    duration: duration,
    transition: TransitionPresets[transition],
    onStarted() {},
    onFinished() {},
  });
}
function formatNumber(num: number | string) {
  num = Number(num).toFixed(decimalPlaces);
  num += '';
  const nums = num.split('.'); // 按小数点分成2部分
  let integerPart = nums[0]; // 整数部分
  const decimalPart = nums.length > 1 ? '.' + nums[1] : ''; // 小数部分
  let regex = /(\d+)(\d{3})/; // 判断整数部分是否存在超过三位数，以逗号隔开
  while (regex.test(integerPart)) {
    integerPart = integerPart.replace(regex, '$1' + ',' + '$2');
  }
  return `${prefix}${integerPart}${decimalPart}${suffix}`; // 最终格式化结果
}
</script>
<template>
  <span>
    {{ value }}
  </span>
</template>
