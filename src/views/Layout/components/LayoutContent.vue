<script lang="ts" setup>
</script>
<template>
    <main class="layout-content">
        <RouterView v-slot="{ Component }">
            <template v-if="Component">
                <!-- appear初次渲染是有过渡效果 -->
                <Transition appear mode="out-in" name="fade-slide">
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
        <slot name="content-overlay"></slot>
    </main>
</template>

<style scoped lang="scss">
.layout-content {
    width: 100%;
    position: relative;
    height: 100%;

    .fade-slide-leave-active,
    .fade-slide-enter-active {
        transition: all 0.3s;
    }

    .fade-slide-enter-from {
        opacity: 0;
        transform: translate(-30px);
    }

    .fade-slide-leave-to {
        opacity: 0;
        transform: translate(30px);
    }
}
</style>