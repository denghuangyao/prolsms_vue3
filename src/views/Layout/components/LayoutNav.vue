<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { MenuRecordRaw } from "@/types";
import type { MenuProps } from "@/components/menu";
import { TOPMENU_MAXNUM } from "@/constants";
const props = defineProps<{
    menus: MenuRecordRaw[]
}>()
const emit = defineEmits<{
    select: [path: string, mode: MenuProps["mode"]]
}>()
let showFirstMenu = computed<MenuRecordRaw[]>(() => props.menus.slice(0, TOPMENU_MAXNUM));
let activePath = defineModel('activePath');
let moreFirstMenu = computed<MenuRecordRaw[]>(() => props.menus.length > TOPMENU_MAXNUM ? props.menus.slice(TOPMENU_MAXNUM) : []);
const handleSelect = (menu: any) => {
    console.log("-handleSelect-,", menu)
    activePath.value = menu.path;
    emit('select', menu.path, 'horizontal')
}
</script>
<template>
    <nav class="top-menu-box">
        <div class="menu-item" v-for="(firstItem, index) in showFirstMenu" :key="index"
            :class="{ 'activeTopMenu': activePath == firstItem.path }" @click="handleSelect(firstItem)">
            <svg-icon :icon-class="firstItem.icon" class="menu-icon" v-show="activePath == firstItem.path" />
            {{ firstItem.label }}
        </div>
        <el-dropdown placement="bottom" class="wl-dropdown" trigger="click" v-if="moreFirstMenu.length">
            <div class="el-dropdown-link">
                <span class="moretext">更多</span><i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu class="wl-dropdown-item" slot="dropdown">
                <el-dropdown-item :class="{ 'activeItem': activePath == item.path }" :command="item"
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
        color: #181f47;
        background: transparent;
        margin: 0 pxTovw(5);

        &:not(.activeTopMenu) {
            border: pxTovw(1) solid white;
        }

        .menu-icon {
            fill: #fff;
            margin-right: pxTovw(5);
            width: pxTovw(16);
        }

        &:not(.activeTopMenu):hover {
            color: $color-primary;
            border: pxTovw(1) solid #e5edf6;
        }
    }

    .activeTopMenu {
        color: #ffffff;
        font-weight: bold;
        background: $color-primary;
        box-shadow: 0px 3px 9px 0px rgba(124, 150, 239, 0.27);
        border: none;

        &:hover {
            color: #ffffff;
            font-weight: bold;
        }
    }

    :deep(.el-dropdown) {
        padding: 0 pxTovw(16);
        margin: 0 pxTovw(10) 0 pxTovw(5);
        font-size: pxTovw(14);
        color: $fontColor;
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