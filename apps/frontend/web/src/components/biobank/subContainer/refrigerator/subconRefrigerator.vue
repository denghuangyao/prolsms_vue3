<script lang="ts" setup>
import { computed } from 'vue';
import type { LevelFirstConInfo, ContainerInfo, LevelSedConInfo } from 'vue3-biobank';

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

const emit = defineEmits<{
  'addSubRongqi': [{ rowIndx: any, columnIndx: any }],
  'addMinRongqi': [{ rowIndx: any, columnIndx: any }],
  'clickSelectRack': [{ rowIndx: any, columnIndx: any }],
  'checkRackChange': [{ isChecked: boolean, rowIndx: any, columnIndx: any }],
  'checkBoxChange': [{ isChecked: boolean, rowIndx: any, columnIndx: any }],
  'handleCheckAllRackChange': [isChecked: boolean],
  'handleCheckAllBoxChange': [isChecked: boolean]
}>()
/**根据容器列数设置容器内每个盒子的宽度，平均分配 */
function distributeWidth(numChildBoxes: any) {
  let percentWidth = Number((100 / numChildBoxes).toFixed(2))
  return `${percentWidth}%`;
}
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
  <div class="subconRefrigerator-container">
    <div class="firstLevelCon">
      <!-- 冰箱 -->
      <refrigerator :isDisRackCheckALL="isDisRackCheckALL" :isRackCheckALL="isRackCheckALL"
        @handleCheckAllChange="handleCheckAllRackChange" checkFlag clickSelectFlag @clickSelectRack="clickSelectRack"
        @checkChange="checkRackChange" :levelFirstConList="levelFirstConList" :containerInfo="containerInfo"
        @addSubRongqi="addSubRongqi" />
    </div>
    <!-- 冻存架视图 -->
    <div class="minorlevel" v-if="levelSedConList.length">
      <div class="minorlevelbox">
        <el-checkbox class="wl-inner-checkbox" :disabled="isDisBoxCheckALL" v-model="getIsBoxCheckALL"
          @change="handleCheckAllBoxChange">勾选全部</el-checkbox>
        <div class="drawerbox" v-for="(levelSedConItem, idx) in levelSedConList" :key="idx">
          <img class="drawerImg" src="@assets/images/shengwuyangben/handle.png" />
          <div class="drawerdiv">
            <div :style="{ width: distributeWidth(levelSedConItem.children?.length) }" class="drawerRow"
              v-for="(item, index) in levelSedConItem.children" :key="`${idx}_${index}`">
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
        <div class="ybinfo-item longItem">
          <el-tooltip overflow effect="dark" :content="levelSedParentCon.name" placement="top">
            <div class="loctxt">
              {{ levelSedParentCon.name }}
            </div>
          </el-tooltip>
        </div>
        <div class="ybinfo-item">
          冻存盒：{{ levelSedParentCon.totalCount }}
        </div>
        <div class="ybinfo-item">
          样本数：{{ levelSedParentCon.sampleQuantity }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.subconRefrigerator-container {
  display: flex;

  .firstLevelCon {
    margin-right: 70px;
  }

  .minorlevel {
    flex: 1;

    .minorlevelbox {
      border: 3px solid #b4bbce;
      padding: 20px 18px;
      box-sizing: border-box;

      .wl-inner-checkbox {
        margin-bottom: 14px;
      }

      // 冻存架-抽屉
      .drawerbox {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 8px;

        &:last-of-type {
          margin-bottom: 0;
        }

        .drawerImg {
          width: 11px;
          height: 53px;
          display: block;
          margin: 0 auto;
        }

        .drawerdiv {
          flex: 1;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: space-around;

          .drawerRow {
            padding-right: 3px;
            box-sizing: border-box;
            height: 65px;
            cursor: pointer;

            &:first-of-type {
              padding-right: 0;
            }

            .emptyAddbox {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #c1c1c1;

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
          }
        }
      }
    }

    .minorlevelInfo {
      background: #f3f5ff;
      border-radius: 12px;
      height: 70px;
      margin-top: 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      .ybinfo-item {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 60px;
        font-size: 14px;
        font-family: NotoSansHans-Regular, NotoSansHans-Regular;
        font-weight: 400;
        color: #262626;

        &.longItem {
          max-width: 50%;

          .loctxt {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>