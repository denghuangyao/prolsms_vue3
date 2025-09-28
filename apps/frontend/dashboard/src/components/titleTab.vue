<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { ElDropdownItem, ElDropdownMenu, ElDropdown } from 'element-plus';
interface Props {
  maxlen?: number;
  title?: string;
  menuList: any[];
  activeKey?: string | number;
  enableMouse?: boolean;
  autoCarousel?: boolean; // 是否开启自动轮播
  carouselTime?: number; //轮播时间
}
const {
  menuList = [],
  maxlen = 5,
  activeKey = '',
  enableMouse = false,
  autoCarousel = false,
  carouselTime = 10000,
} = defineProps<Props>();
const emit = defineEmits<{
  handleSelect: [string | number];
}>();
let firstMenu = computed(() => menuList.slice(0, maxlen));
let moreList = computed(() => menuList.slice(maxlen));
let timerId: ReturnType<typeof setInterval> | null = null;
const handleSelectDebounce = useDebounceFn(handleSelect, 100);
onMounted(() => {
  // 自动轮播
  let menuCopy = JSON.parse(JSON.stringify(menuList));
  if (autoCarousel) {
    let index = 0;
    timerId = setInterval(() => {
      if (index >= menuCopy.length - 1) {
        index = 0;
      } else {
        index++;
      }
      let key = menuCopy[index].key;
      emit('handleSelect', key);
    }, carouselTime);
  }
});
onUnmounted(() => {
  timerId && clearInterval(timerId);
  timerId = null;
});
function handleSelect(key: any) {
  emit('handleSelect', key);
}
function handleMouse(key: any) {
  if (enableMouse) {
    // 防抖
    handleSelectDebounce(key);
  }
}
function handleCommand(key: any) {
  emit('handleSelect', key);
}
</script>
<template>
  <div class="tab-box">
    <div
      class="tab-item"
      :class="{ 'active-item': i.key == activeKey }"
      v-for="i in firstMenu"
      :key="i.key"
      :index="i.key"
      @click.stop="handleSelect(i.key)"
      @mouseenter="handleMouse(i.key)"
    >
      {{ i.label }}
    </div>
    <el-dropdown v-if="menuList.length > maxlen" @command="handleCommand">
      <span class="el-dropdown-link"> 更多<i class="el-icon-arrow-down el-icon--right"></i> </span>
      <el-dropdown-menu class="titletab" slot="dropdown">
        <el-dropdown-item
          :class="{ active: item.key == activeKey }"
          v-for="(item, index) in moreList"
          :key="index"
          :command="item.key"
          >{{ item.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.tab-box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: pxTovw(16);

  .tab-item {
    cursor: pointer;
    padding: pxTovw(12) pxTovw(15);
    font-weight: 400;
    font-size: clampPxCustom(12px, 14);
    color: #cdcdcd;
    &:hover {
      color: #1be0fe;
    }
  }

  .active-item {
    color: #1be0fe;
    position: relative;

    &::after {
      content: '';
      height: pxTovw(3);
      width: 40%;
      background: #1be0fe;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 0);
    }
  }

  :deep(.el-dropdown) {
    color: #cdcdcd;
    margin-left: pxTovw(20);
  }
}
</style>
<style>
.el-dropdown-menu.titletab {
  border: 0.0625rem solid #5fd5ec !important;
  box-shadow: inset 0px 0px 4px 0px #66dff4 !important;
  background: #001c32 !important;
}

.el-dropdown-menu.titletab .el-dropdown-menu__item {
  color: #cdcdcd !important;
}

.el-dropdown-menu.titletab .el-dropdown-menu__item.active {
  color: #1be0fe !important;
}

.el-dropdown-menu.titletab .el-dropdown-menu__item:hover {
  color: #1be0fe !important;
  background-color: #9093992e !important;
}
</style>
