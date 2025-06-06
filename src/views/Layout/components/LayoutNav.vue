<script setup lang="ts">
import { ref, computed } from "vue";
import { useAccessStore } from "@/stores";
import type { MenuRecordRaw } from "@/types";
import { TOPMENU_MAXNUM } from "@/constants";
const accessStore = useAccessStore();
let firstMenus = accessStore.accessMenus
let showFirstMenu = computed<MenuRecordRaw[]>(() => firstMenus.slice(0, TOPMENU_MAXNUM));
let activeIndex = ref('');
let moreFirstMenu = computed<MenuRecordRaw[]>(() => firstMenus.length > TOPMENU_MAXNUM ? firstMenus.slice(TOPMENU_MAXNUM) : []);
</script>
<template>
    <div class="top-menu-box">
        <div class="menu-item" v-for="(firstItem, index) in showFirstMenu" :key="index"
            :class="{ activeTopMenu: activeIndex == firstItem.key }">
            <svg-icon :icon-class="firstItem.icon" class="menu-icon" v-show="activeIndex == firstItem.key" />
            {{ firstItem.label }}
        </div>
        <el-dropdown placement="bottom" class="wl-dropdown" trigger="click" v-if="moreFirstMenu.length">
            <div class="el-dropdown-link">
                <span class="moretext">更多</span><i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu class="wl-dropdown-item" slot="dropdown">
                <el-dropdown-item :class="{ 'activeItem': activeIndex == item.key }" :command="item"
                    v-for="item in moreFirstMenu" :key="item.key"> {{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
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
            color: #3557cc;
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