<script lang="ts" setup>
defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(["update:modelValue", "save", "saveAndSubmit"]);

</script>
<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modelValue" class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <span class="title-text">新增数据</span>
                            <i-ep-close @click="emit('update:modelValue')" class="title-button" />
                        </div>
                        <div class="modal-content">
                            我是一个弹窗
                            <slot></slot>
                            <!-- <slot name="panel-body"></slot> -->
                        </div>
                        <div class="modal-footer">
                            <slot name="panel-footer">
                                <el-button @click="emit('save')" type="primary">保存</el-button>
                                <el-button @click="emit('saveAndSubmit')">保存并提交</el-button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>

        </Transition>
    </Teleport>

</template>
<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-wrapper {
    overflow-y: auto;
    min-width: 30%;
    min-height: pxTovw(200);
}

.modal-container {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-width: 90%;
    max-height: 90%;

    .modal-header {
        display: flex;
        padding: pxTovw(10);
        justify-content: space-between;
        align-items: center;
        border-bottom: pxTovw(0.1) solid #E4E8F1;

        .title-text {
            color: black;
            font-size: pxTovw(16);
        }

        .title-button {
            &:hover {
                cursor: pointer;
                color: $color-primary;
            }
        }
    }

    .modal-footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin: pxTovw(15);
    }
}

.modal-enter-active .modal-container {
    animation: bounce-in 0.5s;
}

.modal-leave-active .modal-container {
    animation: bounce-in 0.5s reverse;
}

/* 遮罩层动画 */
.modal-enter-active .modal-mask,
.modal-leave-active .modal-mask {
    transition: opacity 0.3s;
}

.modal-enter-from .modal-mask,
.modal-leave-to .modal-mask {
    opacity: 0;
}

// /* 内容动画 */
// .modal-enter-active .modal-container {
//     transition:
//         transform 0.3s ease-out,
//         opacity 0.3s ease-out;
// }

// .modal-enter-from .modal-container,
// .modal-leave-to .modal-container {
//     opacity: 0;
//     transform: scale(0.7);
// }

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}
</style>