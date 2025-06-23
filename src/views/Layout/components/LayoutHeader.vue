<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
console.log('isDark--', isDark)
const toggleDark = useToggle(isDark)
// const isDark = ref<Boolean>(false)
const toggleTheme = (event: MouseEvent) => {
  // console.log('toggleTheme--', window.matchMedia('prefers-reduce-motion:reduce'))

  //判断是否支持startViewTransition以及用户是否设置了偏好以减少动画效果
  const isAppearanceTransition =
    // @ts-expect-error
    document.startViewTransition && !window.matchMedia('prefers-reduce-motion:reduce').matches
  if (!isAppearanceTransition || !event) {
    isDark.value = !isDark.value;
  }
  const x = event.clientX;
  const y = event.clientY;
  // console.log('toggleTheme-x-y', x, y)
  //点击位置离四个角的最长距离
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )
  const transition = document.startViewTransition(async () => {
    toggleDark()
    // isDark.value = !isDark.value;
    // document.documentElement.setAttribute('class', isDark.value ? 'dark' : '')
    await nextTick()
  })
  console.log('---transition', transition)
  transition.ready.then(() => {
    console.log('---transition-ready-then', isDark.value)
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]
    console.log(isDark.value ? [...clipPath].reverse() : [...clipPath])
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : [...clipPath],
      },
      {
        duration: 450,
        easing: 'ease-in',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
      }
    )
  })
}
</script>
<template>
  <header class="app-head-box">
    <div class="app_title">
      <div>
        <img class="img" src="@assets/images/layout/navmenu_logo.png" />
        <div class="app_name">实验室综合管理系统</div>
      </div>
    </div>
    <!-- 头部菜单 -->
    <slot name="nav-menu"></slot>
    <div class="xuxiang"></div>
    <div class="app_title_user">
      <div class="svgIconcls icon-box" @click="toggleTheme">
        <i-ep-Sunny v-if="isDark" />
        <i-ep-moon v-else />
      </div>
      <!-- <el-icon>
      </el-icon> -->
      <el-icon class="icon-box svgIconcls ">
        <i-ep-QuestionFilled />
      </el-icon>
      <div class="tixingCls svgIconcls">
        <span class="title_head">
          <el-icon fill="#fff" fontSize="24" class="btn_txxx"><i-ep-Bell /></el-icon>
        </span>
        <div :class="{ tixingFlag: true }"></div>
      </div>

      <el-dropdown class="login_drop">
        <span class="name_container el-dropdown-link">
          denny
          <el-icon fill="#181f47" class="el-icon--right">
            <i-ep-arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="1">个人中心</el-dropdown-item>
            <el-dropdown-item command="2">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog custom-class="logoutTip" width="400">
      <div slot="title" class="header-title warning">
        <div class="pop_icon">
          <svg-icon name="btn_ts" />
        </div>
        <div class="pop_tip">提示！</div>
        <div class="pop_text">
          <p>确定退出登录？</p>
          <div></div>
        </div>
      </div>
    </el-dialog>
  </header>
</template>
<style lang="scss" scoped>
.app-head-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: pxTovw(80);
  // background: #fff;
  border-bottom: 1px solid var(--el-border-color-light);

  .app_title {
    width: pxTovw(200);
    height: pxTovw(80);
    text-align: left;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    flex-direction: column;
    justify-content: center;
    background: var(--el-color-primary);
    opacity: 0.95;

    .img {
      width: pxTovw(180);
      height: pxTovw(36);
    }

    .app_name {
      font-size: pxTovw(14);
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
      letter-spacing: pxTovw(4);
      text-align: center;
    }
  }

  .app_title_user {
    min-width: pxTovw(120);
    margin-right: pxTovw(20);
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .icon-box {
      margin-right: pxTovw(16);
      cursor: pointer;

      :deep(.spanIcon) {
        background-color: transparent;
      }

      :deep(.spanIcon .svg-icon) {
        fill: $fontColor;
        cursor: pointer;
        width: pxTovw(18);
        height: pxTovw(18);
      }
    }

    .svgIconcls {
      height: pxTovw(30);
      width: pxTovw(30);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      &:hover,
      &:active {
        background-color: #ebf0ff !important;

        :deep(.svg-icon) {
          fill: var(--el-color-primary) !important;
        }
      }
    }

    .tixingCls {
      margin-right: pxTovw(16);
      position: relative;
    }

    .tixingFlag {
      height: pxTovw(8);
      width: pxTovw(8);
      border-radius: 50%;
      background: #ff7200;
      display: block;
      position: absolute;
      top: pxTovw(0);
      right: pxTovw(-5);
    }

    .login_drop {
      white-space: nowrap;
      cursor: pointer;
      color: $fontColor;
      margin-left: pxTovw(19);
      line-height: pxTovw(35);
    }

    .name_container {
      max-width: pxTovw(150);
      color: $fontColor;
      font-size: $fontSize;
      font-family: ArialMT;
      font-weight: 400;
      vertical-align: text-bottom;
    }

    .title_head .svg-icon {
      fill: $fontColor;
      width: pxTovw(18);
      cursor: pointer;
    }
  }
}
</style>
