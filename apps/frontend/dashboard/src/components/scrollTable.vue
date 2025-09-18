<script lang="ts" setup>
import { ElTable, ElTag, ElTableColumn } from 'element-plus';
import { onMounted, useTemplateRef, toRefs, type CSSProperties, onBeforeMount } from 'vue';
import { useScroll, useIntervalFn, useTimeoutFn } from '@vueuse/core';
interface Props {
  isInfiniteScroll?: boolean; //是否无限滚动
  dataList: any[];
  tableHeaders: any;
  isAutoScroll?: boolean; //是否自动滚动
  border?: boolean; //是否需要边框
}
const {
  dataList = [],
  tableHeaders = [],
  isAutoScroll = true,
  border = true,
} = defineProps<Props>();
const tableContainerEl = useTemplateRef<HTMLElement>('table_normal');
console.log('表格--tableContainerEl--', tableContainerEl);
const { y, arrivedState } = useScroll(tableContainerEl, {
  offset: { bottom: 5 },
});
const { bottom } = toRefs(arrivedState);
const { pause, resume } = useIntervalFn(() => {
  // console.log('滚动-scrollTop-', bottom.value, y);
  if (bottom.value) {
    pause();
    useTimeoutFn(() => {
      // y.value = 0;
      // resume();
    }, 1000);
  }
  y.value = y.value + 1;
}, 30);
onMounted(() => {
  console.log('dataList-scrollTable-', dataList);
  if (isAutoScroll) {
    pause();
  } else {
    resume();
  }
});
onBeforeMount(() => {
  if (isAutoScroll) {
    pause();
  }
});
//鼠标移入停止滚动
function MouseEnter() {
  if (isAutoScroll) {
    pause();
  }
}
function MouseLeave() {
  //鼠标离开继续滚动
  if (isAutoScroll) {
    resume();
  }
}
/**单元格的 style 的回调方法*/
let cellStyle = (): CSSProperties => ({ 'text-align': 'left', height: '2.1875vw' });
</script>
<template>
  <div class="full-view">
    <el-table
      class="elTableContainer"
      ref="table_normal"
      :border="border"
      :class="{ 'is-border': border }"
      :data="dataList"
      height="100%"
      :cell-style="cellStyle"
      header-row-class-name="table-header"
      @cell-mouse-enter="MouseEnter"
      @cell-mouse-leave="MouseLeave"
    >
      <!-- 数据列 -->
      <el-table-column
        v-for="(item, index) in tableHeaders"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :key="index"
        show-overflow-tooltip
        ><template #default="scope">
          <!-- 排名 -->
          <div
            v-if="item.type == 'idx'"
            class="idx_label cell_label"
            :class="{ idx_row_top: scope.$index < 3 && item.label === '排行' }"
          >
            {{ scope.$index + 1 }}
          </div>
          <!-- 图片 -->
          <div v-else-if="item.type == 'img'" class="img_label cell_label">
            <img
              v-if="scope.row[item.prop]"
              :width="item.imgWidth || 60"
              :height="item.imgHeight || 60"
              :src="scope.row[item.prop]"
            />
            <div
              v-else
              class="error-img"
              :style="{
                width: (item.imgWidth || 60) + 'px',
                height: (item.imgHeight || 60) + 'px',
              }"
            ></div>
          </div>
          <!-- 标签 -->
          <el-tag
            v-else-if="item.type == 'tag'"
            :type="item.enum?.[scope.row[item.prop]] || 'info'"
            disable-transitions
            >{{ scope.row[item.prop] }}</el-tag
          >
          <!-- 文字 -->
          <div v-else class="cell_label text-ellipsis">
            {{ scope.row[item.prop] || '/' }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
.elTableContainer {
  --el-table-bg-color: transparent !important;
  --el-table-tr-bg-color: transparent;
  --el-border-color-lighter: transparent !important;
  --el-table-row-hover-bg-color: transparent !important;
  --el-table-header-text-color: #eee9e9 !important;
  --el-table-header-bg-color: transparent !important;
  font-size: pxTovw(14);
  .el-table__body-wrapper {
    .el-table__empty-block {
      .el-table__empty-text {
        color: #a0a0a04a;
      }
    }
  }
  &.el-table {
    th > .cell {
      // 表头样式
      background-color: transparent;
      font-family:
        Source Han Sans,
        Source Han Sans;
      font-weight: 400;
      font-size: pxTovw(14);
      padding: pxTovw(10);
      text-align: left;
      font-style: normal;
      .img_label {
        img {
          border-radius: pxTovw(2);
          object-fit: cover;
          cursor: pointer;
        }

        .error-img {
          border-radius: pxTovw(2);
          border: 1px solid #55555533;
          background: url('@assets/images/largeScreen/no-img.png') center center no-repeat;
          background-size: 40% 40%;
        }
      }
    }
    :deep(.el-table__header-wrapper .table-header) {
      background: linear-gradient(to bottom, rgba(45, 222, 236, 0.2), transparent 100%) !important;
    }
    .cell {
      .idx_label {
        color: #eee9e9;
        width: pxTovw(36);
        height: pxTovw(26);
        text-align: center;
        font-size: pxTovw(14);
        box-sizing: border-box;
        &.idx_row_top {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-right: pxTovw(6);
          font-size: pxTovw(13);
          font-weight: bold;
          font-family: 'NotoSans';
          color: #fff;
          background: url('@assets/images/largeScreen/num_bg.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .el-tag {
    border-radius: pxTovw(4);
    padding: pxTovw(4) pxTovw(6);
    line-height: pxTovw(12);
    font-size: pxTovw(12);
    border: none;
    &.el-tag--primary {
      background: rgba(24, 144, 255, 0.2);
      color: #1890ff;
    }
    &.el-tag--success {
      background: rgba(37, 193, 165, 0.2);
      color: #25c1a5;
    }
    &.el-tag--warning {
      background: rgba(255, 153, 0, 0.2);
      color: #ff9900;
    }
    &.el-tag--danger {
      background: rgba(255, 78, 82, 0.2);
      color: #ff4e52;
    }
    &.el-tag--info {
      background: rgba(177, 177, 177, 0.2);
      color: #e6e7e9;
    }
  }
}
</style>
<!-- <style scoped lang="scss">

// 有边的情况，对于边的调整
:deep(.el-table.is-border) {
  &::before {
    display: flex;
  }
}

:deep(.el-table) {
  background-color: transparent !important;
  border: none;
  min-height: 100% !important;

  .gutter {
    border: none !important;
  }
}

:deep(.el-table--border::after) {
  background-color: transparent !important;
}

:deep(.el-table tr) {
  background-color: transparent !important;
}

:deep(.el-table th.is-leaf) {
  border-right: none;
}

:deep(.el-table thead tr th) {
  background-color: transparent;
  box-sizing: border-box;
  padding: 0;
}

  /* 覆盖Element UI表格边框颜色 */
  .el-table .el-table__body td,
  .el-table .el-table__header th {
    border-color: #d5dfeb !important;
  }
:deep(.el-table::before) {
  // 表格底部的边框
  display: none;
  width: calc(100% - 7px);
  // background-color: rgba(255, 255, 255, 0.15) !important;
}

 




:deep(.el-table .cell) {
  padding: 0 pxTovw(15);
  // 单元格样式
  font-family:
    Source Han Sans,
    Source Han Sans;
  font-weight: 400;
  font-size: pxTovw(14);
  color: #2b313b;
  text-align: left;
  font-style: normal;
  width: 100%;
  box-sizing: border-box;
  display: flex;

  
  .cell_label {
    // width: 100%;
    // box-sizing: border-box;

    &.text-ellipsis {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden; //溢出内容隐藏
      text-overflow: ellipsis; //文本溢出部分用省略号表示
      display: -webkit-box; //特别显示模式
      -webkit-line-clamp: 2; //行数
      word-break: break-all;
      line-clamp: 2;
      -webkit-box-orient: vertical; //盒子中内容竖直排列
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      /* 使用省略号表示被截断的文本 */
    }
  }

  .tag_label {
    max-width: pxTovw(120);
    height: auto;

    .tag {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: pxTovw(2) pxTovw(10);
      border-radius: pxTovw(20);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.success {
        background: rgba(37, 193, 165, 0.2);
        color: #25c1a5;
      }

      &.danger,
      &.warning {
        background: rgba(255, 78, 82, 0.2);
        color: #ff4e52;
      }
    }
  }
}

// 单元格样式warning_tag 红色
:deep(.el-table .warning_tag .cell .cell_label) {
  // width: pxTovw(50);
  // height: pxTovw(20);
  padding: pxTovw(4) pxTovw(6);
  line-height: pxTovw(12);
  font-size: pxTovw(12);
  background: linear-gradient(270deg, #d02e2e 0%, #e05558 100%);
  border-radius: pxTovw(4);
}

// 单元格样式success_tag 绿色
:deep(.el-table .success_tag .cell .cell_label) {
  // width: pxTovw(50);
  // height: pxTovw(20);
  padding: pxTovw(4) pxTovw(6);
  line-height: pxTovw(12);
  font-size: pxTovw(12);
  background: linear-gradient(270deg, #299e50 0%, #299e50 100%);
  border-radius: pxTovw(4);
}

:deep(

:deep(.el-table .cell .idx_row_top) {
  // color: #fff;
  // background: url("../../../../../../static/imgs/largeScreen/num_bg.png") no-repeat;
  // background-size: 100% 100%;
}

.table-box :deep(.el-table) {
  min-height: 100% !important;

  .el-table__empty-block {
    min-height: 100% !important;
  }
}
</style> -->
