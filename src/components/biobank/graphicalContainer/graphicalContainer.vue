<script lang="ts" setup>
import {
  rackColumnPlane,
  boxPlane,
  liquidNitrogenContainer,
  refrigerator,
  type GraphicalContainer,
  useGraphicalContainer
} from './graphicalContainer'
const props = defineProps<GraphicalContainer>()
let { boxConMap, clickColumnBox, showSampleId, openYBDetail, yangbenInfoList, drawerActiveKey, multiSelect, levelThirdCon, clickBoxnum, boxActiveKeys, containerInfo, toggleHandBacket, addSubRongqi, addMinRongqi, activeKey, levelSedParentCon, levelSedConList, distributeWidth, clickBox, levelFirstConList } = useGraphicalContainer(props);

</script>
<template>
  <div
    :class="['graphicalContainer', { 'bxAutoW': rowData.type == 'REFRIGERATOR' }, { 'ydgAutoW': rowData.type == 'NITROGEN_CYLINDER' }]">
    <div class="maincontainer" v-if="rowData">
      <div class="firstLevelCon">
        <!-- 冰箱 -->
        <refrigerator v-if="rowData.type == 'REFRIGERATOR'" :levelFirstConList="levelFirstConList"
          :activeKey="activeKey" :containerInfo="containerInfo" @clickBox="clickBox" @addSubRongqi="addSubRongqi" />
        <!-- 液氮罐 -->
        <liquid-nitrogen-container v-if="rowData.type == 'NITROGEN_CYLINDER'" :levelFirstConList="levelFirstConList"
          :containerInfo="containerInfo" :activeKey="activeKey" @clickRowBox="clickBox" @clickBox="clickBox"
          @toggleHandBacket="toggleHandBacket" @addSubRongqi="addSubRongqi" />
      </div>
      <!-- 冻存架 -->
      <div class="minorlevel">
        <!-- 抽屉 -->
        <div class="sublevel" v-if="activeKey">
          <div class="infotitle subtitle">
            <svg-icon name="dcjct" class="svgIcon"></svg-icon>
            {{ rowData.type == 'REFRIGERATOR' ? '抽屉' : '提篮层' }}
          </div>
          <div class="drawerbox">
            <img class="drawerImg" src="@assets/images/shengwuyangben/handle.png" />
            <div class="drawerdiv">
              <div :style="{ width: distributeWidth() }" class="drawerRow" v-for="(item, index) in levelSedConList"
                :key="index">
                <rack-column-plane v-if="item" :isDisabled="item.status == 'DISABLED'"
                  :parentLocationXYZ="item.parentLocationXYZ" :name="item.name" @clickColumnBox="clickColumnBox(item)"
                  :activeKey="drawerActiveKey" :x="item.rackRow - 1" :y="item.rackColumn - 1" />

                <div :class="['emptyAddbox', { 'disAddBox': levelSedParentCon.status == 'DISABLED' }]" v-else
                  @click="addMinRongqi(index)">
                  <svg-icon name="xzct" class="addIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 冻存盒 -->
        <div class="minlevel" v-if="drawerActiveKey">
          <div class="infotitle subtitle">
            <svg-icon name="dch" class="svgIcon"></svg-icon>
            冻存盒
          </div>
          <div class="freezebox">
            <box-plane ref="boxPlanRef" v-if="levelThirdCon" :openCtrlSelected="openCtrlSelected" :boxMap="boxConMap"
              :activeKey="boxActiveKeys" :rowCount="levelThirdCon.rowCount" :columnCount="levelThirdCon.columnCount"
              @clickBoxnum="clickBoxnum" @multiSelect="multiSelect" />
          </div>
          <div class="minlevelInfo">
            <div class="ybinfo-item longItem">
              <el-tooltip overflow effect="dark" :content="levelThirdCon.fromToLocation" placement="top">
                <div class="loctxt">
                  {{ levelThirdCon.fromToLocation }}
                </div>
              </el-tooltip>
            </div>
            <div class="ybinfo-item">
              规格：{{ levelThirdCon.rowCount }}X{{ levelThirdCon.columnCount }}
            </div>
            <div class="ybinfo-item">
              样本数：{{ levelThirdCon.sampleQuantity }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="yangbenInfo" v-show="showSampleId">
      <div class="infotitle maintitle">
        <svg-icon name="ybxx" class="svgIcon"></svg-icon>
        样本信息
      </div>
      <div class="infoItem" v-for="(item, index) in yangbenInfoList" :key="index">
        <div class="item-label">{{ item.label }}：</div>
        <el-tooltip overflow effect="dark" :content="`${item.value}`" placement="top">
          <div :class="['item-value', 'wl-singleline-text', { 'isLink': item.isLink }]" @click="openYBDetail">{{
            item.value }}
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.infotitle {
  display: flex;
  font-size: 16px;
  padding-left: 4px;

  .svgIcon {
    margin-right: 8px;
    height: 18px;
    width: 18px;
    fill: #121212;
    padding-top: 2px;
  }

  &.maintitle {
    color: #262626;
  }

  &.subtitle {
    color: #3d3d3d;
    margin-bottom: 15px;
    padding-left: 10px;

  }
}

.emptyAddbox.disAddBox {
  border: 1px solid #898989;
  background: #E2E2E2;

  .addIcon {
    fill: #898989;
  }

  cursor:no-drop;
}

.graphicalContainer {
  height: 100%;
  box-sizing: border-box;
  display: grid;

  &.bxAutoW {
    //冰箱样本信息宽度
    grid-template-columns: auto 380px;
  }

  &.ydgAutoW {
    //液氮罐样本信息宽度
    grid-template-columns: auto 245px;
  }

  padding: 20px 40px;
  font-family: NotoSansHans-Regular,
  NotoSansHans-Regular;

  .maincontainer {
    grid-column: 1;
    display: flex;
    padding-bottom: 20px;
    box-sizing: border-box;
  }

  //右侧样本信息样式
  .yangbenInfo {
    grid-column: 2;

    .infoItem {
      font-size: 14px;
      line-height: 45px;
      height: 45px;
      display: flex;
      flex-direction: row;
      flex-flow: nowrap;

      .item-label {
        color: #8e8e8e;
        min-width: 90px;
        padding-right: 5px;
        box-sizing: border-box;
      }

      .item-value {
        color: #262626;

        &.isLink {
          cursor: pointer;
          text-decoration: underline;
          color: #3557cc;
        }
      }

      border-bottom: 1px solid #e9e9e9;

      &:last-of-type {
        border: none;
      }
    }
  }
}

.graphicalContainer .maincontainer .minorlevel {
  flex: 1;
  margin: 0 40px;
  min-width: 488px; //设置最大宽度，冻存盒最大10，固定容器位置
  box-sizing: border-box;

  .sublevel {

    // 冻存架-抽屉
    .drawerbox {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

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
            border: 1px solid #C1C1C1;

            &:not(.disAddBox):active {
              background: #eee;
            }

            .addIcon {
              width: 16px;
              height: 16px;
              fill: #C1C1C1;
            }
          }
        }
      }
    }
  }

  .minlevel {
    margin-top: 20px;

    // max-width: 490px;
    .minlevelInfo {
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