<template>
  <div class="main-container">
    <div class="main-content">
      <div class="sub-container" v-for="(item,index) in list" :key="index" @click.stop="openDaping(item)" >
        <img :src="item.suoluetu" class="item-image"/>
        <div class="item-title">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./dapingList.ts"></script>
<style scoped lang="scss">
.main-container{
  padding: pxTovw(20);
  overflow-y: auto;
  height: calc(100vh - #{pxTovw(80)}) !important;
  scrollbar-width: thin;
  scrollbar-color: #c8cdd4;
  box-sizing: border-box;
  .main-content{
    display: grid;    
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;

  }
  .sub-container{
    cursor: pointer;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    box-shadow: 0px 0px 21px 0px rgba(48,60,152,0.1);
    border-radius: 8px;
    .item-image{
      width: 100%;
      display: block;
      margin: 0 auto;
    }
    .item-title{
      font-family: Microsoft YaHei;
      font-weight: bold;
      font-size: 20px;
      color: #181F47;
      height: 54px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>