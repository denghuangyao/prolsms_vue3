<script setup lang="ts">
import { computed } from "vue";
import type { MenuRecordRaw } from "@/types";
import type { MenuProps } from "@/components/menu";
import { TOPMENU_MAXNUM } from "@/constants";
const { menus = [], defaultActive } = defineProps<{
    menus: MenuRecordRaw[],
    defaultActive: string
}>()
const emit = defineEmits<{
    select: [path: string, mode: MenuProps["mode"]]
}>()
let showFirstMenu = computed<MenuRecordRaw[]>(() => menus.slice(0, TOPMENU_MAXNUM));
let moreFirstMenu = computed<MenuRecordRaw[]>(() => menus.length > TOPMENU_MAXNUM ? menus.slice(TOPMENU_MAXNUM) : []);
const handleSelect = (menu: any) => {
    console.log("-handleSelect-,", menu)
    emit('select', menu.path, 'horizontal')
}
</script>
<template>
    <nav class="top-menu-box">
        <div class="menu-item" v-for="(firstItem, index) in showFirstMenu" :key="index"
            :class="{ 'activeTopMenu': defaultActive == firstItem.path }" @click="handleSelect(firstItem)">
            <svg-icon :name="firstItem.icon" class="menu-icon" />
            {{ firstItem.label }}
        </div>
        <el-dropdown placement="bottom" class="wl-dropdown" trigger="click" v-if="moreFirstMenu.length">
            <div class="el-dropdown-link">
                <span class="moretext">更多</span><i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu class="wl-dropdown-item" slot="dropdown">
                <el-dropdown-item :class="{ 'activeItem': defaultActive == item.path }" :command="item"
                    v-for="item in moreFirstMenu" :key="item.path"> {{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </nav>
</template>
<style lang="scss" scoped>
.top-menu-box {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;

    .menu-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        height: pxTovw(38);
        border-radius: pxTovw(19);
        padding: 0 pxTovw(16);
        font-size: $fontSize;
        font-family: $font-family;
        font-weight: 400;
        line-height: pxTovw(36);
        color: var(--font-color);
        background: transparent;
        margin: 0 pxTovw(5);
        transition: background-color .15s ease, color .15s ease, border-color .15s ease;

        &:not(.activeTopMenu) {
            border: pxTovw(1) solid transparent;

            &:hover {
                border: pxTovw(1) solid var(--menu-item-hover-bg-color);
                color: var(--menu-item-hover-color);
                background-color: var(--menu-item-hover-bg-color);

                .menu-icon {
                    fill: var(--menu-item-hover-color);
                    transform: scale(1.2);
                }
            }
        }

        .menu-icon {
            fill: var(--font-color);
            margin-right: pxTovw(8);
            width: pxTovw(16);
            transition: transform .25s
        }
    }

    .activeTopMenu {
        color: #ffffff;
        font-weight: bold;
        background: var(--menu-item-active-background-color);
        box-shadow: 0px 3px 9px 0px rgba(124, 150, 239, 0.27);
        border: none;

        .menu-icon {
            fill: #ffffff;
        }

        &:hover {
            color: #ffffff;
            font-weight: bold;

            .menu-icon {
                transform: scale(1.2);
            }
        }
    }

    :deep(.el-dropdown) {
        padding: 0 pxTovw(16);
        margin: 0 pxTovw(10) 0 pxTovw(5);
        font-size: pxTovw(14);
        color: var(--font-color);
        height: pxTovw(38);
        line-height: pxTovw(38);
        box-sizing: border-box;

        .el-dropdown-link {
            .moretext {
                margin-right: pxTovw(10);
            }
        }
    }
}
</style>