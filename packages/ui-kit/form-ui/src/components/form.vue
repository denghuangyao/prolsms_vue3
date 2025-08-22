<script setup lang="ts">
import { ref } from 'vue';
defineOptions({
  name: 'hy-form',
});
//表单查询需要：重置+提交
let form = ref();
function onSubmit() {
  console.log('-form-data-', form.value);
}
</script>
<template>
  <el-form
    class="flex basis-52 flex-wrap"
    :style="{ 'flex-wrap': 'wrap' }"
    :model="form"
    label-width="120px"
  >
    <slot class="flex-1"></slot>
    <el-form-item>
      <el-button>重置</el-button>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>
