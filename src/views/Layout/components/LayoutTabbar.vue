<script lang="ts" setup>
import { useTabbar } from '@/composables';
const { tabs, handleClick, handleClose, currentActive } = useTabbar();
</script>
<template>
    <section class="layout-tabbar">
        <Tabs :tabs="tabs" :active="currentActive" @change="handleClick" @close="handleClose" />
    </section>
</template>
<style scoped lang="scss">
.layout-tabbar :deep(.el-tabs__header) {
    background: #fff;
    margin: 0 0 1px;
}
</style>
