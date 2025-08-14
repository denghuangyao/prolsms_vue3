<script lang="ts" src="./boxPlane.ts"></script>
<template>
  <div class="boxplaneContainer">
    <div class="boxplaneFlexbox">
      <div class="RowNumDiv">
        <div class="rownum" v-for="(item, index) in getLetters()" :key="index">{{ item }}</div>
      </div>

    </div>
    <div class="mainplanebox">
      <div class="ColumnNumDiv">
        <div class="colnum" v-for="(item, index) in columnCount" :key="index">{{ item }}</div>
      </div>
      <div class="rowAndColbox">
        <div class="boxnum-row" v-for="(item, rowIdx) in getDataList" :key="rowIdx">
          <div
            :class="['boxnum-col', { 'boxnum-col-lblue': sedItem.isInStorage }, { 'boxnum-col-lgreen': sedItem.isOutStorage }, { 'boxnum-col-active boxnum-col-dblue boxnum-col-dgreen': isActiveKey(rowIdx, colIdx) }, { 'multiClickItem': isMultiClickItem(rowIdx, colIdx) }]"
            v-for="(sedItem, colIdx) in item.children" :key="`${colIdx},${rowIdx}`"
            @click="clickBoxnum(sedItem, rowIdx, colIdx)">
            {{ sedItem.isHasYB ? sedItem.sampleCode : `${sedItem.colBh}${item.rowBh}` }}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="scss" scoped>
@mixin basicFont {
  font-size: 14px;
  font-family: NotoSansHans-Regular, NotoSansHans-Regular;
  font-weight: 400;
  color: #8E8E8E;
}

@mixin boxStatus($color) {
  border: 1px solid $color;
  background: $color;
  color: #FFFFFF;
}

.boxplaneFlexbox {
  display: flex;
}

.boxplaneContainer {
  .RowNumDiv {
    height: 25px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 33px;
    margin-bottom: 8px;
    border: 1px solid #C1C1C1;
    @include basicFont;

    .rownum {
      width: 40px;
      // border: 1px solid #fff;
      box-sizing: border-box;
      text-align: center;
      margin-right: 8px;

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  .mainplanebox {
    display: flex;
    flex-direction: row;

    .ColumnNumDiv {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 1px solid #C1C1C1;
      box-sizing: border-box;
      @include basicFont;
      margin-right: 8px;

      .colnum {
        height: 40px;
        width: 25px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 4px;

        &:last-of-type {
          margin-bottom: 0;
          height: 38px;
        }
      }
    }

    .rowAndColbox {
      display: flex;
      flex-direction: column;

      .boxnum-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &:last-of-type .boxnum-col {
          margin-bottom: 0;
        }
      }

      .boxnum-col {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        box-sizing: border-box;
        border: 1px solid #C1C1C1;
        @include basicFont;
        margin-bottom: 4px;
        margin-right: 8px;

        &:last-of-type {
          margin-right: 0;
        }

        cursor: pointer;

        &.boxnum-col-active {
          border: 1px solid #5A6AD5;
          color: #5A6AD5;
        }

        /**存储中状态盒子 */
        &.boxnum-col-lblue {
          @include boxStatus(#6EAFFF);

          /**选中存储中状态 */
          &.boxnum-col-dblue {
            @include boxStatus(#2587FF)
          }
        }

        /**暂时取出状态盒子 */
        &.boxnum-col-lgreen {
          @include boxStatus(#35C359);

          /**选中暂时取出状态 */
          &.boxnum-col-dgreen {
            @include boxStatus(#009025)
          }
        }
      }

      .multiClickItem {
        box-sizing: border-box;
        border: #0827f1 2px dashed !important;
      }
    }
  }

}
</style>