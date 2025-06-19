<script lang="ts" setup>
import { LayoutHeader, LayoutNav, LayoutSidebar, LayoutContent, LayoutContentSpinner, LayoutTabbar } from './components'
import { useMixedMenu } from "@/composables";
const { headerMenus, headerActive, sidebarMenus, sidebarActive, handleMenuSelect } = useMixedMenu()
</script>
<template>
    <div class="app-wrapper">
        <div class="app-container">
            <!-- 侧边栏 -->
            <LayoutSidebar :menus="sidebarMenus" @select="handleMenuSelect" :default-active="sidebarActive" />
            <div class="app-main">
                <div class="app-header">
                    <LayoutHeader>
                        <template #nav-menu>
                            <LayoutNav :menus="headerMenus" @select="handleMenuSelect" :default-active="headerActive" />
                        </template>
                    </LayoutHeader>
                    <LayoutTabbar class="app-tabbar" />
                </div>
                <LayoutContent class="app-content">
                    <template #content-overlay="{ style }">
                        <LayoutContentSpinner :style="style" />
                    </template>
                </LayoutContent>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.app-wrapper {
    width: 100%;
    height: 100%;
    overscroll-behavior: none;

    .app-container {
        display: flex;
        width: 100%;
        min-height: 100%;
        position: relative;

        .app-header {
            position: fixed;
            width: 100%;
            z-index: 100;
            left: 0;
            top: 0;

            .app-tabbar {
                margin-left: pxTovw(200);
            }
        }

        .app-main {
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 7px 0px 12px -11px #999 inset;
            -webkit-box-shadow: 7px 0px 12px -11px #999 inset;
            flex: 1 1 0%;

            .app-content {
                flex: 1 1 0%;
                margin-top: pxTovw(135);
                animation-duration: .2s;
                transition-property: margin-top;
                transition-timing-function: cubic-bezier(.4, 0, .2, 1);
            }

        }
    }


}
</style>
