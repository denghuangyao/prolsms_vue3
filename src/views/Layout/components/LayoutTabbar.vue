<script lang="ts" setup>
import { useTabbar } from '@/composables';
const { tabs, handleClick, handleClose, currentActive } = useTabbar();
const handleContextMenu = () => {
    console.log("handleContextMenu--")
}
const handleFullScreen = () => {
    console.log("handleFullScreen--")
}
</script>
<template>
    <section class="layout-tabbar">
        <Tabs :tabs="tabs" :active="currentActive" isAddIcon @change="handleClick" @close="handleClose">
            <template #add-icon>
                <div class="line"></div>
                <div class="icon-box" @click="handleContextMenu">
                    <i-ep-ArrowDown class="icon" />
                </div>
                <div class="line"></div>
                <div class="icon-box" @click="handleFullScreen">
                    <i-ep-FullScreen class="icon" />
                </div>
            </template>
        </Tabs>
    </section>
</template>
<style scoped lang="scss">
.layout-tabbar {
    :deep(.el-tabs__header) {
        background-color: #fff;
        margin: 0 0 1px;
    }

    .icon-box {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 pxTovw(8);

        &:hover {
            background-color: var(--el-border-color-light);
        }

        .icon {
            display: block;
        }
    }

    .line {
        width: 1px;
        height: 100%;
        background-color: var(--el-border-color-light);
    }
}
</style>
