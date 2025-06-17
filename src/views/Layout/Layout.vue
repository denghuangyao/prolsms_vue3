<script lang="ts" setup>
import { LayoutHeader, LayoutNav, LayoutSidebar, LayoutContent, LayoutContentSpinner, LayoutTabbar } from './components'
import { useMixedMenu } from "@/composables/use-mixed-menu";
const { headerMenus, headerActive, sidebarMenus, sidebarActive, handleMenuSelect } = useMixedMenu()

</script>
<template>
    <div class="app-wrapper">
        <div class="app-header">
            <LayoutHeader>
                <template #nav-menu>
                    <LayoutNav :menus="headerMenus" @select="handleMenuSelect" :default-active="headerActive" />
                </template>
            </LayoutHeader>

            <LayoutTabbar class="app-tabbar" />
        </div>
        <div class="app-main">
            <!-- 侧边栏 -->
            <LayoutSidebar class="app-sidebar" :menus="sidebarMenus" @select="handleMenuSelect"
                :default-active="sidebarActive" />
            <div class="app-container">
                <LayoutContent>
                    <template #content-overlay>
                        <LayoutContentSpinner />
                    </template>
                </LayoutContent>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.app-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .app-header {
        position: fixed;
        width: 100%;

        .app-tabbar {
            margin-left: pxTovw(200);
        }
    }

    .app-sidebar {
        margin-top: pxTovw(80);

        height: calc(100% - #{pxTovw(80)});
    }

    .app-main {
        flex: 1;
        display: flex;

        .app-container {
            width: calc(100% - #{pxTovw(200)});
            box-shadow: 7px 0px 12px -11px #999 inset;
            -webkit-box-shadow: 7px 0px 12px -11px #999 inset;
            margin-top: pxTovw(120);
            height: calc(100% - #{pxTovw(120)});
        }
    }


}
</style>
