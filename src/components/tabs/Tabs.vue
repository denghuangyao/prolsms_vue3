<script lang="ts" setup>
import { computed, watch, ref, useSlots, type SetupContext } from 'vue';
import type { TabsProps } from './types';
import type { Recordable, TabConfig } from '@/types';
const slots: SetupContext['slots'] = useSlots();
console.log("--slots-", slots)
const tabbarSlots = computed(() => Object.keys(slots).filter(key => key === 'add-icon'))
interface Props extends TabsProps {
    isAddIcon?: boolean
}
const { tabs = [], active, isAddIcon = false } = defineProps<Props>()
let tabsView = computed(() => tabs.map(tab => {
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
const tabRefs = ref<Recordable>({});
</script>
<template>
    <el-tabs :model-value="active" type="border-card" class="tabsCard" :addable="isAddIcon" closable
        @tab-remove="handleRemove" @tab-change="handleChange">
        <template v-for="item in tabbarSlots" #[item]>
            <slot :name="item"></slot>
        </template>
        <el-tab-pane :ref="(el) => { if (el) tabRefs[item.key] = el }" v-for="item in tabsView" :key="item.key"
            :name="item.key">
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

        &:not(:first-of-type)::before {
            content: '';
            height: 50%;
            background-color: var(--el-border-color-light);
            width: pxTovw(2);
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            transition: all .15s;
            transition-timing-function: cubic-bezier(.4, 0, .2, 1);
            opacity: 1;
        }

        .tab-icon {
            fill: var(--el-text-color-primary);
            width: 1rem;
            margin-right: pxTovw(5);
        }

        &.is-active,
        &.is-isclosable {
            background-color: var(--tab-item-active-bg-color) !important;
            color: var(--tab-item-active-color) !important;

            .tab-icon {
                fill: var(--tab-item-active-color);
            }

            .is-icon-close:hover {
                color: var(--el-text-color-secondary);
                background-color: var(--tab-item-icon-bg-color);
            }

            &::before {
                opacity: 0;
            }

            &+.el-tabs__item {
                &::before {
                    opacity: 0;
                }
            }
        }

        &:not(.is-disabled),
        &:not(.is-active) {
            &:hover {
                color: var(--el-text-color-secondary);
                background-color: var(--tab-item-hover-bg-color);

                &::before {
                    opacity: 0;
                }

                &+.el-tabs__item {
                    &::before {
                        opacity: 0;
                    }
                }

            }


        }
    }

    :deep(.el-tabs__new-tab) {
        height: auto;
        width: auto;
        border: none;
        margin: 0;
        font-size: pxTovw(16);
        border-radius: 0;
        height: var(--el-tabs-header-height);
        justify-content: space-around;

        &:hover {
            color: var(--el-text-color-secondary);
        }
    }
}
</style>