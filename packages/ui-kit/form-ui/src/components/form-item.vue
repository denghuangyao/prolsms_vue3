<script setup lang="ts">
defineOptions({
  name: 'hy-form-item',
});
interface Props {
  type: string; //表单类型
  label: string; //字段名称
  field: string; //字段
}
const props = defineProps<Props>();
</script>
<template>
  <el-form-item :label="`${props.label}`">
    <el-input v-model="props[`${field}`]" />
  </el-form-item>
</template>
