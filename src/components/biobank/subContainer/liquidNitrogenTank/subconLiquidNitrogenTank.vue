<script lang="ts" setup>
import { computed } from 'vue';
import type { LevelFirstConInfo, ContainerInfo, LevelSedConInfo } from '../../types';

interface Props {
  //第一层级容器：液氮罐数据
  readonly containerInfo: ContainerInfo;
  //第一层级容器：冰箱所有冻存架列表（包含未创建冻存架格子）
  readonly levelFirstConList: LevelFirstConInfo[];
  //第二层级容器：冻存架内所有的冻存盒列表（包含未创建冻存盒格子）
  readonly levelSedConList: LevelSedConInfo[];
  //（选中的）第二层容器：冻存架
  readonly levelSedParentCon: LevelSedConInfo;
  // 是否允许勾选整个冻存架
  checkFlag: boolean;
  // 是否允许点击选择整个冻存架
  clickSelectFlag: boolean;
  // 是否勾选全部冻存盒
  isBoxCheckALL: boolean
  // 是否勾选全部冻存架
  isRackCheckALL: boolean;
  // 是否禁用冻存盒的勾选全部
  isDisBoxCheckALL: boolean;
  // 是否禁用冻存架的勾选全部
  isDisRackCheckALL: boolean;
}
const { isBoxCheckALL, isRackCheckALL } = withDefaults(defineProps<Props>(), {
  isBoxCheckALL: false,
  isRackCheckALL: false,
  checkFlag: false,
  clickSelectFlag: false,
  isDisBoxCheckALL: false,
  isDisRackCheckALL: false,
})
let getIsBoxCheckALL = computed(() => isBoxCheckALL)
let getIsRackCheckALL = computed(() => isRackCheckALL)
const emit = defineEmits<{
  'addSubRongqi': [{ rowIndx: any, columnIndx: any }],
  'addMinRongqi': [{ rowIndx: any, columnIndx: any }],
  'clickSelectRack': [{ rowIndx: any, columnIndx: any }],
  'checkRackChange': [{ isChecked: boolean, rowIndx: any, columnIndx: any }],
  'checkBoxChange': [{ isChecked: boolean, rowIndx: any, columnIndx: any }],
  'handleCheckAllRackChange': [isChecked: boolean],
  'handleCheckAllBoxChange': [isChecked: boolean]
}>()
/**新增冰箱-冻存架 */
function addSubRongqi({ rowIndx, columnIndx }: any) {
  emit('addSubRongqi', { rowIndx, columnIndx });
}
/**新增冻存架-冻存盒 */
function addMinRongqi(rowIndx: any, columnIndx: any) {
  console.log('-addMinRongqi-rowIndx,columnIndx-', rowIndx, columnIndx);
  emit('addMinRongqi', { rowIndx, columnIndx });
}
/**点击某一个冻存架
 * @param rowIndx：冻存架的第几层索引值
 * @param columnIndx：冻存架的第几列索引值
 */
function clickSelectRack({ rowIndx, columnIndx }: any) {
  emit('clickSelectRack', { rowIndx, columnIndx });
}
function checkRackChange({ isChecked, rowIndx, columnIndx }: any) {
  console.log('-isChecked,rowIndx,columnIndx--', isChecked, rowIndx, columnIndx);
  emit('checkRackChange', { isChecked, rowIndx, columnIndx });
}
function checkBoxChange({ isChecked, rowIndx, columnIndx }: any) {
  emit('checkBoxChange', { isChecked, rowIndx, columnIndx });
}
function handleCheckAllRackChange(isChecked: any) {
  emit('handleCheckAllRackChange', isChecked);
}
function handleCheckAllBoxChange(isChecked: any) {
  emit('handleCheckAllBoxChange', isChecked);
}
</script>
<template>
  <div class="subconYedanguan-container">
    <div class="firstLevelCon">
      <div class="innerLevelOne">
        <el-checkbox class="wl-inner-checkbox" :disabled="isDisRackCheckALL" v-model="getIsRackCheckALL"
          @change="handleCheckAllRackChange">勾选全部</el-checkbox>
        <!-- 冻存架行的平面图 -->
        <div class="LevelRow" v-for="(item, rowIndx) in levelFirstConList" :key="rowIndx">
          <template v-if="item.children?.length">
            <div class="LevelColumn" v-for="(i, columnIndx) in item.children" :key="`${rowIndx},${columnIndx}`">
              <rack-row-plane isHandBasket clickSelectFlag :isSelected="i.isSelected" @clickSelectRack="clickSelectRack"
                :isChecked="i.isChecked" checkFlag @checkChange="checkRackChange" v-if="i" :rowCount="i.rowCount"
                :name="i.name" :isDisabled="i.status == 'DISABLED'" :x="i.storey - 1" :y="i.storeyColumn - 1" />
              <div class="emptybox" v-else>
                <div :class="['emptyAddbox', { 'disAddBox': containerInfo.status == 'DISABLED' }]"
                  @click="addSubRongqi({ rowIndx, columnIndx })">
                  <svg-icon name="xzdcj" class="addIcon" />
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="levelInfo">
        <!-- 容器名称 -->
        <div class="info-item">
          <el-tooltip overflow effect="dark" :content="containerInfo.name" placement="top">
            <div class="info-label label-ellipsis">{{ containerInfo.name }}</div>
          </el-tooltip>
          <div class="info-value">{{ containerInfo.specs }}L</div>
        </div>
        <!-- 提篮数 -->
        <div class="info-item">
          <div class="info-label">提篮数</div>
          <div class="info-value">{{ containerInfo.rackQuantity }}</div>
        </div>
        <!-- 样本数 -->
        <div class="info-item">
          <div class="info-label">样本数</div>
          <div class="info-value">{{ containerInfo.sampleQuantity }}</div>
        </div>
      </div>
    </div>
    <!-- 冻存架视图 -->
    <div class="minorlevel" v-if="levelSedConList.length">
      <img class="flatdrawerImg" src="@assets/images/shengwuyangben/flathandle.png" />
      <div class="minorlevelbox">
        <el-checkbox class="wl-inner-checkbox" :disabled="isDisBoxCheckALL" v-model="getIsBoxCheckALL"
          @change="handleCheckAllBoxChange">勾选全部</el-checkbox>
        <div class="drawerbox">
          <div class="drawerdiv" v-for="(levelSedConItem, idx) in levelSedConList" :key="idx">
            <div class="drawerRow" v-for="(item, index) in levelSedConItem.children" :key="`${idx}_${index}`">
              <rack-column-plane :isCanClick="false" :isChecked="item.isChecked" checkFlag @checkChange="checkBoxChange"
                v-if="item" :isDisabled="item.status == 'DISABLED'" :name="item.name" :x="item.rackRow - 1"
                :y="item.rackColumn - 1" />
              <div :class="['emptyAddbox', { 'disAddBox': levelSedParentCon.status == 'DISABLED' }]" v-else
                @click="addMinRongqi(idx, index)">
                <svg-icon name="xzct" class="addIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="minorlevelInfo">
        <div class="info-item">
          <el-tooltip overflow effect="dark" :content="levelSedParentCon.name" placement="top">
            <div class="info-label label-ellipsis">{{ levelSedParentCon.name }}</div>
          </el-tooltip>
        </div>
        <div class="info-item">
          冻存盒：{{ levelSedParentCon.totalCount }}
        </div>
        <div class="info-item">
          样本数：{{ levelSedParentCon.sampleQuantity }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subconYedanguan-container {
  .emptybox {
    padding: 0 5px;
    box-sizing: border-box;
    padding-top: 36px;

    .emptyAddbox {
      min-height: 180px;
    }
  }

  .emptyAddbox {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #c1c1c1;
    cursor: pointer;

    &:not(.disAddBox):active {
      background: #eee;
    }

    .addIcon {
      width: 16px;
      height: 16px;
      fill: #c1c1c1;
    }

    &.disAddBox {
      border: 1px solid #898989;
      background: #E2E2E2;

      .addIcon {
        fill: #898989;
      }

      cursor:no-drop;
    }
  }

  display: flex;

  .firstLevelCon {
    width: 710px;

    .innerLevelOne {
      width: 100%;
      height: 547px;
      border: 3px solid #B4BBCE;
      box-sizing: border-box;
      padding: 15px 30px;

      .wl-inner-checkbox {
        margin-bottom: 10px;
        margin-left: 5px;
      }

      .LevelRow {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-column-gap: 8%;

        .LevelColumn {
          width: 80px;
        }
      }
    }
  }

  .minorlevel {
    position: relative;
    margin-left: 118px;
    width: 153px;

    .flatdrawerImg {
      width: 64px;
      height: 13px;
      display: block;
      margin: 0 auto;
      position: absolute;
      top: -13px;
      left: 50%;
      transform: translateX(-50%);
    }

    .minorlevelbox {
      height: 530px;
      border: 3px solid #B4BBCE;
      padding: 20px 10px;
      box-sizing: border-box;
      overflow-y: auto;
      margin-bottom: 13px;

      /* 修改滚动条的宽度、颜色和样式 */
      &::-webkit-scrollbar {
        width: 10px;
        /* 宽度 */
        box-sizing: border-box;
      }

      &::-webkit-scrollbar-track {
        background: #D8D8D8;
        /* 背景颜色 */
      }

      &::-webkit-scrollbar-thumb {
        background: #FFFFFF;
        /* 拖动条颜色 */
        border-radius: 8px;
        width: 4px;
        border: 3px solid transparent;
        background-clip: content-box;
        -webkit-background-clip: content-box;
        /* Safari 4+, Chrome 1-3 */
        -moz-background-clip: content-box;
        /* Firefox 3.6+ */
      }

      // &::-webkit-scrollbar-thumb:hover {
      //   background: #eee; /* 鼠标悬停时的颜色 */
      //   border: 3px solid transparent;
      //   background-clip: content-box; 
      //   -webkit-background-clip: content-box; /* Safari 4+, Chrome 1-3 */
      //   -moz-background-clip: content-box; /* Firefox 3.6+ */
      // }

      .drawerbox {
        margin-top: 20px;

        .drawerdiv {
          margin-bottom: 8px;

          &:last-of-type {
            margin-bottom: 0;
          }

          .drawerRow {
            box-sizing: border-box;
            height: 65px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .info-item {
    line-height: 24px;

    .info-label {
      font-size: 14px;
      font-weight: 400;

      &.label-ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .info-value {
      font-size: 16px;
      font-weight: 500;
    }
  }

  .levelInfo {
    margin: 0 auto;
    margin-top: 20px;
    height: 70px;
    background: #f3f5ff;
    border-radius: 12px;
    padding: 0 25px;
    display: flex;
    box-sizing: border-box;
    width: 100%;

    .info-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 10px;
      line-height: 24px;
      color: #262626;
      width: 33%;
    }
  }

  .minorlevelInfo {
    height: 91px;
    background: #F3F5FF;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 7px;
    box-sizing: border-box;

    .info-item {
      width: 100%;
      text-align: center;
    }
  }
}
</style>