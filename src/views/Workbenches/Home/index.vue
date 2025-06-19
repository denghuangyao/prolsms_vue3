<script lang="ts" setup>
import { refAutoReset } from '@vueuse/core';
const isLoading = refAutoReset(false, 3000)
const openLoading = () => {
    isLoading.value = true
} 
</script>
<template>
    <div>首页。。。。
        <el-button type="primary" @click="openLoading">v-spinning指令</el-button>
        <el-card style="max-width: 480px">
            <template #header>VSpinner</template>
            <div class="loading-box" v-spinning="{ spinning: isLoading, minLoadingTime: 100 }"></div>
        </el-card>

    </div>
</template>
<style lang="scss">
.loading-box {
    height: 200px;
    width: 200px
}
</style>