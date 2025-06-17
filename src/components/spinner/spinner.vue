<script lang="ts" setup>
defineOptions({
    name: 'VSpinner'
})
</script>
<template>
    <div class="overlay-content">
        <div class="loader">
            <h1>spining。。。</h1>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.overlay-content {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    height: 100%;
    width: 100%;
    background-color: #f6f3f4;
    /* 需要替换为实际颜色 */
    backdrop-filter: blur(4px);
    transition: all 500ms;
    display: flex;
    justify-content: center;
    align-items: center;

    .loader {
        position: relative;
        width: 3rem;
        height: 3rem;

        &::after,
        &::before {
            content: '';
            position: absolute;
            left: 0;
        }

        &::after {
            background-color: $color-primary;
            top: 0;
            height: 100%;
            width: 100%;
            border-radius: 0.25rem;
            animation: loader-jump-ani 0.5s linear infinite;
        }

        &::before {
            background-color: $color-primary; //$color-primary/50透明度
            top: 60px;
            height: 5px;
            width: 3rem;
            border-radius: 50%;
            opacity: 0.5;
            animation: loader-shadow-ani 0.5s linear infinite
        }


    }
}

/**方块动画 */
@keyframes loader-jump-ani {
    15% {
        border-bottom-right-radius: 0.25rem;
    }

    20% {
        transform: translateY(9px) rotate(22.5deg);
    }

    50% {
        border-bottom-right-radius: 3.3rem;
        transform: translateY(18px) rotate(45deg);
    }

    75% {
        transform: translateY(9px) rotate(67.5deg);
    }

    100% {
        transform: translateY(0px) rotate(90deg);
    }
}

/**阴影动画 */
@keyframes loader-shadow-ani {

    0%,
    100% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.2, 1);
    }
}
</style>