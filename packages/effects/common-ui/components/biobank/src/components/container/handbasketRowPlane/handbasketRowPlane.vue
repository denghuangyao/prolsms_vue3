<script lang="ts" setup>
interface Props {
  rowCount: number// 容器总行数
  isDisabled: boolean// 容器状态是否停用
  activeIndex: string | number// //选中提篮的某一层，从0开始
}
defineOptions({
  name: 'handbasketRowPlane'
})
defineProps<Props>()
const emit = defineEmits<{
  'clickRowBox': [index: string | number]
}>()
const clickRowBox = (index: any) => {
  // 从下到上，层号递增
  console.log("-clickRowBox--", index)
  emit("clickRowBox", index);
}
</script>
<template>
  <div class="basket-main-box">
    <img class="handlerImg" src="@assets/images/baskethandler.png" />
    <div :class="['inner-box', { 'innerbox-gray': isDisabled }]">
      <!-- item从1开始 -->
      <div
        :class="['rowdiv', { 'row-gray': isDisabled }, index == activeIndex ? `${isDisabled ? 'row-deepgray' : 'row-active'}` : '']"
        v-for="(item, index) in rowCount" :key="index" @click="clickRowBox(index)">
        <div class="line"></div>
        <div class="boxname">{{ item }}层</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@mixin linedot($color) {
  content: "";
  width: 7px;
  height: 7px;
  background: $color;
  position: absolute;
  top: -2px;
  display: block;
  margin: 0 auto;
}

@mixin lineTop($color) {
  content: "";
  height: 2px;
  background: $color;
  display: block;
  position: absolute;
  top: -2px;
  width: 100%;
  box-sizing: border-box;
}

.basket-main-box {
  position: relative;
  width: 100px;

  .handlerImg {
    width: 36px;
    height: 129px;
    display: block;
    position: absolute;
    right: 19px;
  }

  .inner-box {
    padding-top: 66px;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column-reverse; //从下到上，行号递增

    &:not(.innerbox-gray) {
      .rowdiv:last-of-type {
        border-top: 2px solid #c1c1c1;
      }
    }

    &.innerbox-gray {
      .rowdiv:last-of-type {
        border-top: 2px solid #898989;
      }
    }

    .rowdiv {
      background: #eef5ff;
      height: 63px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 2px solid #c1c1c1;
      border-left: 2px solid #c1c1c1;
      border-right: 2px solid #c1c1c1;
      box-sizing: border-box;
      cursor: pointer;

      .line {
        height: 3px;
        width: 45px;
        background: #c1c1c1;
        box-sizing: border-box;
        position: relative;
        margin-top: 20px;

        &::before {
          @include linedot(#c1c1c1);
          left: -7px;
        }

        &::after {
          @include linedot(#c1c1c1);
          right: -7px;
        }
      }

      &.row-active {
        background: #e7ebff;
        border: 2px solid #7585ee;
        border-top: none !important;
        position: relative;

        &::before {
          @include lineTop(#7585ee);
          width: calc(100% + #{pxTovw(4)});
          transform: translateX(0%);
        }

        .boxname {
          color: #7585EE;
        }

        .line {
          background: #7585ee;

          &::before {
            @include linedot(#7585ee);
            left: -7px;
          }

          &::after {
            @include linedot(#7585ee);
            right: -7px;
          }
        }
      }

      &.row-gray {
        border-bottom: 2px solid #898989;
        border-left: 2px solid #898989;
        border-right: 2px solid #898989;
        background: #e2e2e2;

        .boxname {
          color: #898989;
        }

        .line {
          background: #898989;

          &::before {
            @include linedot(#898989);
            left: -7px;
          }

          &::after {
            @include linedot(#898989);
            right: -7px;
          }
        }

        &.row-deepgray {
          background: #c2c2c2;
        }
      }

      .boxname {
        font-size: 14px;
        font-family: NotoSansHans-Regular, NotoSansHans-Regular;
        font-weight: 400;
        color: #a1a1a1;
        margin-top: 10px;
        text-align: center;
      }
    }
  }
}
</style>