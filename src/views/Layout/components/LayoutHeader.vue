<script lang="ts" setup>
import { IconButton } from '@/components/icons';
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
enum dropdownCommand {
  personalCenter = '1',
  logout = '2',
}
const handleCommand = (command: any) => {
  console.log('handleCommand--', command, dropdownCommand.logout);
  if (command === dropdownCommand.logout) {
    authStore.logout(false);
  }
};
</script>
<template>
  <header class="app-head-box">
    <div class="app_title">
      <div>
        <!-- <img class="img" src="@assets/images/layout/navmenu_logo.png" /> -->
        <div class="app_name">实验室综合管理系统</div>
      </div>
    </div>
    <!-- 头部菜单 -->
    <slot name="nav-menu"></slot>
    <div class="xuxiang"></div>
    <div class="app_title_user">
      <slot name="theme-toggle"></slot>
      <IconButton class="mr16">
        <i-ep-QuestionFilled />
      </IconButton>
      <IconButton class="tixingCls">
        <span class="title_head">
          <el-icon fill="#fff" fontSize="24" class="btn_txxx"><i-ep-Bell /></el-icon>
        </span>
        <div :class="{ tixingFlag: true }"></div>
      </IconButton>

      <el-dropdown class="login_drop" @command="handleCommand">
        <span class="name_container el-dropdown-link">
          denny
          <el-icon fill="#181f47" class="el-icon--right">
            <i-ep-arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="dropdownCommand.personalCenter">个人中心</el-dropdown-item>
            <el-dropdown-item :command="dropdownCommand.logout">退出</el-dropdown-item>
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
  border-bottom: 1px solid var(--el-border-color-light);
  background-color: var(--header);

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
    background: var(--siderbar-bg);
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
      color: var(--font-color);
      margin-left: pxTovw(19);
      line-height: pxTovw(35);
    }

    .name_container {
      max-width: pxTovw(150);
      color: var(--font-color);
      font-size: $fontSize;
      font-family: ArialMT;
      font-weight: 400;
      vertical-align: text-bottom;
    }

    .title_head .svg-icon {
      fill: var(--font-color);
      width: pxTovw(18);
      cursor: pointer;
    }
  }
}
</style>
