<script lang="ts" setup>
import { ref, watch } from 'vue';
interface Props {
    /**
     * 最小加载时间
     */
    minLoadingTime?: number
    /**
     * @zh-CN loading状态开启
     */
    spinning?: boolean
}
defineOptions({
    name: 'VSpinner'
})
const { minLoadingTime = 50, spinning } = defineProps<Props>()
//加载图标与加载器不同时关闭，加载图标在动画结束后关闭，实现丝滑动画效果
const showSpinner = ref<boolean>(false)
const renderSpinner = ref<boolean>(false)

const timer = ref<ReturnType<typeof setTimeout>>()
watch(() => spinning, (show) => {
    console.log("-show-spinning", spinning, show, minLoadingTime)
    if (!show) {
        showSpinner.value = false
        clearTimeout(timer.value)
        return;
    }
    timer.value = setTimeout(() => {
        showSpinner.value = true
        if (showSpinner.value) {
            renderSpinner.value = true;
        }
    }, minLoadingTime)
}, {
    immediate: true
})
const onTransitionEnd = () => {
    console.log('-onTransitionEnd-')
    //不要立刻停止动画
    if (!showSpinner.value) {
        renderSpinner.value = false;
    }
}
</script>
<template>
    <div class="overlay-content" :class="{ 'invisible': !showSpinner }" @transitionend="onTransitionEnd">
        <div v-if="renderSpinner" class="loader" :class="{ 'pause': !renderSpinner }">
        </div>
    </div>
</template>
<style lang="scss" scoped>
.overlay-content {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 150;
    height: 100%;
    width: 100%;
    background-color: #f6f3f4;
    /* 需要替换为实际颜色 */
    backdrop-filter: blur(4px);
    transition-duration: .5s;
    transition-property: all;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    display: flex;
    justify-content: center;
    align-items: center;

    &.invisible {
        visibility: hidden;
        opacity: 0;
    }

    .loader {
        position: relative;
        width: 3rem;
        height: 3rem;

        &.pause {

            &::before,
            &::after {
                animation-play-state: paused !important;
            }
        }

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
        transform: translateY(18px) scale(1, 0.9) rotate(45deg);
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