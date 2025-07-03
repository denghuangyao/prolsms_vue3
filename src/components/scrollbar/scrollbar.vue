<script setup lang="ts">
import { ref, computed } from 'vue';
import { ScrollArea } from '../scrollbar';
import { cn } from '@/utils';
import type { ClassType } from '@/types';
defineOptions({
  name: 'Scrollbar',
});
const props = withDefaults(defineProps<{ class?: ClassType }>(), {
  class: '',
});
const ARRIVED_STATE_THRESHOLD_PIXELS = 1;
const isAtTop = ref<boolean>(true);
const isAtBottom = ref<boolean>(false);
const showShadowTop = computed<boolean>(() => !isAtTop.value);
const showShadowBottom = computed<boolean>(() => !isAtBottom.value);
const handleScroll = (event: Event) => {
  console.log('handleScroll--', event);
  const target = event.target as HTMLElement;
  const clientHeight = target.clientHeight;
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;
  console.log(
    'handleScroll--',
    event,
    target,
    clientHeight,
    scrollHeight,
    scrollTop,
    isAtTop.value,
  );
  isAtTop.value = scrollTop <= 0;
  isAtBottom.value =
    Math.abs(scrollTop) + clientHeight >= scrollHeight - ARRIVED_STATE_THRESHOLD_PIXELS;
};
</script>
<template>
  <ScrollArea :class="cn(props.class)" :on-scroll="handleScroll">
    <div
      v-if="showShadowTop"
      class="scrollbar-top-shadow ease-in-out transition-opacity"
      :class="{ show: !isAtTop }"
    ></div>
    <slot></slot>
    <div
      v-if="showShadowBottom"
      class="scrollbar-bottom-shadow ease-in-out"
      :class="{ show: !isAtTop && !isAtBottom }"
    ></div>
  </ScrollArea>
</template>

<style scoped lang="scss">
.transition {
  /* 提前声明 */
  will-change: opacity;
  transition-property: opacity;
  transition-duration: 0.3s;
}

@mixin shadow {
  height: 3rem;
  width: 100%;
  position: absolute;
  z-index: 10;
  pointer-events: none; ///* 关键属性：禁用交互 */阴影完全不会阻挡点击
  border: 0 solid var(--border);
}

.show {
  opacity: 1 !important;
}

.scrollbar-top-shadow {
  @include shadow;
  opacity: 0;
  top: 0;
  background: linear-gradient(to bottom, var(--scroll-shadow), transparent);
  border-top-width: 1px;
}

.scrollbar-bottom-shadow {
  @include shadow;
  bottom: 0;
  opacity: 0;
  background: linear-gradient(to top, var(--scroll-shadow), transparent);
  border-bottom-width: 1px;
}
</style>
