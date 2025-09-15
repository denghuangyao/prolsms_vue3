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
  if (!activeKey.value) return null;
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
  console.log('XTDP_shujugaikuang-selectTabChange----', key);
  // 输出日志信息
  console.log('XTDP_shujugaikuang-selectTabChange----', key);
  // 更新activeKey的值为key
  activeKey.value = key;
}
onMounted(() => {});
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
    <div class="main-box" v-if="activeData">
      <gaikuangbox
        v-if="activeData.leftTop"
        :value="activeData.leftTop.value"
        :label="activeData.leftTop.label"
        class="circlebox small-circle left-top"
        :bgImg="`/src/assets/images/largeScreen/xtdp/circle_bg.png`"
      />
      <gaikuangbox
        v-if="activeData.leftBottom"
        :value="activeData.leftBottom.value"
        :label="activeData.leftBottom.label"
        class="circlebox small-circle left-bottom"
        :bgImg="`/src/assets/images/largeScreen/xtdp/circle_bg.png`"
      />
      <gaikuangbox
        v-if="activeData.total"
        isBigFont
        :value="activeData.total.value"
        :label="activeData.total.label"
        class="circlebox big-circle"
        :bgImg="`/src/assets/images/largeScreen/xtdp/border_circle_bg.png`"
      />
      <gaikuangbox
        v-if="activeData.rightTop"
        :value="activeData.rightTop.value"
        :label="activeData.rightTop.label"
        class="circlebox small-circle right-top"
        :bgImg="`/src/assets/images/largeScreen/xtdp/circle_bg.png`"
      />
      <gaikuangbox
        v-if="activeData.rightBottom"
        :value="activeData.rightBottom.value"
        :label="activeData.rightBottom.label"
        class="circlebox small-circle right-bottom"
        :bgImg="`/src/assets/images/largeScreen/xtdp/circle_bg.png`"
      />
    </div>
    <div class="middle-base">
      <img class="middle-base-img" src="@assets/images/largeScreen/xtdp/middle_base.png" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.mb12 {
  margin-bottom: pxTovw(12);
}
@mixin bg {
  background-image: url('@assets/images/largeScreen/xtdp/middle_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.middle-container {
  height: pxTovw(540);
  width: 100%;
  position: relative;
  .main-box {
    @include bg;
    height: pxTovw(490);

    position: relative;
    .circlebox {
      position: absolute;
      transition: all 2s linear;
      @keyframes bounce-top {
        0%,
        100% {
          transform: translateY(61%);
        }
        50% {
          transform: translateY(91%);
        }
      }
      @keyframes bounce-bottom {
        0%,
        100% {
          transform: translateY(210%);
        }
        50% {
          transform: translateY(240%);
        }
      }
      &.left-top {
        left: 16%;
        animation: bounce-top 3s infinite cubic-bezier(0.42, 0, 0.58, 1);
      }
      &.left-bottom {
        left: 6.5%;
        animation: bounce-bottom 3s infinite cubic-bezier(0.42, 0, 0.58, 1);
      }
      &.right-top {
        right: 16%;
        animation: bounce-top 3s infinite cubic-bezier(0.42, 0, 0.58, 1);
      }
      &.right-bottom {
        right: 6.5%;
        animation: bounce-bottom 3s infinite cubic-bezier(0.42, 0, 0.58, 1);
      }
      &.small-circle {
        width: pxTovw(120);
        height: pxTovw(120);
      }
      &.big-circle {
        width: pxTovw(218);
        height: pxTovw(218);
        left: 50%;
        transform: translateX(-50%);
        top: 15%;
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
    bottom: -3%;
    .middle-base-img {
      width: pxTovw(517);
      height: pxTovw(219);
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
