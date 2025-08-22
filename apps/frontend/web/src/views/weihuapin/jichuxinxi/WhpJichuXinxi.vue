<script setup lang="ts">
import { HyForm, HyFormItem } from "@dhy/form-ui"
</script>
<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      危化品基础信息..
    </h1>
    <HyForm>
      <HyFormItem field="name" label="名称" type="input"></HyFormItem>
    </HyForm>
  </div>
</template>
<style scoped lang="scss"></style>
