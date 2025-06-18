<script lang="ts" setup>
import { onMounted } from 'vue';
onMounted(() => {
  for (let i = 0; i <= 100000; i++) {
    console.log('onBeforeMount--', i)

  }
})
</script>
<template>
  <h1>生物样
    <div v-for="item in 1000">{{ item }}</div>
  </h1>
</template>