<script lang="ts" setup>
import { computed, type CSSProperties, ref } from 'vue';
import { LayoutHeader, LayoutNav, LayoutSidebar, LayoutContent, LayoutContentSpinner, LayoutTabbar } from './components'
import { useMixedMenu } from "@/composables";
const { headerMenus, headerActive, sidebarMenus, sidebarActive, handleMenuSelect } = useMixedMenu()
const sidebarWidth = ref('')
const tabbarStyle = computed<CSSProperties>(() => ({
    'margin-left': sidebarWidth.value
}))
</script>
<template>
    <div class="app-wrapper">
        <div class="app-container">
            <!-- 侧边栏 -->
            <LayoutSidebar v-model:sidebarWidth="sidebarWidth" :menus="sidebarMenus" @select="handleMenuSelect"
                :default-active="sidebarActive" />
            <div class="app-main">
                <div class="app-header">
                    <LayoutHeader>
                        <template #nav-menu>
                            <LayoutNav :menus="headerMenus" @select="handleMenuSelect" :default-active="headerActive" />
                        </template>
                        <template #theme-toggle>
                            <ThemeToggle class="mr16" />
                        </template>
                    </LayoutHeader>
                    <LayoutTabbar :style="tabbarStyle" class="app-tabbar" />
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
            box-shadow: 0px 0px 21px 0px rgba(48, 60, 152, 0.1);
            -webkit-box-shadow: 0px 0px 21px 0px rgba(48, 60, 152, 0.1);

            .app-tabbar {
                margin-left: pxTovw(200);
            }
        }

        .app-main {
            overflow: hidden;
            display: flex;
            flex-direction: column;
            flex: 1 1 0%;

            .app-content {
                flex: 1 1 0%;
                margin-top: pxTovw(128);
                animation-duration: .2s;
                transition-property: margin-top;
                transition-timing-function: cubic-bezier(.4, 0, .2, 1);
                background-color: var(--background-deep);
            }

        }
    }


}
</style>
