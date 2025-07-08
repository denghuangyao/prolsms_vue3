<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  // 父容器位置（x,y,z):第几层的第几列的第几个冻存架格子
  parentLocationXYZ?: string
  // 容器名称
  name: string
  // 容器冻存架抽屉的第几列
  y: string | number
  // 容器冻存架抽屉的第几行
  x: string | number//从下到上，行号递增
  // 容器状态是否停用
  isDisabled?: boolean
  // 容器选择格子：(y):选中第几列的格子
  activeKey?: string
  // 是否允许勾选整个冻存盒
  checkFlag?: boolean
  // 是否已被勾选选中
  isChecked?: boolean;
  // 是否可点击
  isCanClick?: boolean;
}
const emit = defineEmits<{
  'checkChange': [{ isChecked: boolean, rowIndx: any, columnIndx: any }]
  'clickColumnBox': [activeBox: string]
}>()
const { isCanClick, checkFlag, isChecked, parentLocationXYZ, x, y, activeKey } = defineProps<Props>()
let getIsChecked = computed<boolean>(() => isChecked);
let getActiveKey = computed<boolean>(() => {
  // console.log("--parentLocationXYZ--",parentLocationXYZ,"y--",y,"-activeKey--",activeKey);
  let curentBox: any = `${parentLocationXYZ}_${y}`;//当前格子
  let activeBox: any = `${activeKey}`;//当前选中格子
  return curentBox == activeBox;
});

function clickColumnBox() {
  if (!isCanClick && checkFlag) {//点击即选中
    emit("checkChange", { isChecked: !getIsChecked, rowIndx: x, columnIndx: y });
    return;
  }
  let activeBox: any = `${parentLocationXYZ}_${activeKey}`;//当前选中格子
  emit("clickColumnBox", activeBox);
}
function change(isChecked: any) {
  emit("checkChange", { isChecked, rowIndx: x, columnIndx: y });
}
</script>
<template>
  <div
    :class="['rackcolbox', { 'colbox-gray': isDisabled }, getActiveKey || getIsChecked ? `${isDisabled ? 'colbox-deepgray' : 'colbox-active'}` : '']"
    @click="clickColumnBox">
    <el-checkbox class="wl-inner-checkbox" v-if="checkFlag" v-model="getIsChecked" @change="change"></el-checkbox>
    <div class="iconImg">
      <img v-if="isDisabled" src="@assets/images/shengwuyangben/disfrozenbox.png" />
      <img v-else src="@assets/images/shengwuyangben/frozenbox.png" />
    </div>
    <el-tooltip overflow effect="dark" :content="name" placement="top">
      <div class="boxname label-ellipsis">{{ name }}</div>
    </el-tooltip>
  </div>
</template>
<style lang="scss" scoped>
.rackcolbox {
  border: 1px solid #C1C1C1;
  height: 65px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  position: relative;

  .wl-inner-checkbox {
    position: absolute;
    top: 4px;
    right: 4px;
  }

  .iconImg {
    width: 37px;
    height: 31px;

    img {
      width: 100%;
      display: block;
      margin: 0 auto;
    }
  }

  .boxname {
    margin-top: 5px;
    font-size: 14px;
    font-family: NotoSansHans-Regular, NotoSansHans-Regular;
    font-weight: 400;
    color: #8E8E8E;

    &.label-ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      text-align: center;
    }
  }

  &.colbox-active {
    background: #F3F5FF;
    border: 1px solid #7585EE;
  }

  &.colbox-gray {
    background: #E2E2E2;
    border: 1px solid #898989;

    &.colbox-deepgray {
      background: #c2c2c2;
      border: 1px solid #898989;

      .wl-inner-checkbox :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
        background-color: #898989;
        border-color: #898989;
      }
    }
  }

}
</style>