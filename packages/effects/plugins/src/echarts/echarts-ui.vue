<script setup lang="ts">
interface Props {
  height?: string;
  width?: string;
}
// 13.5417vw
const { height = '100%', width = '100%' } = defineProps<Props>();
</script>
<template>
  <div class="wl-echarts" v-bind="$attrs" :style="{ height, width }"></div>
</template>
<style scoped lang="scss">
.wl-echarts {
  overflow: hidden;
}
</style>
