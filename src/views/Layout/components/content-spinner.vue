<script lang="ts" setup>
import { VSpinner } from '@/components/spinner';
import { useContentSpinner } from '@/composables/use-content-spinner';
defineOptions({
    name: "LayoutContentSpinner"
})
const { spinning } = useContentSpinner()

</script>
<template>
    <VSpinner :spinning="spinning"></VSpinner>
</template>