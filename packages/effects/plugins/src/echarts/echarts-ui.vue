<script setup lang="ts">
import NoData from './NoData.vue';
interface Props {
  height?: string;
  width?: string;
  initData?: any[];
}
const { height = '300px', width = '100%' } = defineProps<Props>();
</script>
<template>
  <div v-bind="$attrs" :style="{ height, width }"></div>
</template>
