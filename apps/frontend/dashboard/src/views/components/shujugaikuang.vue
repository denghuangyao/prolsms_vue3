<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
type DataType = {
  //每个类型概况数据类型定义
  label: string;
  value: number | string;
};
interface GaikuangData {
  //定义概览数据类型结构
  leftTop?: DataType;
  rightTop?: DataType;
  total?: DataType;
  leftBottom?: DataType;
  rightBottom?: DataType;
}
type PositionEnum = keyof GaikuangData;
type PositionDataType = DataType & {
  position: PositionEnum;
};
export interface GaikuangDataConfig {
  [key: string]: {
    compareList: PositionDataType[]; //不同位置的数据概况
    list: DataType[]; //概况数据列表
    label: string; //概况数据标签
  };
}
const { data } = defineProps<{
  data: GaikuangDataConfig;
}>();
let activeKey = ref<keyof GaikuangDataConfig | ''>('');
let activeData = computed<GaikuangData | null>(() => {
  if (!activeKey.value || activeKey.value === 'YQYY') return null;
  let { list, compareList } = data[activeKey.value];

  return { ...getActiveDataConf(compareList, list) };
});
let menuList = computed(() => {
  return Object.keys(data).map((key) => {
    return {
      key,
      label: data[key].label,
    };
  });
});
function getActiveDataConf(conf: PositionDataType[] = [], data: DataType[] = []) {
  let result: GaikuangData = conf.reduce((acc: GaikuangData, i: PositionDataType) => {
    acc[i.position] = { ...i };
    data.some((item: DataType) => {
      if (item.label == i.label) {
        if (acc[i.position]) {
          acc[i.position]!.value = item.value;
        }
        return true;
      }
      return false;
    });
    return acc;
  }, {});
  // console.log("--getActiveDataConf-result-",result)
  return result;
}
function selectTabChange(key: any) {
  // 更新activeKey的值为key
  activeKey.value = key;
}
onMounted(() => {
  //console.log('XTDP_shujugaikuang-onMounted----', Object.keys(data));
  activeKey.value = Object.keys(data)[0];
});
</script>
<template>
  <div class="middle-container">
    <div class="middle-title">
      <block-title
        autoCarousel
        class="mb12 title-box"
        title="数据概况"
        @selectTabChange="selectTabChange"
        :menuList="menuList"
        :activeKey="activeKey"
        :maxlen="7"
      />
    </div>
    <div v-if="activeKey === 'YQYY'" class="middle-body">
      <slot name="middle_body"></slot>
    </div>
    <div class="main-box" v-else-if="activeData">
      <div class="main-box-content">
        <gaikuangbox
          v-if="activeData.leftTop"
          :value="activeData.leftTop.value"
          :label="activeData.leftTop.label"
          class="circlebox small-circle left-top"
        />
        <gaikuangbox
          v-if="activeData.leftBottom"
          :value="activeData.leftBottom.value"
          :label="activeData.leftBottom.label"
          class="circlebox small-circle left-bottom"
        />
        <gaikuangbox
          v-if="activeData.total"
          isBigFont
          :value="activeData.total.value"
          :label="activeData.total.label"
          class="circlebox big-circle"
        />
        <gaikuangbox
          v-if="activeData.rightTop"
          :value="activeData.rightTop.value"
          :label="activeData.rightTop.label"
          class="circlebox small-circle right-top"
        />
        <gaikuangbox
          v-if="activeData.rightBottom"
          :value="activeData.rightBottom.value"
          :label="activeData.rightBottom.label"
          class="circlebox small-circle right-bottom"
        />
      </div>
    </div>
    <div class="middle-base" v-if="activeKey !== 'YQYY'">
      <img class="middle-base-img" src="@assets/images/largeScreen/xtdp/middle_base.png" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.mb12 {
  margin-bottom: pxTovw(12);
}
@mixin bg {
  background: linear-gradient(180deg, #013654 10%, #021f38 37%, transparent 100%);
}
.middle-container {
  height: 100%;
  width: 100%;
  position: relative;
  .middle-body {
    height: calc(100% - #{clampPxCustom(38px, 52)});
  }
  .main-box {
    @include bg;
    // height: calc(100% - #{pxTovw(50)});
    height: 100%;
    display: flex;
    justify-content: center;
    .main-box-content {
      position: relative;
      height: 100%;
      width: 100%;
      @media screen and (max-width: 576px) {
        width: 100%;
      }
      .circlebox {
        position: absolute;
        transition: all 2s linear;
        animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-delay: 2s;
        @keyframes bounce-top {
          0%,
          100% {
            transform: translateY(50%);
          }
          50% {
            transform: translateY(80%);
          }
        }
        @keyframes bounce-bottom {
          0%,
          100% {
            transform: translateY(180%);
          }
          50% {
            transform: translateY(210%);
          }
        }
        &.left-top {
          left: 16%;
          transform: translateY(50%); //61%,+30%
          animation-name: bounce-top;
        }
        &.left-bottom {
          left: 6.5%;
          transform: translateY(180%); //210%,240%
          animation-name: bounce-bottom;
        }
        &.right-top {
          right: 16%;
          transform: translateY(50%);
          animation-name: bounce-top;
        }
        &.right-bottom {
          right: 6.5%;
          transform: translateY(180%);
          animation-name: bounce-bottom;
        }
        &.small-circle {
          width: clampPxCustom(65px, 120);
          height: clampPxCustom(65px, 120);
        }
        &.big-circle {
          width: clampPxCustom(130px, 218);
          height: clampPxCustom(130px, 218);
          left: 50%;
          transform: translateX(-50%);
          // top: 15%;
          bottom: 49%;
        }
      }
    }
  }
  .middle-title {
    display: flex;
    flex-direction: row;
    .title {
      font-size: pxTovw(14);
      color: #cdcdcd;
      display: flex;
      align-items: center;
    }
  }
  .middle-base {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -5%;
    .middle-base-img {
      width: auto;
      height: clampPxCustom(155px, 219);
      display: block;
      margin: 0 auto;
    }
  }
}
// @media screen and (max-width: 576px) {
//   .middle-base-img {
//     width: 20% !important;
//     height: auto !important;
//   }
// }
</style>
