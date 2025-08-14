<script lang="ts" setup>
import { computed } from 'vue'
import { ElCheckbox, ElTooltip } from "element-plus";
defineOptions({
  name: "rackRowPlane"
})
interface Props {
  // 容器总行数
  rowCount: number;
  // 容器名称
  name: string;
  // 容器在第几行
  x: string | number;//从下到上，行号递增
  // 容器在第几列
  y: string | number;
  // 容器状态是否停用
  isDisabled: boolean;
  // 容器选择格子：(x,y,num):选中几行几列的第几个格子
  activeKey?: string;
  // 是否允许勾选整个冻存架
  checkFlag: boolean;
  // 是否已被勾选选中
  isChecked?: boolean;
  // 是否允许点击选择整个冻存架
  clickSelectFlag: boolean;
  // 是否已被点击选择
  isSelected?: boolean;
  // 是否是提蓝容器
  isHandBasket?: boolean;
}
const emit = defineEmits<{
  'clickSelectRack': [{ rowIndx: any, columnIndx: any }]
  'checkChange': [{ isChecked: boolean, rowIndx: any, columnIndx: any }]
  'clickBox': [activeBox: string]
}>();
const { isChecked, x, y, clickSelectFlag, isHandBasket = false } = defineProps<Props>()
let getIsChecked = computed<boolean>(() => isChecked);
function getActiveKey(rowNum: any) {
  return `${x},${y},${rowNum}`
}
function clickBox(index: any) {
  if (clickSelectFlag) {//选择整个冻存架
    emit("clickSelectRack", { rowIndx: x, columnIndx: y });
    return;
  }
  // 从下到上，行号递增
  emit("clickBox", `${x},${y},${index}`);
}
function change(isChecked: any) {
  emit("checkChange", { isChecked, rowIndx: x, columnIndx: y });
}
</script>
<template>
  <div :class="['mainbox', { 'basket-main-box': isHandBasket }]">
    <img v-if="isHandBasket" class="minhandlerImg" src="@assets/images/subbaskethandler.png" />
    <div :class="['inner-box', { 'innerbox-gray': isDisabled }]">
      <el-checkbox class="wl-inner-checkbox" v-if="checkFlag" v-model="getIsChecked" @change="change"></el-checkbox>
      <!-- item从1开始 -->
      <div
        :class="['rowdiv', { 'row-gray': isDisabled }, getActiveKey(index) == activeKey || isSelected ? `${isDisabled ? 'row-deepgray' : 'row-active'}` : '']"
        v-for="(_item, index) in rowCount" :key="index" @click="clickBox(index)">
        <div class="line"></div>
      </div>
    </div>
    <el-tooltip overflow effect="dark" :content="name" placement="top">
      <div class="boxname label-ellipsis">{{ name }}</div>
    </el-tooltip>
  </div>
</template>
<style lang="scss" scoped>
@mixin linedot($color) {
  content: "";
  width: 3px;
  height: 3px;
  background: $color;
  border-radius: 50%;
  position: absolute;
  top: -1px;
  // top: 50%;
  // transform: translateY(-50%);
  display: block;
  margin: 0 auto;
}

@mixin lineTop($color) {
  content: "";
  height: 1px;
  border-bottom: 1px solid $color;
  display: block;
  position: absolute;
  top: -1px;
  width: 100%;
  box-sizing: border-box;
}

.mainbox {
  .inner-box {
    position: relative;
    width: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column-reverse; //从下到上，行号递增

    .wl-inner-checkbox {
      position: absolute;
      top: -9px;
      right: 0px;
    }

    &:not(.innerbox-gray) {
      .rowdiv:last-of-type {
        border-top: 1px solid #c1c1c1;
      }
    }

    &.innerbox-gray {
      .rowdiv:last-of-type {
        border-top: 1px solid #898989;
      }

      .wl-inner-checkbox :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
        background-color: #898989;
        border-color: #898989;
      }
    }

    .rowdiv {
      background: #eef5ff;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #c1c1c1;
      border-left: 1px solid #c1c1c1;
      border-right: 1px solid #c1c1c1;
      cursor: pointer;

      .line {
        height: 1px;
        width: 50%;
        border-bottom: 1px solid #c1c1c1;
        box-sizing: border-box;
        position: relative;

        &::before {
          @include linedot(#c1c1c1);
          left: -3px;
        }

        &::after {
          @include linedot(#c1c1c1);
          right: -3px;
        }
      }

      &.row-active {
        background: #E7EBFF;
        border: 1px solid #7585EE;
        border-top: none !important;
        position: relative;

        &::before {
          @include lineTop(#7585EE);
          width: calc(100% + #{pxTovw(2)});
          transform: translateX(0%);
        }

        .line {
          border-bottom: 1px solid #7585EE;

          &::before {
            @include linedot(#7585EE);
            left: -3px;
          }

          &::after {
            @include linedot(#7585EE);
            right: -3px;
          }
        }
      }

      &.row-gray {
        border-bottom: 1px solid #898989;
        border-left: 1px solid #898989;
        border-right: 1px solid #898989;
        background: #e2e2e2;

        .line {
          border-bottom: 1px solid #898989;

          &::before {
            @include linedot(#898989);
            left: -3px;
          }

          &::after {
            @include linedot(#898989);
            right: -3px;
          }
        }

        &.row-deepgray {
          background: #c2c2c2;
        }
      }
    }
  }

  .boxname {
    font-size: 12px;
    font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
    font-weight: 400;
    color: #a1a1a1;
    margin-top: 4px;
    text-align: center;
    margin-bottom: 9px;

    // min-width:50px;
    // max-width: calc(100% - 16px);
    &.label-ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  //提蓝冻存架用
  &.basket-main-box {
    position: relative;

    .minhandlerImg {
      width: 28px;
      display: block;
      position: absolute;
      right: 14px;
    }

    .inner-box {
      padding-top: 36px;

      .rowdiv {
        height: 18px;
        box-sizing: border-box;
      }

      .wl-inner-checkbox {
        top: 28px;
      }
    }
  }
}
</style>