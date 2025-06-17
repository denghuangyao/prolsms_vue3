<script lang="ts" setup>
</script>
<template>
    <main class="layout-conent">
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
        <slot name="content-overlay"></slot>
    </main>
</template>

<style scoped lang="scss">
.layout-conent {
    width: 100%;
    position: relative;
    height: 100%;
}
</style>