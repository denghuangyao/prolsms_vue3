<script lang="ts" setup>
import { CountToAnimator } from '@dhy/shadcn-ui';
interface Props {
  label: string;
  value: string | number;
  bgImg: string;
  isBigFont?: boolean;
}
const { isBigFont = false } = defineProps<Props>();
</script>
<template>
  <div class="item-box">
    <img
      class="item-img"
      v-if="isBigFont"
      src="@assets/images/largeScreen/xtdp/border_circle_bg.png"
    />
    <div class="item-content" :class="{ 'item-ball': !isBigFont }">
      <div class="item-value text-ellipsis" :class="{ bigFont: isBigFont }">
        <CountToAnimator :end-val="Number(value)"></CountToAnimator>
      </div>
      <div class="item-label" :class="{ bigFont: isBigFont }" :title="label">{{ label }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-box {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  .item-img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 50%;
    margin: 0 auto;
    position: absolute;
    top: 0;
  }
  .item-content {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .item-value {
      font-size: pxTovw(22);
      font-family:
        Source Han Sans,
        Source Han Sans;
      font-weight: 700;
      margin-bottom: pxTovw(5);
      color: #fff;
      font-family:
        Source Han Sans,
        Source Han Sans;
      background-image: linear-gradient(to bottom, #ffffff 30%, #30d4f1 99%, #26d2f0 100%);
      background-clip: text;
      -webkit-background-clip: text; /*将设置的背景颜色限制在文字中*/
      -webkit-text-fill-color: transparent; /*给文字设置成透明*/
      width: 80%;
      text-align: center;
      &.text-ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &.bigFont {
        font-size: pxTovw(24);
      }
    }
    .item-label {
      font-family:
        Source Han Sans,
        Source Han Sans;
      font-weight: 400;
      font-size: pxTovw(14);
      color: #cdcdcd;
      white-space: pre-wrap;
      width: 80%;
      text-align: center;
      &.bigFont {
        font-size: pxTovw(18);
        font-weight: 700;
        background: linear-gradient(to bottom, #ffffff 30%, #30d4f1 99%, #26d2f0 100%);
        background-clip: text;
        -webkit-background-clip: text; /*将设置的背景颜色限制在文字中*/
        -webkit-text-fill-color: transparent; /*给文字设置成透明*/
      }
    }
    &.item-ball {
      border-radius: 50%;
      border: pxTovw(2) solid #8bccfa;
      background-color: #024178;
      box-shadow:
        inset 0px 0px pxTovw(10) #46aae1,
        inset 0px 0px pxTovw(20) #3080a8;
    }
  }
}
</style>
