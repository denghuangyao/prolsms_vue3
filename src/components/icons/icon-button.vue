<script lang="ts" setup>
defineOptions({
    name: 'IconButton'
})
</script>
<template>
    <el-icon class="icon-box transition-colors">
        <slot></slot>
    </el-icon>
</template>
<style lang="scss" scoped>
.icon-box {
    cursor: pointer;
    height: pxTovw(30);
    width: pxTovw(30);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    &:hover,
    &:active {
        background-color: #ebf0ff;
    }
}
</style>