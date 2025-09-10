<script lang="ts" setup>
import { refAutoReset } from '@vueuse/core';
const isLoading = refAutoReset(false, 3000);
const openLoading = () => {
  isLoading.value = true;
};
const handleSubmit = () => {
  console.log('点击提交按钮--');
};
</script>
<template>
  <div>
    首页。。。。
    <el-button type="primary" @click="openLoading">v-spinning指令</el-button>
    <el-card style="max-width: 480px">
      <template #header>VSpinner</template>
      <div class="loading-box" v-spinning="{ spinning: isLoading, minLoadingTime: 100 }"></div>
    </el-card>
    <button
      v-throttle="handleSubmit"
      class="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
    >
      Submit
    </button>
  </div>
</template>
<style lang="scss">
.loading-box {
  height: 200px;
  width: 200px;
}
</style>
