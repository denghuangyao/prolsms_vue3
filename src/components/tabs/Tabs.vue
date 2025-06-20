<script lang="ts" setup>
import { computed } from 'vue';
import type { TabsProps } from './types';
import type { TabConfig } from '@/types';
interface Props extends TabsProps { }
const { tabs = [], active } = defineProps<Props>()
let tabsView = computed(() => tabs.map(tab => {
    console.log('tabsView--computed', tab)
    const { fullPath, path, name, meta, key } = tab || {}
    const { label, icon } = meta
    return {
        label,
        name: name as string,
        icon: icon as string,
        path,
        fullPath,
        key
    } as TabConfig
}))
const emit = defineEmits<{
    'change': [key: string],
    'close': [key: string]
}>()
const handleRemove = (tabKey: any) => {
    emit('close', tabKey)
}
const handleChange = (tabKey: any) => {
    emit('change', tabKey)
}
</script>
<template>
    <el-tabs :model-value="active" type="border-card" class="tabsCard" closable @tab-remove="handleRemove"
        @tab-change="handleChange">
        <el-tab-pane v-for="item in tabsView" :key="item.key" :name="item.key">
            <template #label>
                <svg-icon class="tab-icon" v-if="item.icon" :name="item.icon"></svg-icon>
                <span>{{ item.label }}</span>
            </template>
        </el-tab-pane>
    </el-tabs>
</template>
<style scoped lang="scss">
.tabsCard {
    border: none !important;

    :deep(.el-tabs__content) {
        padding: 0
    }

    :deep(.el-tabs__header) {
        border: none;
    }

    :deep(.el-tabs__item) {
        .tab-icon {
            fill: var(--el-text-color-primary);
            width: 1rem;
            margin-right: pxTovw(5);
        }

        &.is-active,
        &.is-isclosable {
            .tab-icon {
                fill: var(--el-color-primary);
            }
        }



        &.is-active,
        &.is-isclosable {
            background-color: var(--el-color-primary-light-7) !important;
            color: var(--el-color-primary) !important;

            .is-icon-close:hover {
                color: #fff;
                background-color: var(--el-color-primary);
            }
        }

        &:not(.is-disabled),
        &:not(.is-active) {
            &:hover {
                color: var(--el-text-color-secondary);
                background-color: var(--el-color-info-light-9);
            }
        }
    }

}
</style>