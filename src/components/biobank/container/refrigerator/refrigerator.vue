<script lang="ts" setup>
import { computed, watch } from "vue";
import rackRowPlane from "../rackplane/rackRowPlane.vue"
import type { ContainerInfo, LevelFirstConInfo } from '../../types'
interface Props {
  //第一层级容器：液氮罐数据
  containerInfo: ContainerInfo;
  //第一层级容器：冰箱所有冻存架列表（包含未创建冻存架格子）
  levelFirstConList: LevelFirstConInfo[];
  //存放冰箱-冻存架的键值对 x,y=data
  levelFirstConMap?: Map<string, LevelFirstConInfo>;
  // 容器选择格子：(x,y,num):选中几行几列的第几个格子
  activeKey: string;
  // 是否允许勾选整个冻存架
  checkFlag?: boolean;
  // 是否允许点击选择整个冻存架
  clickSelectFlag?: boolean;
  // 是否已勾选全部冻存架
  isRackCheckALL?: boolean;
  // 是否禁用冻存架的勾选全部
  isDisRackCheckALL?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  activeKey: '',
  isDisRackCheckALL: false,
  checkFlag: false,
  clickSelectFlag: false,
  isRackCheckALL: false,
  containerInfo: () => ({}),
  levelFirstConList: () => [],
  levelFirstConMap: () => new Map()
})
let getIsRackCheckALL = computed<boolean>(() => props.isRackCheckALL);//是否已勾选冻存架全部
const emit = defineEmits<{
  'clickBox': [activeXYZ: any],
  'addSubRongqi': [{ rowIndx: any, columnIndx: any }]
  'clickSelectRack': [{ rowIndx: any, columnIndx: any }],
  'checkChange': [{ isChecked: boolean, rowIndx: any, columnIndx: any }]
  'handleCheckAllChange': [isChecked: boolean]
}>()
/**根据容器列数设置容器内每个盒子的宽度，平均分配 */
function distributeWidth(numChildBoxes: any) {
  let percentWidth = Number((100 / numChildBoxes).toFixed(2))
  return `${percentWidth}%`;
}
// 点击冰箱-》冻存架
function clickBox(activeXYZ: any) {
  // this.activeKey=activeXYZ;
  emit("clickBox", activeXYZ);
}
function addSubRongqi({ rowIndx, columnIndx }: any) {
  emit("addSubRongqi", { rowIndx, columnIndx })
}
function clickSelectRack({ rowIndx, columnIndx }: any) {
  emit("clickSelectRack", { rowIndx, columnIndx });
}
function checkChange({ isChecked, rowIndx, columnIndx }: any) {
  // console.log("-isChecked--",isChecked,"item--",item)
  emit("checkChange", { isChecked, rowIndx, columnIndx })
}
function handleCheckAllChange(isChecked: any) {
  emit("handleCheckAllChange", isChecked);
}
// watch(() => props, () => {
//   console.log('-props-', props.levelFirstConList)
// }, {
//   immediate: true,
//   deep: true
// })
</script>
<template>
  <div class="mainlevel">
    <div class="levelOne">
      <div class="innerLevelOne">
        <el-checkbox class="wl-inner-checkbox" :disabled="isDisRackCheckALL" v-model="getIsRackCheckALL"
          @change="handleCheckAllChange" v-if="checkFlag">勾选全部</el-checkbox>
        <!-- 冻存架行的平面图 -->
        <div class="LevelRow" v-for="(item, rowIndx) in levelFirstConList" :key="rowIndx">
          <template v-if="item?.children?.length">
            <div :style="{ width: distributeWidth(item.maxRackQuantity) }" class="LevelColumn"
              v-for="(i, columnIndx) in item.children" :key="`${rowIndx},${columnIndx}`">
              <rack-row-plane :clickSelectFlag="clickSelectFlag" :isSelected="i.isSelected"
                @clickSelectRack="clickSelectRack" :isChecked="i.isChecked" :checkFlag="checkFlag"
                @checkChange="checkChange" v-if="i" @clickBox="clickBox" :activeKey="activeKey" :rowCount="i.rowCount"
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
    </div>
    <div class="levelOneInfo">
      <!-- 容器名称 -->
      <div class="info-item">
        <el-tooltip overflow effect="dark" :content="containerInfo.name" placement="top">
          <div class="info-label label-ellipsis">{{ containerInfo.name }}</div>
        </el-tooltip>
        <div class="info-value">{{ containerInfo.rowCount }}<span>层</span></div>
      </div>
      <!-- 冻存架/提篮数 -->
      <div class="info-item">
        <div class="info-label">冻存架</div>
        <div class="info-value">{{ containerInfo.rackQuantity }}</div>
      </div>
      <!-- 样本数 -->
      <div class="info-item">
        <div class="info-label">样本数</div>
        <div class="info-value">{{ containerInfo.sampleQuantity }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wl-inner-checkbox {
  margin-bottom: 10px;
  margin-left: 5px;
}

.mainlevel {
  width: 343px;
}

.emptyAddbox.disAddBox {
  border: 1px solid #898989;
  background: #E2E2E2;

  .addIcon {
    fill: #898989;
  }

  cursor:no-drop;
}

// 冰箱容器样式S
.levelOne {
  background-image: url("@assets/images/shengwuyangben/refrigerator.png");
  width: 343px;
  height: 625px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;

  //冰箱=》冻存架容器存放区域样式
  .innerLevelOne {
    position: absolute;
    left: 26px;
    top: 46px;
    width: calc(100% - 54px);
    height: calc(100% - 203px);
    padding: 13px 8px;
    box-sizing: border-box;
    overflow-y: auto;
    /* 隐藏滚动条 */
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;

    /* IE 10+ */
    &::-webkit-scrollbar {
      display: none;
      /* Chrome Safari */
    }

    .LevelRow {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: space-around;

      .LevelColumn {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .emptybox {
          padding: 0 5px;
          box-sizing: border-box;
          height: 100%;
          min-height: 65px;

          .emptyAddbox {
            border: 1px solid #c1c1c1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            height: calc(100% - 25px);

            &:not(.disAddBox):active {
              background: #eee;
            }

            .addIcon {
              width: 18px;
              height: 18px;
              fill: #c1c1c1;
            }
          }
        }
      }
    }
  }
}

.levelOneInfo {
  margin: 0 auto;
  margin-top: 20px;
  height: 70px;
  background: #f3f5ff;
  border-radius: 12px;
  padding: 0 25px;
  display: flex;
  width: 292px;
  box-sizing: border-box;

  .info-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
    line-height: 24px;
    color: #262626;
    width: 33%;

    .info-label {
      height: 24px;
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
}

// 冰箱容器样式E</style>