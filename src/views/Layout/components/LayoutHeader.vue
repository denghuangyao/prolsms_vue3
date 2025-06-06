<script lang="ts" setup>
import LayoutNav from './LayoutNav.vue'
</script>
<template>
  <div class="app-head-box">
    <div class="app_title">
      <div>
        <img class="img" src="@assets/images/layout/navmenu_logo.png" />
        <div class="app_name">实验室综合管理系统</div>
      </div>
    </div>
    <!-- 头部菜单 -->
    <LayoutNav />
    <div class="xuxiang"></div>
    <div class="app_title_user">
      <!-- <div> -->
      <el-icon class="bangzhuCls svgIconcls">
        <i-ep-QuestionFilled />
      </el-icon>
      <!-- </div> -->
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
          <svg-icon icon-class="btn_ts" />
        </div>
        <div class="pop_tip">提示！</div>
        <div class="pop_text">
          <p>确定退出登录？</p>
          <div></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.app-head-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: pxTovw(80);
  background: #fff;
  box-shadow: 0px 0px 21px 0px rgba(48, 60, 152, 0.1);
  -webkit-box-shadow: 0px 0px 21px 0px rgba(48, 60, 152, 0.1);


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
    background: $color-primary;
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

    .bangzhuCls {
      margin-right: pxTovw(16);

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
          fill: $color-primary !important;
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
