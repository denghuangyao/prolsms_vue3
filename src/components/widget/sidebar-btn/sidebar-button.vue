<script setup lang="ts">
defineOptions({
    name: "SidebarButton"
})
</script>
<template>
    <div class="button-box transition-colors">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.button-box {
    border-radius: calc(var(--radius) - 4px);
    padding: .25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--accent);
    color: hsl(var(--foreground-hsl)/0.6);

    &:hover {
        background-color: var(--accent-hover);
        color: hsl(var(--foreground-hsl));
    }
}
</style>