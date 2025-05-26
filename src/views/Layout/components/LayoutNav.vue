<script setup lang="ts">
import { ref, reactive, computed } from "vue";
interface Menu {
    key: string | number,//权限key,唯一标识
    icon: string,//菜单icon
    label: string,//菜单名称
    id: string | number//菜单id
}
let showFirstMenu = reactive<Menu[]>([]);
let activeIndex = ref(0);
let moreFirstMenu = computed<Menu[]>(() => []);
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
                    v-for="item in moreFirstMenu" :key="item.id"> {{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<style lang="scss" scoped></style>