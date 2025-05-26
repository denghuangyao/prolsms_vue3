<script lang="ts" setup>
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutMenu from './components/LayoutMenu.vue';

</script>
<template>
    <div class="app-wrapper">
        <LayoutHeader />
        <div class="app-main">
            <!-- 侧边栏 -->
            <div class="sidebar">
                <LayoutMenu />
            </div>
            <div class="app-container ">
                <RouterView v-slot="{ Component }">
                    <template v-if="Component">
                        <Transition mode="out-in">
                            <KeepAlive>
                                <Suspense>
                                    <!-- 主要内容 -->
                                    <component :is="Component"></component>

                                    <!-- 加载中状态 -->
                                    <template #fallback>
                                        正在加载...
                                    </template>
                                </Suspense>
                            </KeepAlive>
                        </Transition>
                    </template>
                </RouterView>
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

    .app-main {
        flex: 1;
        display: flex;

        .app-container {
            height: 100%;
            width: calc(100% - #{pxTovw(200)});
            box-shadow: 7px 0px 12px -11px #999 inset;
            -webkit-box-shadow: 7px 0px 12px -11px #999 inset;
        }
    }

    .sidebar {
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        z-index: 100;
        box-sizing: border-box;
        background: $color-primary;
        scrollbar-color: #c8cdd4;
        scrollbar-width: none;

        .activemenu,
        .activemenu:hover {
            color: #fff;
            border-radius: pxTovw(9);
            background: $color-primary;
        }

        .icon {
            width: pxTovw(32);
            height: pxTovw(32);
            margin-right: pxTovw(20);
        }

        .activeicon {
            fill: #fff;
        }

        &::-webkit-scrollbar {
            width: 0;
            height: pxTovw(3);
        }

        &::-webkit-scrollbar-thumb {
            border-radius: pxTovw(3);
            background: #5576e5;
        }
    }
}

/**
.link_page_title {
    font-size: pxTovw(20);
    font-weight: bold;
    flex: 1;
    text-align: right;
}

.app-wrapper {
    position: absolute;
    height: 100%;
    min-width: pxTovw(1440);
    width: 100%;
    display: flex;
}



.app-wrapper .sidebar .catalogmenu {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: pxTovw(16);
    height: pxTovw(70);
    width: pxTovw(160);
    padding-left: pxTovw(20);
    box-sizing: border-box;
}

.catalogmenu .title {
    flex: 1;
    line-height: pxTovw(25);
}

.app-wrapper .sidebar .catalogmenu:hover {
    background: #e8f4fe;
}



.leftsidebar .btn_control {
    position: absolute;
    right: pxTovw(0);
    top: 50%;
    transform: translate(100%, -50%);
    z-index: 15;
    cursor: pointer;
}

.leftsidebar .btn_control .box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: pxTovw(15);
    height: pxTovw(30);
    background-color: #fff;
}

.btn_control .trigon1,
.btn_control .trigon2 {
    position: absolute;
    top: pxTovw(-15);
    width: 0;
    height: 0;
    border: pxTovw(15) solid transparent;
    border-left-color: #fff;
}

.btn_control .trigon2 {
    top: pxTovw(15);
}

.el-icon-d-arrow-left,
.el-icon-d-arrow-right {
    color: #ccc;
}



.app-wrapper .rightMain {
    width: 100%;
    height: 100%;
    position: relative;
   
}

.app-wrapper .el-pagination .btn-prev {
    background-color: #f0f2f5;
}

.app-wrapper .el-pagination .btn-next {
    background-color: #f0f2f5;
}

.app-wrapper .el-pagination .el-pager {
    background-color: #f0f2f5;
}

.app-wrapper .el-pager li {
    background-color: #f0f2f5;
}



.xuxiang {
    margin-right: pxTovw(20);
    margin-left: pxTovw(20);
    height: pxTovw(22);
    width: 0;
    border-left: pxTovw(1) dashed #e5edf6;
}

.hidemarginleft {
    margin-left: pxTovw(-10);
}





.app_navmenu {
    position: absolute;
    height: pxTovw(30);
    left: 50%;
    transform: translateX(-50%);
    top: pxTovw(27);
    min-width: calc(78% - pxTovw(130));
}

.main_container {
    position: absolute;
    bottom: pxTovw(0);
    left: pxTovw(0);
    top: pxTovw(80);
    right: pxTovw(0);
    background-color: #f0f1f8;
    z-index: 11;
}

.iconMsg {
    position: relative;
    margin-left: pxTovw(20);
}





.pop_tip {
    text-align: center;
    font-size: pxTovw(16);
    font-weight: bold;
    margin-top: pxTovw(10);
}

.success .pop_tip {
    color: #78dd66;
}

.warning .pop_tip {
    color: #e6a23c;
}

.pop_text {
    text-align: center;
    font-size: pxTovw(14);
    color: #555555;
}

.pop_text>p {
    text-align: left;
    display: inline-block;
}

.pop_icon {
    text-align: center;
}

.pop_icon .svg-icon {
    width: pxTovw(80);
    height: pxTovw(80);
}

.success .pop_icon .svg-icon {
    fill: #78dd66;
}

.warning .pop_icon .svg-icon {
    fill: #e6a23c;
}



:deep(.el-dropdown-menu__item:focus,
    .el-dropdown-menu__item:not(.is-disabled):hover) {
    color: $color-primary;
}

:deep(.el-dialog__body) {
    padding: pxTovw(14) pxTovw(20) !important;
}



.menuType_name {
    font-size: pxTovw(14);
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    letter-spacing: pxTovw(2);
}

.menuType_name_drop {
    white-space: nowrap;
    cursor: pointer;
    color: $fontColor;
}
*/
</style>
