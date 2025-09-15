<script lang="ts" setup>
import { ElDatePicker } from 'element-plus';
interface Props {
  maxlen?: number;
  title?: string;
  menuList?: any[];
  activeKey?: string | number;
  shwoPicker?: boolean;
  dateObj?: {
    //时间选择器配置项
    time: Date;
    type: any;
    format: string;
    placeholder?: string;
    rangeSeparator?: string;
    pickerOptions?: any;
  };
  enableMouse?: boolean;
  autoCarousel?: boolean; // 是否开启自动轮播
  carouselTime?: number;
}
let {
  title = '',
  menuList = [],
  activeKey = '',
  shwoPicker = false,
  dateObj = {
    type: 'month',
    format: 'yyyy-MM',
    time: new Date(),
  },
  enableMouse = false,
  autoCarousel = false,
} = defineProps<Props>();
let pickOptions: any = {
  disabledDate(time: any) {
    return time.getTime() < Date.now() - 365 * 30 * 24 * 60 * 60 * 1000;
  },
};
const emit = defineEmits<{
  selectTabChange: [key: any];
  changeTime: [key: any];
}>();

function handleSelect(key: any) {
  emit('selectTabChange', key);
}
function handleChange(date: any) {
  emit('changeTime', date);
}
</script>
<template>
  <div class="title-box titleImgBg">
    <div class="title" v-if="title">{{ title }}</div>
    <title-tab
      v-if="menuList.length"
      :menuList="menuList"
      :maxlen="maxlen"
      @handleSelect="handleSelect"
      :activeKey="activeKey"
      :enableMouse="enableMouse"
      :autoCarousel="autoCarousel"
      :carouselTime="carouselTime"
    />
    <el-date-picker
      class="dpDatePicker"
      v-if="shwoPicker"
      popper-class="dpDatePickerPanel"
      v-model="dateObj.time"
      :type="dateObj.type"
      @change="handleChange"
      :format="dateObj.format"
      :value-format="dateObj.format"
      :placeholder="dateObj.placeholder"
      :range-separator="dateObj.rangeSeparator || '至'"
      :clearable="false"
      :picker-options="dateObj.pickerOptions || pickOptions"
    ></el-date-picker>
  </div>
</template>

<style scoped lang="scss">
.title-box {
  height: pxTovw(40);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &.titleImgBg {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: pxTovw(40);
    background-image: url('@assets/images/largeScreen/block_titlebg.png');
  }

  .title {
    font-family:
      Source Han Sans,
      Source Han Sans;
    font-weight: 700;
    font-size: pxTovw(16);
    color: #ffffff;
    padding-left: pxTovw(26);
    box-sizing: border-box;
  }

  // 月份选择器输入框
  :deep(.el-date-editor.el-input) {
    width: pxTovw(100);
    margin-left: pxTovw(30);

    .el-icon-date:before {
      color: rgba(40, 216, 244, 0.3);
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
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: inset 0px 0px 3px 0px rgba(40, 216, 244, 0.3);
    color: #ffffffaa;
    border-radius: pxTovw(8);
  }
}

.dpDatePicker {
  :deep(&.el-date-editor) {
    background: transparent;
    box-shadow: inset 0px 2px 12px 0px rgba(40, 216, 244, 0.3);
    border-radius: pxTovw(4);
    border: 1px solid rgba(27, 224, 254, 0.3);
    .el-input__icon {
      color: #1be0fe;
    }
    .el-range-input {
      background: transparent;
      font-weight: 500;
      font-size: 14px;
      color: #fff !important;
      width: pxTovw(80);
    }
    .el-range-separator {
      font-size: 14px;
      color: #fff !important;
    }
  }
}
</style>
<style lang="scss">
.dpDatePickerPanel {
  &[x-placement^='bottom'] .popper__arrow {
    border-bottom-color: #1be0fe !important;
    &::after {
      border-bottom-color: transparent !important;
    }
  }
  &.el-picker-panel {
    border: 0.0625rem solid #5fd5ec;
    -webkit-box-shadow: inset 0px 0px 4px 0px #66dff4;
    box-shadow: inset 0px 0px 4px 0px #66dff4;
    background: #001c32;
    color: #fff;
    .el-year-table,
    .el-month-table {
      td {
        &.disabled .cell {
          background-color: #9093992e;
          cursor: not-allowed;
          border-radius: 5px;
          color: #606266;
        }

        &.current:not(.disabled) {
          .cell {
            color: #1be0fe;
          }
        }

        .cell {
          color: #ffffffaa;

          &:hover {
            color: #1be0fe;
            opacity: 0.6;
          }
        }
      }
    }
    .el-date-picker__header--bordered {
      border-bottom: none;
    }

    .el-date-picker__header-label {
      color: #1be0fe;
    }

    .el-date-picker__header-label:hover {
      color: #1be0fe;
      opacity: 0.6;
    }

    .el-picker-panel__icon-btn {
      color: #fff;
    }

    .el-picker-panel__icon-btn:hover {
      color: #1be0fe;
    }
    .el-date-table {
      th {
        color: #fff;
      }
      .el-date-table__row {
        td.available.in-range {
          div {
            background-color: #6cbfcc;
            color: #fff;
          }
        }
        td.today span {
          color: #0f8a9c !important;
        }
        td.start-date span,
        td.end-date span {
          background-color: #1be0fe;
        }
        td.disabled div {
          background-color: #cdcdcd;
          color: #737272;
        }
      }
    }
  }
}
</style>
