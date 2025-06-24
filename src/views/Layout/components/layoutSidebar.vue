<script setup lang="ts">
import type { MenuProps } from '@/components/menu';
import type { MenuRecordRaw } from '@/types';
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
    'select': [path: string, mode: MenuProps['mode']]
}>()
const handleSelect = (menu: any) => {
    emit('select', menu.path, 'vertical')
} 
</script>
<template>
    <div class="hiddenDom"></div>
    <aside class="sidebar">
        <div class="left-menu-box">
            <el-menu class="second-menu-box" :default-active="defaultActive">
                <!-- 模块二级菜单 -->
                <template v-for="secondItem in menus" :key="secondItem.permission">
                    <el-sub-menu :index="secondItem.path" v-if="secondItem?.children?.length">
                        <template #title>
                            <svg-icon class="item-icon-left" :name="secondItem.icon" />
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
                        <svg-icon class="item-icon-left" :name="secondItem.icon" />
                        <el-badge class="item-text textell" :offset="[-3, 15]">
                            {{ secondItem.label }}
                        </el-badge>
                    </el-menu-item>
                </template>
            </el-menu>

        </div>
    </aside>
</template>
<style lang="scss" scoped>
.hiddenDom {
    flex: 0 0 pxTovw(200);
    margin-left: 0;
    max-width: pxTovw(200);
    min-width: pxTovw(200);
    width: pxTovw(200);
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

    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 101;
    box-sizing: border-box;
    background: var(--siderbar-bg);
    scrollbar-color: #c8cdd4;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        width: 0;
        height: pxTovw(3);
    }

    &::-webkit-scrollbar-thumb {
        border-radius: pxTovw(3);
        background: #5576e5;
    }
}

.left-menu-box {
    height: 100%;
    width: pxTovw(200);
    box-sizing: border-box;

    :deep(.el-menu-item.is-active) {
        background-color: var(--hover-color);

        .item-icon-left {
            fill: var(--el-menu-active-color);
        }
    }

    .item-icon-left {
        fill: var(--el-menu-text-color);
    }

    .second-menu-box {
        width: 100%;
        box-sizing: border-box;
        border-right: none;


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
            width: pxTovw(17);
            height: pxTovw(17);
            margin-right: pxTovw(12);
        }

        .second-menu-item {
            @include menuitem;
        }
    }
}
</style>