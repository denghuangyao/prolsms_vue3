<script lang="ts" setup>
import { type ProgressBarConfig, useProgressbarGrid } from './use-progressbar-grid';

interface Props {
  bar: ProgressBarConfig & {
    radius?: number; // 栅格圆角
  };
}
const { bar } = defineProps<Props>();
const { perGridWidth } = useProgressbarGrid(bar);
</script>
<template>
  <div class="grid-container">
    <div
      class="grid-progress-bar"
      v-for="_i in bar.num"
      :style="`--barRadius:${bar.radius || 0}px;
    --barWidth:${perGridWidth}%;
    --backColor:${bar.backColor};
    `"
    ></div>
  </div>
</template>
<style lang="scss" scoped>
.grid-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
}
.grid-progress-bar {
  height: 100%;
  width: var(--barWidth);
  border-radius: var(--barRadius);
  background-color: var(--backColor);
}
</style>
