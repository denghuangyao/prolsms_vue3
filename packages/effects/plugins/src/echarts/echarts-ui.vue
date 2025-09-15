<script setup lang="ts">
interface Props {
  height?: string;
  width?: string;
}
// 13.5417vw
const { height = '100%', width = '100%' } = defineProps<Props>();
</script>
<template>
  <div v-bind="$attrs" :style="{ height, width }"></div>
</template>
