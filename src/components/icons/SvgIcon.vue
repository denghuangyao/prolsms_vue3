<template>
    <el-icon :size="size" :color="color">
        <slot></slot>
    </el-icon>
</template>
<script lang="ts" setup>
defineProps({
    size: {
        type: [Number, String],
    },
    color: String
})
</script>