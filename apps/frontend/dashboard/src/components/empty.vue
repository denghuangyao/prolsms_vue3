<script setup lang="ts">
import NoData from './NoData.vue';
const { isEmpty = false } = defineProps({
  isEmpty: Boolean,
});
</script>
<template>
  <div v-bind="$attrs" class="full-view">
    <no-data v-if="isEmpty" />
    <slot v-else></slot>
  </div>
</template>

<style scoped lang="scss"></style>
