<script lang="ts" setup>
import { onMounted } from 'vue';
onMounted(() => {
  for (let i = 0; i <= 50000; i++) {
    console.log('onMounted--', i)

  }
})
</script>
<template>
  <h1>生物样
    <div v-for="item in 50000">{{ item }}</div>
  </h1>
</template>