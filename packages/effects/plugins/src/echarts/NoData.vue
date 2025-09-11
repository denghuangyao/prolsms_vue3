<script setup lang="ts">
const { message = '暂无数据' } = defineProps<{
  message?: string;
  isFixed?: boolean;
}>();
</script>
<template>
  <div class="no-data-container">
    <div class="no-data-text">
      {{ message || '暂无数据' }}
    </div>
    <slot name="action"></slot>
  </div>
</template>
<style scoped lang="scss">
.no-data-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #999;
  // 渐入动画效果
  animation: fadeIn 0.5s ease-in-out;
}
.no-data-text {
  font-size: 16px;
  color: #909399;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
