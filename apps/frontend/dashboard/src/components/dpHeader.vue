<template>
  <div class="header">
    <div class="text-view">
      <div class="title" @click="handleScreenFull">{{ title }}</div>
      <div class="t-right">
        <div v-if="isShowTime" class="time">
          <span class="date-value">{{ date }}</span>
          <span class="time-value">{{ time }}</span>
        </div>
        <el-date-picker
          v-if="shwoPicker && dateObj"
          v-model="dateObj.time"
          :type="dateObj.type"
          @change="handleChange"
          :format="dateObj.format"
          :value-format="dateObj.format"
          :placeholder="dateObj.placeholder"
          :clearable="false"
          :picker-options="dateObj.pickerOptions"
        ></el-date-picker>
        <slot name="header_slot"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElDatePicker } from 'element-plus';
import { computed, nextTick } from 'vue';
import { useFullscreen, useDateFormat, useNow } from '@vueuse/core';
let { toggle } = useFullscreen();
interface Props {
  title: string;
  isShowTime?: boolean;
  shwoPicker?: boolean; //是否显示时间选择器
  dateObj?: {
    type: any;
    format: string;
    time: Date | string;
    placeholder?: string;
    pickerOptions?: any;
  };
}
const {
  title = '数据监控平台大屏',
  isShowTime = true,
  shwoPicker = false,
  dateObj = {
    type: 'month',
    format: 'yyyy-MM',
    time: new Date(),
  },
} = defineProps<Props>();
const emit = defineEmits<{
  changeTime: [date: Date | string];
}>();
const currentTime = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss');
const date = computed(() => {
  return currentTime.value?.split(' ')[0];
});
const time = computed(() => {
  return currentTime.value?.split(' ')[1];
});
function handleChange(date: any) {
  emit('changeTime', date);
}
function handleScreenFull() {
  nextTick(() => {
    toggle(); //切换全屏
  });
}
</script>
<style scoped lang="scss">
.header {
  width: 100%;
  height: clampPxCustom(22px, 67);
  position: relative;
  box-sizing: border-box;

  background: url('@assets/images/largeScreen/titlebg.png') 0% 0% / 100% 100% no-repeat;
  .text-view {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    .title {
      flex: 1;
      height: 100%;
      line-height: 1.95;
      font-family:
        Source Han Sans,
        Source Han Sans;
      font-weight: 700;
      font-size: clampPxCustom(13px, 34);
      letter-spacing: pxTovw(3);
      text-align: center;
      background: linear-gradient(90deg, #ffffff 30%, #30d4f1 99%, #26d2f0 100%);
      color: #ffffff; // 兜底颜色，防止文字裁剪不生效
      background-clip: text;
      -webkit-background-clip: text; // 背景被裁减为文字的前景色
      -webkit-text-fill-color: transparent; // 文字填充为透明，优先级比color高。
    }

    .t-right {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: pxTovw(30);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      // 月份选择器输入框
      :deep(.el-date-editor.el-input) {
        width: pxTovw(120);
        margin-left: pxTovw(30);
        // margin-right: pxTovw(16);

        .el-icon-date:before {
          color: #5fd5ec;
          // display: none;
        }
      }

      :deep(.el-input--mini) {
        font-size: pxTovw(14);
      }

      :deep(.el-input--mini .el-input__inner) {
        height: pxTovw(30);
        line-height: pxTovw(30);
        padding-right: 0;
        background-color: transparent;
        border-color: #5fd5ec;
        box-shadow: inset 0px 0px 3px 0px rgba(40, 216, 244, 0.3);
        color: #ffffffaa;
        border-radius: pxTovw(8);
      }
      .time {
        color: #fff;
        font-size: clampPxCustom(12px, 18);
        .time-value {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 2%;
        }

        .date-value {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 6%;
        }
      }
    }
  }
}
@media (max-width: 600px) {
  .header .text-view .t-right {
    .date-value {
      right: unset;
      left: 5%;
    }
    .time-value {
      left: unset;
      right: 5% !important;
    }
  }
}
</style>
