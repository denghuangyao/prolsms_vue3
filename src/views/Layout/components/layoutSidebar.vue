<script setup lang="ts">
import type { MenuProps } from '@/components/menu';
import { SidebarCollapseButton } from '@/components/widget/sidebar-btn';
import type { MenuRecordRaw } from '@/types';
import { ref, watch, useTemplateRef, type CSSProperties, computed } from 'vue';
import { useElementSize } from '@vueuse/core';
const { menus = [], defaultActive } = defineProps<{
    menus: MenuRecordRaw[],
    defaultActive: string
}>()
/** 
 * vue3.4及以下等价
interface Props {
    menus: MenuRecordRaw[]
}
withDefaults(defineProps<Props>(), {
    menus: () => []
})
*/
const emit = defineEmits<{
    'select': [path: string, mode: MenuProps['mode']],
}>()
const sidebarWidth = defineModel<string>('sidebarWidth')
const handleSelect = (menu: any) => {
    emit('select', menu.path, 'vertical')
}
const isCollapse = ref(false)
watch(() => isCollapse.value, () => {
    console.log(`菜单${isCollapse.value ? '展开' : '收起'}`)
})
const sidebarRef = useTemplateRef('sidebar')
const { width } = useElementSize(sidebarRef)
const hiddenSideStyle = computed<CSSProperties>(() => {
    const hiddenSideWidth = `${width.value}px`
    sidebarWidth.value = hiddenSideWidth
    return {
        'max-width': hiddenSideWidth,
        'min-width': hiddenSideWidth,
        width: hiddenSideWidth,
        flex: `0 0 ${hiddenSideWidth}`
    }
})
</script>
<template>
    <div class="hiddenDom" :style="hiddenSideStyle"></div>
    <aside ref="sidebar" class="sidebar">
        <Scrollbar class="menu-scrollbar">
            <el-menu class="second-menu-box" :collapse="isCollapse" :default-active="defaultActive">
                <!-- 模块二级菜单 -->
                <template v-for="secondItem in menus" :key="secondItem.permission">
                    <el-sub-menu :index="secondItem.path" v-if="secondItem?.children?.length">
                        <template #title>
                            <svg-icon class="item-icon-left el-icon" :name="secondItem.icon" />
                            <el-badge is-dot class="item-text textell" :offset="[-3, 15]">
                                {{ secondItem.label }}
                            </el-badge>
                        </template>
                        <!-- 下属三级菜单 -->
                        <el-menu-item class="second-menu-item" :index="item.path" v-for="item in secondItem.children"
                            @click="handleSelect(item)">
                            <el-badge is-dot class="item-text textell" :offset="[-3, 15]">
                                {{ item.label }}
                            </el-badge>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item class="second-menu-item" :index="secondItem.path" @click="handleSelect(secondItem)"
                        v-else>
                        <svg-icon class="item-icon-left el-icon" :name="secondItem.icon" />
                        <el-badge class="item-text textell" :offset="[-3, 15]">
                            {{ secondItem.label }}
                        </el-badge>
                    </el-menu-item>
                </template>
            </el-menu>
        </Scrollbar>
        <div class="sidebar-btn">
            <SidebarCollapseButton v-model:collapse="isCollapse" />
        </div>
    </aside>
</template>
<style lang="scss" scoped>
.hiddenDom {
    margin-left: 0;
    height: 100%;
}

@mixin menuitem {
    font-weight: 500;
    font-family: $font-family;
}

.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    margin-top: pxTovw(80);
    height: calc(100% - #{pxTovw(80)});
    z-index: 101;
    box-sizing: border-box;
    background: var(--siderbar-bg);
    border-right: 1px solid var(--border);


}

.menu-scrollbar {
    height: calc(100% - 2.625rem);

    :deep(.el-menu-item.is-active) {
        background-color: var(--el-menu-hover-bg-color);

        .item-icon-left {
            fill: var(--el-menu-active-color);
        }
    }

    .item-icon-left {
        fill: var(--el-menu-text-color);
    }

    .second-menu-box {
        box-sizing: border-box;
        border-right: none;

        &:not(.el-menu--collapse) {
            width: pxTovw(200);
        }

        .item-text {
            flex: 1;

            &.textell {
                max-width: 104px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }



        :deep(.el-sub-menu__title) {
            @include menuitem;
        }

        .item-icon-left {
            width: var(--el-menu-icon-width);
            height: var(--el-menu-icon-width);
            margin-right: .75rem
        }

        .second-menu-item {
            @include menuitem;
        }
    }
}

.sidebar-btn {
    height: 2.625rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 .75rem;
    width: 100%;
    bottom: 0;
    position: absolute;
    background-color: var(--background);
}
</style>