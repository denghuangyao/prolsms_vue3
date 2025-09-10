<script setup lang="ts">
import { ref } from 'vue';
defineOptions({
  name: 'hy-form-item',
});
interface Props {
  type: string; //表单类型
  label: string; //字段名称
  field: string; //字段
}
const props = defineProps<Props>();
let value = ref('');
</script>
<template>
  <el-form-item :label="`${props.label}`">
    <el-input v-model="value" />
  </el-form-item>
</template>
