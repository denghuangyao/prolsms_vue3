<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { graphicalContainer, type StorageLocation } from '@/components/biobank'
import { getContainerById } from '@/apis';
let chakanRongqi = ref(null);//查看容器节点信息
let storageLocation: StorageLocation
/**是否需要显示删除冻存架/冻存盒按钮 */
function getIsShowDeleteBtn(isShowBtn: boolean) {
  console.log("-getIsShowDeleteBtn--", isShowBtn);
  // this.isShowDeleteCon = isShowBtn;
}
const getContainerDetail = async (id: any) => {
  let res = await getContainerById(id)
  console.log("-res-getContainerDetail-", res)
  chakanRongqi.value = null
  nextTick(() => {
    chakanRongqi.value = res
  })
}
onMounted(() => {
  // getContainerDetail(1)
})

</script>
<template>
  <div>
    <el-button type="primary" @click="getContainerDetail(1)">冰箱</el-button>
    <el-button @click="getContainerDetail(2)">液氮罐</el-button>
    <!-- 容器图形化 -->
    <graphical-container ref="graphicalConRef" v-if="chakanRongqi" openCtrlSelected :rowData="chakanRongqi"
      @getIsShowDeleteBtn="getIsShowDeleteBtn" :storageLocation="storageLocation" />


  </div>
</template>
