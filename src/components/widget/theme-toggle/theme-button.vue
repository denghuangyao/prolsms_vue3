<script lang="ts" setup>
import { nextTick } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { IconButton } from '@/components/icons';
defineOptions({
  name: 'ThemeToggleButton',
});
const isDark = useDark();
console.log('isDark--', isDark);
const toggleDark = useToggle(isDark);
const toggleTheme = (event: MouseEvent) => {
  // console.log('toggleTheme--', window.matchMedia('prefers-reduce-motion:reduce'))

  //判断是否支持startViewTransition以及用户是否设置了偏好以减少动画效果
  const isAppearanceTransition =
    // @ts-expect-error
    document.startViewTransition && !window.matchMedia('prefers-reduce-motion:reduce').matches;
  if (!isAppearanceTransition || !event) {
    isDark.value = !isDark.value;
  }
  const x = event.clientX;
  const y = event.clientY;
  // console.log('toggleTheme-x-y', x, y)
  //点击位置离四个角的最长距离
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  const transition = document.startViewTransition(async () => {
    toggleDark();
    await nextTick();
  });
  console.log('---transition', transition);
  transition.ready.then(() => {
    console.log('---transition-ready-then', isDark.value);
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    console.log(isDark.value ? [...clipPath].reverse() : [...clipPath]);
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : [...clipPath],
      },
      {
        duration: 450,
        easing: 'ease-in',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    );
  });
};
</script>
<template>
  <IconButton class="theme-toggle" :class="isDark ? 'is-dark' : 'is-light'" @click="toggleTheme">
    <i-ep-Sunny v-if="isDark" />
    <i-ep-moon v-else />
  </IconButton>
</template>
<style lang="scss" scoped></style>
