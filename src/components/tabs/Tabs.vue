<script lang="ts" setup>
import { ref } from 'vue';

let tabsView = ref<any[]>([
    {
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content',
    },
    {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content',
    },
])
const active = defineModel<string>('active', { default: '0' });
const removeTab = () => {

}
</script>
<template>
    <el-tabs v-model="active" type="card" class="demo-tabs" closable @tab-remove="removeTab">
        <el-tab-pane v-for="item in tabsView" :key="item.name" :label="item.title" :name="item.name">
            {{ item.content }}
        </el-tab-pane>
    </el-tabs>
</template>