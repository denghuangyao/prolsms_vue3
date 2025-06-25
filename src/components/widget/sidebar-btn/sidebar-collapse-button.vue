<script setup lang="ts">
defineOptions({
    name: 'SidebarCollapseButton'
})
const collapse = defineModel<boolean>('collapse')
const handleClick = () => {
    collapse.value = !collapse.value
}
</script>
<template>
    <SidebarButton @click="handleClick">
        <i-ep-DArrowRight v-if="collapse" />
        <i-ep-DArrowLeft v-else />
    </SidebarButton>
</template>
<style scoped lang="scss"></style>