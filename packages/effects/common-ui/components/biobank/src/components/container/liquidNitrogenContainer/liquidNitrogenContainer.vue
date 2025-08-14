<script lang="ts" setup>
import { ElTooltip } from 'element-plus'
import { watch, ref, nextTick } from 'vue';
import type { ContainerInfo, LevelFirstConInfo } from '../../types.ts'
import handbasketRowPlane from "../handbasketRowPlane/handbasketRowPlane.vue"
defineOptions({
  name: "liquidNitrogenContainer"
})
interface Props {
  containerInfo: ContainerInfo//第一层级容器：液氮罐数据
  levelFirstConList: LevelFirstConInfo[] //第一层级容器：液氮罐数据结构（包含提篮列表）
  activeKey: string// 容器选择格子：(x,y,num):选中几行几列的第几个格子
}
let { activeKey = '', containerInfo = {}, levelFirstConList = [] } = defineProps<Props>();
const emit = defineEmits<{
  clickRowBox: [activeKey: string],
  clickBox: [activeKey: string],
  toggleHandBacket: [activeKey: string],
  addSubRongqi: [{ rowIndx: any, columnIndx: any }]
}>()
watch(() => levelFirstConList, () => {

  console.log("-liquidNitrogenContainer-Watch-activeKey-", activeKey)
  getMainConData();
})
watch(() => activeKey, () => {

  console.log("-activeKey-Watch---", activeKey)
  initByActiveKey();
})

let handBasketList: any = ref([])//第一层液氮罐所有提篮列表（包括空位置）
let activeIndex = ref<number>(-1);//选中第几个提篮，从0开始
let levelFirstActiveCon: any = ref(null);//第一个选中的提篮
const diameter: number = 220;//大圆直径
let activeRowIndex = ref<number>(-1);//选中提篮某一层，从0开始
//默认选中初始化
const initByActiveKey = () => {
  if (activeKey) {
    let { y, z }: any = getActiveXYZ(activeKey);
    activeIndex.value = Number(y);
    activeRowIndex.value = Number(z);
  }
  levelFirstActiveCon.value = handBasketList.value[activeIndex.value];
  let currentKey: any = "";
  if (levelFirstActiveCon.value) {
    let { storey, storeyColumn }: any = levelFirstActiveCon.value;
    currentKey = `${storey - 1},${storeyColumn - 1},${activeRowIndex.value}`;
  }
  emit("toggleHandBacket", currentKey);
}
function isDisableStatus(item: any) {
  return item && item.status == 'DISABLED'
}
/**根据液氮罐选中提篮的某层，返回所在层（只有一层）、列（第几个提篮：顺时针算起）、行-提篮的第几层（从0开始编号） */
function getActiveXYZ(str: any) {
  if (!str) return {};
  let values = str.split(",");
  let x = values[0];
  let y = values[1];
  let z = values[2];
  return { x, y, z };
}
//根据服务数据动态生成提蓝容器样式数据
function getMainConData() {
  let list: any = levelFirstConList || [];
  if (levelFirstConList.length) {
    list = flatArrayChildren(levelFirstConList)
  }
  handBasketList.value = list;//获取所有第一层次所有提蓝
  console.log("-getMainConData--activeKey-", activeKey)
  let { maxRackQuantity }: any = containerInfo
  generateCircleStyleClass(maxRackQuantity);//根据数据动态生成提蓝容器样式
  initByActiveKey();//刷新容器选中格子的数据
}
/**液氮罐没有行列只分，后端定义只有一行 */
function flatArrayChildren(arr: any) {
  // 使用 reduce 方法展平数组并提取 children 属性
  let allChildren = arr.reduce((acc: any, obj: any) => {
    if (obj.children && obj.children.length > 0) {
      acc.push(...obj.children);
    }
    return acc;
  }, []);
  return allChildren;
}
/**计算生成圆的相关数据
 * @param {number} n 分割几个圆弧  
 * @param {number} diameter 大圆直径
 */
function getCircleParamData(n: number, diameter: number) {
  var radius = diameter / 2;//半径
  var perimeter = Math.PI * diameter;//周长
  var arc_len = perimeter / n;//弧长
  var angle = 360 / n > 90 ? 90 : 360 / n;//每个扇形角度
  var interval = 4;//间隔角度
  // console.log(angle)
  var width = 2 * radius * Math.sin(angle / 2 * Math.PI / 180) - (interval * 2 + 1);//减去间隔避免点击遮挡
  let default_rotate = -1 * (angle - 2) / 2;
  return { radius, perimeter, arc_len, angle, interval, width, default_rotate }
}

function setCircleItemStyle(i: any) {
  let n: number = handBasketList.value.length
  let { radius, angle, width, default_rotate }: any = getCircleParamData(n, diameter)
  let rotate = angle * (i + 1 - 1);
  return `width: ${width}px;height: ${radius}px;transform: rotate(${default_rotate + rotate}deg);z-index:${i + 1}`
}
function generateCircleStyleClass(n: number) {
  let { radius, angle, interval }: any = getCircleParamData(n, diameter)
  // 动态样式生成
  var style: any = document.createElement("style");
  document.head.appendChild(style);
  var sheet: any = style.sheet;
  const rule: any = `content: ""; width: ${radius}px; height: ${diameter}px;transform: rotate(${angle - interval}deg) translate(-100%, 0);border-left: ${radius}px solid #FFF;`
  sheet.addRule('.eight-elements .circle-item::after', rule);
}

/**新增提篮 */
function addSubRongqi(index: any) {

  //空提篮点击新增,提篮只有一层
  emit("addSubRongqi", { rowIndx: 0, columnIndx: index })
}
/**点击液氮罐-提篮 */
function clickBox(item: any, index: any) {
  levelFirstActiveCon.value = null;
  nextTick(() => {
    levelFirstActiveCon.value = item;
    activeIndex.value = index;
    activeRowIndex.value = 0;//点击提蓝默认选中第一层
    let { storey, storeyColumn }: any = item
    emit("clickBox", `${storey - 1},${storeyColumn - 1},0`)
  })
  console.log("clickBox--", item, "index--", index, "levelFirstActiveCon--", levelFirstActiveCon)
}
/**点击提篮某层 */
function clickRowBox(index: any) {
  activeRowIndex.value = index;
  let { storey, storeyColumn }: any = levelFirstActiveCon.value
  let activeKey: any = `${storey - 1},${storeyColumn - 1},${index}`
  emit("clickRowBox", activeKey)
}
/**特殊样式处理 */
function getSpecialStyleClass() {
  let len: any = handBasketList.value.length
  if (len <= 4) {//1-4提篮数
    return `circle-item-special-${len}`
  } else if (len >= 5 && len <= 6) {//5-6提篮数
    return `circle-item-xspecial-${len}`
  } else if (len >= 7 && len <= 8) {//7-8提篮数
    return `circle-item-lspecial-${len}`
  }
  return ""
}
</script>
<template>
  <div class="yedanguanCon">
    <div class="yedanguanFirstLevel">
      <div class="yedanguanFirstLevelCon">
        <div id="circleContainer">
          <div class="eight-elements" :style="`width: ${diameter}px; height: ${diameter}px`">
            <template v-for="(item, index) in handBasketList">
              <div v-if="item" :key="index"
                :class="['circle-item', getSpecialStyleClass(), { 'circle-item-gray': isDisableStatus(item) }, activeIndex == index ? `${isDisableStatus(item) ? 'circle-item-dgray' : 'circle-item-active'}` : '']"
                :style="setCircleItemStyle(index)">
                <el-tooltip overflow effect="dark" :content="item.name" placement="top">
                  <div class="circle-item-txt" @click="clickBox(item, index)">{{ item.name }}</div>
                </el-tooltip>
              </div>
              <div v-else :class="['circle-item', 'empty-item', getSpecialStyleClass()]"
                :style="setCircleItemStyle(index)" :key="'ci' + index">
                <div class="circle-item-txt" @click="addSubRongqi(index)">{{ "+" }}</div>
              </div>
            </template>
            <div class="occlusion"></div>
          </div>
        </div>
      </div>
      <div class="levelOneInfo" v-if="containerInfo">
        <!-- 容器名称 -->
        <div class="info-item">
          <el-tooltip overflow effect="dark" :content="containerInfo.name" placement="top">
            <div class="info-label label-ellipsis">{{ containerInfo.name }}</div>
          </el-tooltip>
        </div>
        <!-- 提篮数 -->
        <div class="info-item">
          <div class="info-label">提篮</div>
          <div class="info-value">{{ containerInfo.rackQuantity }}</div>
        </div>
        <!-- 样本数 -->
        <div class="info-item">
          <div class="info-label">样本数</div>
          <div class="info-value">{{ containerInfo.sampleQuantity }}</div>
        </div>
      </div>
    </div>
    <div class="yedanguanSedLevel">
      <handbasket-row-plane v-if="levelFirstActiveCon" :isDisabled="isDisableStatus(levelFirstActiveCon)"
        :activeIndex="activeRowIndex" @clickRowBox="clickRowBox" :rowCount="levelFirstActiveCon.rowCount" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.yedanguanCon {
  display: flex;
  align-items: center;
  margin-top: 30px;
  height: 660px; //设置最大高度，层数不同固定容器位置，层数最大10
}

.yedanguanFirstLevel {
  margin-right: 40px;
}

.yedanguanFirstLevelCon {
  background-image: url("@assets/images/liquidNitrogen.png");
  width: 332px;
  height: 332px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;

  #circleContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
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
  min-width: 292px;
  box-sizing: border-box;
  align-items: center;

  .info-item {
    display: flex;
    flex-direction: row;
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

.yedanguanSedLevel {
  width: 100px;
  min-height: 422px;
}

/**生成圆样式S */
:deep(.eight-elements) {
  position: relative;
}

:deep(.eight-elements) .circle-item {
  overflow: hidden;
  position: absolute;
  left: 50%;
  transform-origin: 0 100%;

  .circle-item-txt {
    color: #C1C1C1;
    font-size: 13px;
    font-family: NotoSansHans-Medium, NotoSansHans-Medium;
    font-weight: 400;
    transform: rotate(15deg);
    position: absolute;
    width: 73%;
    top: 7%;
    left: 7%;
    text-align: center;
    z-index: 999;
    // 单行文本溢出
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 24px;
    cursor: pointer;
  }

}

:deep(.eight-elements) .circle-item::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border-top-left-radius: 100% 50%;
  border-bottom-left-radius: 100% 50%;
  top: 0;
  left: 0;
  transform-origin: 0 50%;
}

:deep(.eight-elements) .circle-item {
  &:hover {
    z-index: 11 !important; //提篮最大10，移入层级最高
  }

  &.empty-item {
    .circle-item-txt:active {
      // background: #eee;
      font-weight: bolder;
      color: #3557cc;
    }

    &::after {
      border-color: #fff;

    }
  }

  &.circle-item-active {
    .circle-item-txt {
      color: #fff;
    }

    &::after {
      border-color: #8E9DFD;
    }
  }

  &.circle-item-gray {
    .circle-item-txt {
      color: #504d4d;
    }

    &::after {
      border-color: #898989;
    }
  }

  &.circle-item-dgray {
    .circle-item-txt {
      color: #ada8a8;
    }

    &::after {
      border-color: #4A4A4A;
    }
  }
}

:deep(.occlusion) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #384880;
  width: 157px;
  height: 157px;
  border-radius: 50%;
  z-index: 999;
}

/**特殊样式处理 */
//1-4提篮数
:deep([class^="circle-item-special-"] .circle-item-txt),
:deep([class*=" circle-item-special-"] .circle-item-txt) {
  transform: rotate(42deg) translateX(12%) !important;
  left: 11% !important;
  width: 54% !important;
  top: 23% !important;
}

//5-6提篮数
[class^="circle-item-xspecial-"],
[class*=" circle-item-xspecial-"] {
  .circle-item-txt {
    transform: rotate(30deg) translateX(4%) !important;
    width: 70% !important;
    top: 16% !important;
  }
}

[class^="circle-item-lspecial-"],
[class*=" circle-item-lspecial-"] {
  .circle-item-txt {
    transform: rotate(23deg) translateX(6%) !important;
    width: 70% !important;
    top: 10% !important;
  }
}

/**生成圆样式S */
</style>